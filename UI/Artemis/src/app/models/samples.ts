import { JsonObject, JsonProperty, JsonElementType } from 'ta-json';


export class SampleDetails {
  // @JsonProperty('sampleId')
  // @JsonElementType(String)
  // sampleId: string;
  @JsonProperty('id')
  @JsonElementType(String)
  id: string;
  @JsonProperty('ArtemisID')
  @JsonElementType(String)
  ArtemisID: string;
  @JsonProperty('ArtemisName')
  @JsonElementType(String)
  ArtemisName: string;
  @JsonProperty('ArtemisLoc')
  @JsonElementType(String)
  ArtemisLoc: string;
  @JsonProperty('ConfirmedBusiness')
  @JsonElementType(String)
  ConfirmedBusiness: string;
  @JsonProperty('tsCustBusiness')
  @JsonElementType(String)
  tsCustBusiness: string;
  @JsonProperty('AptCOrganisation')
  @JsonElementType(String)
  AptCOrganisation: string;
  @JsonProperty('eMRFOwningBusiness')
  @JsonElementType(String)
  eMRFOwningBusiness: string;
  @JsonProperty('eMRFOperatingBusiness')
  @JsonElementType(String)
  eMRFOperatingBusiness: string;
  @JsonProperty('SnowOperatingBusiness')
  @JsonElementType(String)
  SnowOperatingBusiness: string;
  @JsonProperty('eMRFAssetCIOwner')
  @JsonElementType(String)
  eMRFAssetCIOwner: string;
  @JsonProperty('SnowAssetOwner')
  @JsonElementType(String)
  SnowAssetOwner: string;
  @JsonProperty('ExitStrategy')
  @JsonElementType(String)
  ExitStrategy: string;
  @JsonProperty('ScopeGroup')
  @JsonElementType(String)
  ScopeGroup: string;
  @JsonProperty('ScopeSet')
  @JsonElementType(String)
  ScopeSet: string;
  @JsonProperty('Bucket')
  @JsonElementType(String)
  Bucket: string;
  @JsonProperty('Wave')
  @JsonElementType(String)
  Wave: string;
  @JsonProperty('HighestBucketPerDeployment')
  @JsonElementType(String)
  HighestBucketPerDeployment: string;
  @JsonProperty('AptManufacturer')
  @JsonElementType(String)
  AptManufacturer: string;
  @JsonProperty('Planned')
  @JsonElementType(String)
  Planned: Date;
  @JsonProperty('AptModel')
  @JsonElementType(String)
  AptModel: string;
  @JsonProperty('AptModelInfo')
  @JsonElementType(String)
  AptModelInfo: string;
  @JsonProperty('AptAssetClass')
  @JsonElementType(String)
  AptAssetClass: string;
  @JsonProperty('AptCDeviceUse')
  @JsonElementType(String)
  AptCDeviceUse: string;
  @JsonProperty('tsUsage')
  @JsonElementType(String)
  tsUsage: string;
  @JsonProperty('tsComputerType')
  @JsonElementType(String)
  tsComputerType: string;
  @JsonProperty('SnowClass')
  @JsonElementType(String)
  SnowClass: string;
  @JsonProperty('tsOperatingMode')
  @JsonElementType(String)
  tsOperatingMode: string;
  @JsonProperty('tsVirtualization')
  @JsonElementType(String)
  tsVirtualization: string;
  @JsonProperty('tsPlatform')
  @JsonElementType(String)
  tsPlatform: string;
  @JsonProperty('BusinessAppName')
  @JsonElementType(String)
  bussinessAppName: string;
  @JsonProperty('CorrelationID')
  @JsonElementType(String)
  correlationId: string;
  @JsonProperty('ServerName')
  @JsonElementType(String)
  serverName: string;
  @JsonProperty('AppContactName')
  @JsonElementType(String)
  appContactName: string;
  @JsonProperty('installStatus')
  @JsonElementType(String)
  installStatus: string;
  @JsonProperty('ContactComment')
  @JsonElementType(String)
  ContactComment: string;
  @JsonProperty('UpdatedBy')
  @JsonElementType(String)
  UpdatedBy: string;
  @JsonProperty('siteComments')
  @JsonElementType(String)
  siteComments: string;
  @JsonProperty('calibrationFileName')
  @JsonElementType(String)
  calibrationFileName: string;
  @JsonProperty('isParent')
  @JsonElementType(Boolean)
  isParent: boolean;
  @JsonProperty('imageCount')
  @JsonElementType(Number)
  imageCount?: number;
  @JsonProperty('isAcknowledged')
  @JsonElementType(Boolean)
  isAcknowledged?: boolean;
  @JsonProperty('selected')
  @JsonElementType(Boolean)
  selected?: boolean;
  // thumbnailImageUrl?: string;
  @JsonProperty('centerSliceImageUrl')
  @JsonElementType(String)
  centerSliceImageUrl?: string;
  @JsonProperty('rawImageUrl')
  @JsonElementType(String)
  rawImageUrl?: string;
  @JsonProperty('workflowInstanceId')
  @JsonElementType(String)
  workflowInstanceId?: string;
  @JsonProperty('reportUrl')
  @JsonElementType(String)
  reportUrl?: string;
  @JsonProperty('DateUpdated')
  DateUpdated?: Date;
  @JsonProperty('LastUpdatedDate')
  LastUpdatedDate?: Date;
  @JsonProperty('LastInScope')
  LastInScope?: Date;
  @JsonProperty('excelReportUrl')
  @JsonElementType(String)
  excelReportUrl?: string;
  createdOn: Date
}
