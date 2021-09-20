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
