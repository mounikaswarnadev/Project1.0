

// const postSchema = ({
//   id: { type: String, required: true },
//   siteComments: { type: String, required: true },
//   artemisId: { type: String, required: true },
//       bussinessAppName: { type: String, required: true },
//       correlationId: { type: String, required: true },
//       serverName:{ type: String, required: true },
//       appContactName:{ type: String, required: true },
//       installStatus: { type: String, required: true }

// });

// module.exports = postSchema

class Samples{
  constructor(siteComments,artemisId,bussinessAppName,correlationId,serverName,appContactName,installStatus,ContactComment, UpdatedBy, DateUpdated, AddedDate, LastUpdatedDate){
    this.ArtemisID = artemisId;
    this.BusinessAppName = bussinessAppName;
    this.CorrelationID = correlationId;
    this.ServerName = serverName;
    this.AppContactName = appContactName;
    this.installStatus = installStatus;
    this.siteComments = siteComments;
    this.ContactComment = ContactComment;
    this.UpdatedBy = UpdatedBy;
    this.DateUpdated = DateUpdated;
    this.AddedDate = AddedDate;
    this.LastUpdatedDate = LastUpdatedDate

  }
}

module.exports = Samples;
