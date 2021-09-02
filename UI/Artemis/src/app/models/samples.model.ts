export class Samples {
  id : string;
  ArtemisID: string;
  BusinessAppName:string;
  CorrelationID: string;
  ServerName: string;
  AppContactName: string;
  installStatus:string;
  siteComments: string;
  LastInScope: Date;
  lastUpdated: Date;
  UpdatedBy: string;
  ContactComment: string;
  DateUpdated: Date;
  user: string;
  lastInScope: Date;
  AddedDate: Date;
  LastUpdatedDate: Date;
  ArtemisName: string;
  ArtemisLoc: string;
  ConfirmedBusiness: string;
  tsCustBusiness: string;
  AptCOrganisation: string;
  eMRFOwningBusiness: string;
  eMRFOperatingBusiness: string;
  SnowOperatingBusiness: string;
  eMRFAssetCIOwner: string;
  SnowAssetOwner:string;
  MigrationCompleted:string;
  ExitStrategy: string;
  ScopeGroup: string;
  ScopeSet: string;
  Bucket: string;
  Wave: string;
  MigrationComment: string;
  HighestBucketPerDeployment: string;
  PlannedDate: Date;
  AptManufacturer: string;
  AptModel: string;
  AptModelInfo: string;
  AptAssetClass: string;
  AptCDeviceUse: string;
  tsUsage: string;
  tsComputerType: string;
  SnowClass: string;
  tsOperatingMode: string;
  tsVirtualization: string;
  tsPlatform: string;
  tsConsolidatedOS: string;
  AptRackName: string;
  Target: string;
  Move2Azure: string;
  AptSerialNumber: string;
  SnowSerialNumber: string;
  tsSystemStatus: string;
  AptCDeviceCondition: string;
  SnowStatus: string;
  tsService: string;
  tsSpecialService: string;
  tsNetworkType: string;
  tsDRS : string;
  tsSHELL_DeploymentID : string;
  eMRFDeploymentID : string;
  tsSHELL_DeploymentName : string;
  eMRFDeploymentName : string;
  eMRFDeploymentCIOwner : string;
  eMRFApplicationID : string;
  eMRFApplicationName : string;
  eMRFPortfolioName : string;
  eMRFPortfolioManager : string;
  tsAppl_LifeCycle : string;
  tsAppl_Business_Criticality : string;
  tsAppl_DR_Required : string;
  eMRFBusinessApplicationOwner : string;
  ContactFocalPoint : string;
  }

export class Comments {
  data: any;
}
export class CommentsDTO
{
    public Id: string;
    public Data: string;
    public LastUpdated: Date;
}

// 1.	ArtemisID
// 2.	MergedAssetTag
// 3.	MergedLocation
// 4.	ConfirmedBusiness (this field needs to be editable by users)
// 5.	tsCustBusiness
// 6.	AptCOrganisation
// 7.	eMRFOwningBusiness
// 8.	eMRFOperatingBusiness
// 9.	SnowOperatingBusiness
// 10.	eMRFAssetCIOwner
// 11.	SnowAssetOwner
// 12.	MigrationCompleted
// 13.	ExitStrategy
// 14.	ScopeGroup
// 15.	ScopeSet
// 16.	Bucket
// 17.	Wave
// 18.	MigrationComment (this field needs to be editable by users)
// 19.	HighestBucketPerDeployment
// 20.	Planned (this field needs to be editable by users)
// 21.	AptManufacturer
// 22.	AptModel
// 23.	AptModelInfo
// 24.	AptAssetClass
// 25.	AptCDeviceUse
// 26.	tsUsage
// 27.	tsComputerType
// 28.	SnowClass
// 29.	tsOperatingMode
// 30.	tsVirtualization
// 31.	tsPlatform
// 32.	tsConsolidatedOS
// 33.	AptRackName
// 34.	Target
// 35.	MoveToAzure (this field needs to be editable by users)
// 36.	AptSerialNumber
// 37.	SnowSerialNumber
// 38.	tsSystemStatus
// 39.	AptCDeviceCondition
// 40.	SnowStatus
// 41.	tsService
// 42.	tsSpecialService
// 43.	tsNetworkType
// 44.	tsDRS
// 45.	tsSHELL_DeploymentID
// 46.	eMRFDeploymentID
// 47.	tsSHELL_DeploymentName
// 48.	eMRFDeploymentName
// 49.	eMRFDeploymentCIOwner
// 50.	eMRFApplicationID
// 51.	eMRFApplicationName
// 52.	eMRFPortfolioName
// 53.	eMRFPortfolioManager
// 54.	tsAppl_LifeCycle
// 55.	tsAppl_Business_Criticality
// 56.	tsAppl_DR_Required
// 57.	eMRFBusinessApplicationOwner
// 58.	ContactFocalPoint (this field needs to be editable by users)
// 59.	ContactComment (this field needs to be editable by users)

