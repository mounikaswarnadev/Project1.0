import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  DataBindingDirective,
  DataStateChangeEvent,
  SelectAllCheckboxState,
} from '@progress/kendo-angular-grid';
import { process, SortDescriptor, State } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { SamplesService } from 'src/app/core/services/samples.service';
import { UtilityService } from 'src/app/core/services/utility/utility.service';
import { SampleDetails } from 'src/app/models/samples';
import { CommentsDTO, Samples } from 'src/app/models/samples.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  loading: boolean = true;
  gridData: any;
  isSelected = false;
  isDone: boolean = false;
  updateDate: Date;
  public gridView: any[];
  public commentsMaxLength = 450;
  public mySelection: string[] = [];
  samples: Samples[] = [];
  private sampleSub: Subscription;
  commentsDTO: Samples;
  sampleData: SampleDetails[] = [];
  public formGroup: FormGroup;
  inpValue: any;
  public selectAllState: SelectAllCheckboxState = 'unchecked';
  public state: State = {
    skip: 0,
    take: 30,
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.sampleService.getSamples();
    this.sampleSub = this.sampleService
      .getSamplesUpdated()
      .subscribe((samples: Samples[]) => {
        if(samples.length > 0){
        this.samples = samples;
        this.gridData = process(this.samples, this.state);
        this.loading = false;
        this.gridView = samples;
        if(this.inpValue != null){
        this.onFilter(this.inpValue);
        }
        } else{
          this.loading = false;
          this.sampleData.length = 0;
        }
      })
      // this.formGroup = this.createFormGroup(this.samples);
  }
  get canEditTeamComments(): boolean {
    return true;
  }
  dataStateChange(state: DataStateChangeEvent) {
    this.state = state;
    this.gridData = process(this.samples, state);
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    //     this.buildSampleGrid();
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
    var data = this.sampleData.filter((i) => i.artemisId == this.mySelection[0]);
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
    return this.formBuilder.group({
      ArtemisID: dataItem.ArtemisID,
      BusinessAppName : dataItem.BusinessAppName,
      siteComments: dataItem.ContactComment,
      siteCommentsLastUpdatedOn: dataItem.ContactComment?.lastUpdated?.updatedOn,

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
    if (!isEdited && column.field == "BusinessAppName") {
      sender.editCell(rowIndex, columnIndex, this.createFormGroup(dataItem));
    }

  }

  public cellCloseHandler(args: any) {
    const { formGroup, dataItem } = args;
        if (!formGroup.valid) {
            // prevent closing the edited cell if there are invalid values.
            // args.preventDefault();
        }
        else if (formGroup.dirty) {
          this.samples.filter((data) => {
            if(data.ArtemisID === formGroup?.controls?.ArtemisID?.value){
            data.BusinessAppName = formGroup?.controls?.BusinessAppName?.value;
            }
          })
        }

  }
  saveClicked(item, column, grid) {
    this.loading = true;
    this.commentsDTO = new Samples();
    this.commentsDTO.ArtemisID = this.formGroup?.controls?.ArtemisID?.value;
    switch (column) {
      case 'siteComments': {
        this.commentsDTO.ContactComment = this.formGroup?.controls?.siteComments?.value;
        this.commentsDTO.UpdatedBy = "Rajesh D"
        // this.updateDate = new Date();
        this.commentsDTO.LastUpdatedDate = new Date;
        this.sampleService.saveSiteComments(this.commentsDTO).subscribe(
          (args: any) => {
            this.loading = false;
            this.samples.filter((data) => {
              if(data.ArtemisID === this.commentsDTO.ArtemisID){
              data.ContactComment = this.commentsDTO.ContactComment
              data.lastUpdated = this.commentsDTO.LastUpdatedDate
              data.LastUpdatedDate = this.commentsDTO.LastUpdatedDate
              data.user = this.commentsDTO.UpdatedBy
              }
            })
            grid.cancelCell();
            this.ngOnInit();
            // this.toastService.success("Pearl site comments saved successfully.");
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
        logic: "or",
        filters: [
          {
            field: "ArtemisID",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "id",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "BusinessAppName",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "CorrelationID",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "installStatus",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "ServerName",
            operator: "contains",
            value: inputValue,
          },
          {
            field: "AppContactName",
            operator: "contains",
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
    return this.utiltiyService.getStatusIcon(
      dataItem.installStatus,
      true
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.sampleSub.unsubscribe();
  }
}
