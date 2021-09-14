import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  DataBindingDirective,
  DataStateChangeEvent,
  FilterService,
  SelectAllCheckboxState,
} from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, distinct, FilterDescriptor, process, SortDescriptor, State } from '@progress/kendo-data-query';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Subscription } from 'rxjs';
import { SamplesService } from 'src/app/core/services/samples.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { UserNavigationControlService } from 'src/app/core/services/user-context/user.navigation-control.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { SampleDetails } from 'src/app/models/samples';
import {  CommentsDTO, Samples } from 'src/app/models/samples.model';

const flatten = filter => {
  const filters = (filter || {}).filters;
  if (filters) {
    return filters.reduce((acc, curr) => acc.concat(curr.filters ? flatten(curr) : [curr]), []);
  }
  return [];
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  dropdownSettings : IDropdownSettings;
  loading: boolean = true;
  gridData: any;
  isSelected = false;
  isDone: boolean = false;
  dialog: boolean = false;
  artemisId: any;
  updateDate: Date;
  public gridView: any[];
  public commentsMaxLength = 450;
  public mySelection: string[] = [];
  samples: Samples[] = [];
  selectedItems: any;
  private sampleSub: Subscription;
  public microscopeFields: string[] = []
  commentsDTO: Samples;
  sampleData: SampleDetails[] = [];
  colm: Samples[];
  public formGroup: FormGroup;
  inpValue: any;
  private categoryFilter: any[] = [];
columns:any[] = ['ArtemisID','ConfirmedBusiness','MigrationComment','PlannedDate','Move2Azure','ContactFocalPoint','siteComments','MergedAssetTag','MergedLocation','tsCustBusiness']
// columns: Samples[];
  public selectAllState: SelectAllCheckboxState = 'unchecked';
  public state: State = {
    skip: 0,
    take: 10000,
  };
  sort: SortDescriptor[] = [
    {
      field: 'id',
      dir: 'desc',
    },
  ];

  constructor(
    private sampleService: SamplesService,
    private utiltiyService: UtilityService,
    private toastService: ToastService,
    private userNavigationControlService: UserNavigationControlService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedItems = this.columns;
    this.loadItems();
    console.log(this.commentsDTO,'ccc');
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      enableCheckAll: true,
      limitSelection: -1,
    };
    // this.formGroup = this.createFormGroup(this.samples);
  }
  public hiddenColumns: string[] = [];

  public isHidden(columnName: string): boolean {
    return this.hiddenColumns.indexOf(columnName) > -1;
  }

  public hideColumn(columnName: string): void {
    const hiddenColumns = this.hiddenColumns;

    if (!this.isHidden(columnName)) {
      hiddenColumns.push(columnName);
    } else {
      hiddenColumns.splice(hiddenColumns.indexOf(columnName), 1);
    }
  }
  onISelect(item: any) {
    debugger;
    this.hideColumn(item);
    this.microscopeFields.push(item);
  }
  onISelectAll(items: any) {
    debugger;
    console.log(items);
    this.microscopeFields.push(items);
  }
  onIDeSelect(item: any){
    debugger;
    this.hideColumn(item);
    this.microscopeFields.slice(item)
  }
  onIDeSelectAll(items: any){
    debugger;
    this.microscopeFields.slice(items)
  }
  openView(sample: SampleDetails) {
    if (sample) {
      this.userNavigationControlService.navigateByAccess([
        {
          path: "viewsample",
          params: {
            queryParams: {
              id: sample.artemisId,
              sampleGuid: sample.artemisId,
            },
          },
        },
      ]);
    }
    return false;
  }
  public gridDimension = {
    height: 'calc(100vh - 140px)',
    width: 'calc(100vw - 140px)',
  };
  private loadItems(): void {
    this.loading = true;
    this.sampleService.getSamples();
    this.sampleSub = this.sampleService
      .getSamplesUpdated()
      .subscribe((samples: Samples[]) => {
        debugger;
        if (samples.length > 0) {
          this.samples = samples;
          let records = samples.filter((sample) => sample.ArtemisID);

          this.samples = records.filter((item, i, arr) =>
            arr.findIndex((x) => (x.ArtemisID === item.ArtemisID)) === i)
          this.gridData = process(this.samples, this.state);
          this.loading = false;
          this.gridView = this.samples;
          if (this.inpValue != null) {
            this.onFilter(this.inpValue);
          }
        } else {
          this.loading = false;
          this.sampleData.length = 0;
        }
      });
  }
  get canEditTeamComments(): boolean {
    return true;
  }
  dataStateChange(state: DataStateChangeEvent) {
    this.state = state;
    this.gridData = process(this.samples, state);
  }
  public value: any = [];

  public isChecked = false;

  public get isIndet() {
    return (
      this.value.length !== 0 && this.value.length !== this.samples.length
    );
  }
  public onValueChange(e) {
    this.isChecked = this.value.length === this.samples.length;
  }
  public get toggleAllText() {
    return this.isChecked ? "Deselect All" : "Select All";
  }

  public isItemSelected(item) {
    return this.value.some((x) => x.value === item.value);
  }

  public onClick() {
    debugger;
    this.isChecked = !this.isChecked;
    this.value = this.isChecked ? this.samples.slice() : [];
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    //     this.buildSampleGrid();
  }

  public distinctPrimitive(fieldName: string): any {
    return distinct(this.samples, fieldName).map((item) => item[fieldName]);
  }
  public categoryFilters(filter: CompositeFilterDescriptor): FilterDescriptor[] {
    debugger;
    this.categoryFilter.splice(
      0, this.categoryFilter.length,
      ...flatten(filter).map(({ value }) => value)
    );
    return this.categoryFilter;
  }
  public categoryChange(values: any[], filterService: FilterService): void {
    debugger;
    filterService.filter({
      filters: values.map(value => ({
        field: 'tsCustBusiness',
        operator: 'eq',
        value
      })),
      logic: 'or'
    });
  }
  public handleChange(value: Date) {
    // Update the JSON birthDate string date
    // this.model.birthDate = this.intl.formatDate(value, "yyyy-MM-dd");

    // this.output = JSON.stringify(this.model);
    // this.user = this.parse(this.model);
  }
  public onSelectAllChange(checkedState: SelectAllCheckboxState) {
    this.isSelected = true;
    if (checkedState === 'checked') {
      this.mySelection = this.gridView.map((item) => item.ArtemisID);
      this.selectAllState = 'checked';
    } else {
      this.mySelection = [];
      this.selectAllState = 'unchecked';
    }
  }
  selectedCallback(args: any) {
    return args.dataItem.ArtemisID;
  }
  public onSelectedKeysChange(e: any) {
    this.isSelected = true;
    this.artemisId = e;
    var data = this.samples.filter(
      (i) => i.ArtemisID == this.mySelection[0]
    );
    const len = this.mySelection.length;
    if (len === 0) {
      this.selectAllState = 'unchecked';
      this.isSelected = false;
    } else if (len > 0 && len < this.gridView.length) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = 'checked';
    }
  }
  private isEditable(field: string, dataItem: any): boolean {
    const editableFields = [
      'siteComments',
      'teamComments',
      'actionItems',
      'timeLimit',
    ];
    //Columns is Editable AND the sttus is Not Done
    return editableFields.indexOf(field) > -1 && !this.isDone;
  }
  private userCanEdit(column: string): boolean {
    switch (column) {
      case 'siteComments': {
        return this.canEditTeamComments;
      }

      default: {
        return false;
      }
    }
  }
  public createFormGroup(dataItem: any): FormGroup {
    let formDate = new Date(dataItem.PlannedDate);
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    // let formatted = formDate.toLocaleDateString("en-US")
    return this.formBuilder.group({
      ArtemisID: dataItem.ArtemisID,
      BusinessAppName: dataItem.BusinessAppName,
      value: dataItem.value,
      PlannedDate: formDate,
      Move2Azure: dataItem.Move2Azure,
      MigrationComment: dataItem.MigrationComment,
      ContactFocalPoint: dataItem.ContactFocalPoint,
      ConfirmedBusiness: dataItem.ConfirmedBusiness,
      siteComments: dataItem.ContactComment,
      siteCommentsLastUpdatedOn:
        dataItem.ContactComment?.lastUpdated?.updatedOn,

      teamComments: dataItem.teamComments?.data,
      teamCommentsLastUpdatedOn: dataItem.teamComments?.lastUpdated?.updatedOn,

      actionItems: dataItem.actionItems?.data,
      actionItemsLastUpdatedOn: dataItem.actionItems?.lastUpdated?.updatedOn,

      timeLimit: dataItem.timeLimit?.data,
      timeLimitLastUpdatedOn: dataItem.timeLimit?.lastUpdated?.updatedOn,

      status: this.isDone,
      statusLastUpdatedOn: dataItem.status?.lastUpdated?.updatedOn,
    });
  }
  public cancelChanges(grid: any): void {
    grid.cancelCell();
    // this.editService.cancelChanges();
  }
  public cellClickHandler({
    sender,
    rowIndex,
    column,
    columnIndex,
    dataItem,
    isEdited,
  }) {
    if (
      this.isEditable(column.field, dataItem) &&
      this.userCanEdit(column.field)
    ) {
      //sender.editCell(rowIndex, columnIndex, { hello: "world" });
      this.formGroup = this.createFormGroup(dataItem);
      sender.editCell(rowIndex, columnIndex, this.formGroup);
    }
    if (
      (!isEdited && column.field == 'PlannedDate') ||
      column.field == 'value' ||
      column.field == 'ConfirmedBusiness' || column.field == 'MigrationComment' ||
      column.field == 'Move2Azure' || column.field == 'ContactFocalPoint'
    ) {
      this.formGroup = this.createFormGroup(dataItem);
      sender.editCell(rowIndex, columnIndex, this.createFormGroup(dataItem));
    }
  }

  changePlanDate(data: any){
    this.sampleService.editSample(this.commentsDTO).subscribe(
      (args: any) => {
        this.loading = false;
        this.samples.filter((data) => {
          if (data.ArtemisID === this.commentsDTO.ArtemisID) {
           data.PlannedDate = this.commentsDTO.PlannedDate;
          }
          this.loadItems();
        this.toastService.success('Value Changed successfully.');
        });
      }
    )
  }
  public closeRefreshPopup(status) {
    this.dialog = false;
    if (status == 'yes') {
      // this.loadItems();
    }
  }
  public cellCloseHandler(args: any) {
    const { formGroup, dataItem } = args;
    if (!formGroup.valid) {
      // prevent closing the edited cell if there are invalid values.
      // args.preventDefault();
    } else if (formGroup.dirty) {
      this.samples.filter((data) => {
        this.commentsDTO = new Samples();

        if(formGroup?.controls?.ConfirmedBusiness?.value != null){
        this.commentsDTO.ConfirmedBusiness =
          formGroup?.controls?.ConfirmedBusiness?.value;
        }
        if(formGroup?.controls?.MigrationComment?.value != null){
          this.commentsDTO.MigrationComment =
            formGroup?.controls?.MigrationComment?.value;
          }
        if(formGroup?.controls?.Move2Azure?.value != null){
          this.commentsDTO.Move2Azure =
            formGroup?.controls?.Move2Azure?.value;
          }
          if(formGroup?.controls?.PlannedDate?.value != null){
            this.commentsDTO.PlannedDate =
              formGroup?.controls?.PlannedDate?.value;
            }
        this.commentsDTO.ArtemisID = formGroup?.controls?.ArtemisID?.value;
        this.commentsDTO.ContactFocalPoint = formGroup?.controls?.ContactFocalPoint?.value;
        if (data.ArtemisID === formGroup?.controls?.ArtemisID?.value) {
          data.PlannedDate = formGroup?.controls?.PlannedDate?.value;
          data.ConfirmedBusiness =
            formGroup?.controls?.ConfirmedBusiness?.value;
            data.Move2Azure = formGroup?.controls?.Move2Azure?.value;
            data.ContactFocalPoint = formGroup?.controls?.ContactFocalPoint?.value;
        }

      });
      if(this.commentsDTO.PlannedDate.toString() !== this.formGroup?.controls?.PlannedDate?.value.toString()){
        this.dialog = true;
        // this.changePlanDate(data);
      }
    if(this.commentsDTO.ConfirmedBusiness != this.formGroup?.controls?.ConfirmedBusiness?.value || this.commentsDTO.Move2Azure != this.formGroup?.controls?.Move2Azure?.value || this.commentsDTO.ContactFocalPoint != this.formGroup?.controls?.ContactFocalPoint?.value){
      this.sampleService.editSample(this.commentsDTO).subscribe(
        (args: any) => {
          this.loading = false;
          this.loadItems();
          this.toastService.success('Value Changed successfully.');
        },
        (error: any) => {
          this.loading = false;
          // this.HandleAPIError(error)
        }
      );
    }
    }
  }
  saveClicked(item, column, grid) {
    let sam = [];
    this.loading = true;
    this.commentsDTO = new Samples();
    this.commentsDTO.ArtemisID = this.formGroup?.controls?.ArtemisID?.value;
    this.samples.filter((x) =>{
      x.ArtemisID = this.artemisId;
      sam.push(x)
    })

    switch (column) {
      case 'siteComments': {
        this.commentsDTO.ContactComment =
          this.formGroup?.controls?.siteComments?.value;
        this.commentsDTO.UpdatedBy = 'Rajesh D';
        // this.updateDate = new Date();
        this.commentsDTO.LastUpdatedDate = new Date();
        this.sampleService.saveSiteComments(this.commentsDTO).subscribe(
          (args: any) => {
            this.loading = false;
            grid.cancelCell();
            this.loadItems();
            this.toastService.success('Comments saved successfully.');
          },
          (error: any) => {
            this.loading = false;
            // this.HandleAPIError(error)
          }
        );
        break;
      }
    }
  }
  public onFilter(inputValue: string): void {
    this.inpValue = inputValue;
    this.gridView = process(this.samples, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'ArtemisID',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'ArtemisName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'ArtemisLoc',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'ConfirmedBusiness',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsCustBusiness',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptCOrganisation',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFOwningBusiness',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFOperatingBusiness',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'SnowOperatingBusiness',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFAssetCIOwner',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'SnowAssetOwner',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'MigrationCompleted',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'MigrationComment',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'ExitStrategy',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'ScopeGroup',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'ScopeSet',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'Bucket',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'Wave',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'HighestBucketPerDeployment',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptManufacturer',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptModel',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptModelInfo',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptAssetClass',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptCDeviceUse',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsUsage',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsComputerType',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'SnowClass',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsOperatingMode',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsVirtualization',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsPlatform',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsConsolidatedOS',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptRackName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptSerialNumber',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'SnowSerialNumber',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsSystemStatus',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'AptCDeviceCondition',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'SnowStatus',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsService',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsSHELL_DeploymentID',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFDeploymentID',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsSHELL_DeploymentName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFDeploymentName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFDeploymentCIOwner',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFApplicationID',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFApplicationName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFPortfolioName',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFPortfolioManager',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsAppl_LifeCycle',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsAppl_Business_Criticality',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'tsAppl_DR_Required',
            operator: 'contains',
            value: inputValue,
          },
          {
            field: 'eMRFBusinessApplicationOwner',
            operator: 'contains',
            value: inputValue,
          },
        ],
      },
    }).data;

    this.dataBinding.skip = 0;
  }
  getStatusIcon(dataItem: Samples) {
    return this.utiltiyService.getStatusIcon(dataItem.installStatus);
  }

  getIconBackground(dataItem: Samples) {
    return this.utiltiyService.getStatusIcon(dataItem.installStatus, true);
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sampleSub.unsubscribe();
  }
}
