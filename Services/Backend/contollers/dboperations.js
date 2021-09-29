
var config = require('./config');
const sql = require('mssql');
const sample = require('./../model/samples');


async function getSamples() {
    try {
        let pool = await sql.connect(config);
      let products = await pool.request().query("SELECT DISTINCT A.ArtemisID,A.UpdatedBy,A.DateUpdated,A.AddedDate,A.LastUpdatedDate,A.ArtemisName,A.ArtemisLoc,A.ConfirmedBusiness,A.ContactComment,B.tsCustBusiness,C.AptCOrganisation,D.eMRFOwningBusiness,D.eMRFOwningBusiness,D.eMRFOperatingBusiness,E.SnowOperatingBusiness,D.eMRFAssetCIOwner,E.SnowAssetTag, A.MigrationCompleted,A.ExitStrategy,A.ScopeGroup,A.ScopeSet,A.Bucket,A.Wave,A.MigrationComment,A.HighestBucketPerDeployment,A.PlannedDate,C.AptManufacturer,C.AptModel,C.AptModelInfo,C.AptAssetClass,C.AptCDeviceUse,B.tsUsage,B.tsComputerType, E.SnowClass,B.tsOperatingMode,B.tsVirtualization,B.tsPlatform,B.tsConsolidatedOS,C.AptRackName,A.Target,A.Move2Azure,C.AptSerialNumber,E.SnowSerialNumber,B.tsSystemStatus,C.AptCDeviceCondition,E.SnowStatus,B.tsService,B.tsSpecialService,B.tsNetworkType,B.tsDRS,B.tsSHELL_DeploymentID,D.eMRFDeploymentID,B.tsSHELL_DeploymentName,D.eMRFDeploymentName,D.eMRFDeploymentCIOwner,D.eMRFApplicationID,D.eMRFApplicationName,D.eMRFPortfolioName,D.eMRFPortfolioManager,B.tsAppl_LifeCycle,B.tsAppl_Business_Criticality,B.tsAppl_DR_Required,D.eMRFBusinessApplicationOwner,A.ContactFocalPoint FROM ((((dbo.ArtemisProjectPlanNaction_4Test A INNER JOIN dbo.TSILOgicalAsset_4Test B ON A.ArtemisID = B.ArtemisID) INNER JOIN  dbo.TSIPhysicalAsset_4Test C ON C.ArtemisID = B.ArtemisID) INNER JOIN dbo.Dale_App_Data_Raw D ON D.ArtemisID = C.ArtemisID) INNER JOIN dbo.SnowAsset_4Test E ON E.ArtemisID = D.ArtemisID)")

    return products.recordsets;
    // B.tsCustBusiness,B.tsUsage,B.tsComputerType,B.tsOperatingMode,B.tsVirtualization,B.tsPlatform,B.tsConsolidatedOS,B.tsSystemStatus,
    }
    catch (error) {
        console.log(error);
    }
}

async function editsample(editdate){

  try{
    let pool = await sql.connect(config);
    if(editdate.ConfirmedBusiness != null){
    let insertComment = await pool.request()
    .input('ArtemisID', sql.Int, editdate.ArtemisID)
    .input('ContactFocalPoint', sql.NVarChar, editdate.ContactFocalPoint)
    .input('ConfirmedBusiness', sql.NVarChar, editdate.ConfirmedBusiness)
    .input('Move2Azure', sql.NVarChar, editdate.Move2Azure)
    .query("UPDATE dbo.ArtemisProjectPlanNaction_4Test SET ConfirmedBusiness=@ConfirmedBusiness,ContactFocalPoint=@ContactFocalPoint,Move2Azure=@Move2Azure WHERE ArtemisID = @ArtemisID")
    .then(res =>{
    })
    return insertComment;
  }
  }
  catch (err) {
    console.log(err);
}
}
async function addSamples(sample) {

  try {
      let pool = await sql.connect(config);
      let insertComment = await pool.request()
      .input('ContactComment', sql.NVarChar, sample.ContactComment)
      .input('ArtemisID', sql.Int, sample.ArtemisID)
      .input('UpdatedBy', sql.NVarChar, sample.UpdatedBy)
      .input('DateUpdated', sql.DateTime, sample.lastUpdated)
      .input('LastUpdatedDate', sql.DateTime, sample.LastUpdatedDate)
      .input('AddedDate', sql.DateTime, sample.LastUpdatedDate)
      // .query("SELECT ContactComment FROM dbo.ArtemisProjectPlanNaction_4Test WHERE ArtemisID=@ArtemisID")
      .query("UPDATE dbo.ArtemisProjectPlanNaction_4Test SET AddedDate=@AddedDate WHERE ArtemisID = @ArtemisID AND ContactComment IS NULL")
      .then(res =>{
        pool.request()
        .input('ContactComment', sql.NVarChar, sample.ContactComment)
      .input('ArtemisID', sql.Int, sample.ArtemisID)
      .input('UpdatedBy', sql.NVarChar, sample.UpdatedBy)
      .input('DateUpdated', sql.DateTime, sample.lastUpdated)
      .input('LastUpdatedDate', sql.DateTime, sample.LastUpdatedDate)
        .query("UPDATE dbo.ArtemisProjectPlanNaction_4Test SET ContactComment= @ContactComment, UpdatedBy = @UpdatedBy,LastUpdatedDate=@LastUpdatedDate WHERE ArtemisID = @ArtemisID", (err,res) =>{

      // .query("SELECT ContactComment,DateUpdated,UpdatedBy,LastUpdatedDate,AddedDate,LastInScope FROM dbo.ArtemisProjectPlanNaction_4Test WHERE ArtemisID = @ArtemisID")

        })
      }).then(result =>{
       pool.request()
      .input('ContactComment', sql.NVarChar, sample.ContactComment)
      .input('ArtemisID', sql.Int, sample.ArtemisID)
      .input('UpdatedBy', sql.NVarChar, sample.UpdatedBy)
      .input('DateUpdated', sql.DateTime, sample.lastUpdated)
      .input('LastUpdatedDate', sql.DateTime, sample.LastUpdatedDate)
      .input('AddedDate', sql.DateTime, sample.LastUpdatedDate)
      .query("SELECT ContactComment,DateUpdated,UpdatedBy,LastUpdatedDate,AddedDate,LastInScope FROM dbo.ArtemisProjectPlanNaction_4Test WHERE ArtemisID = @ArtemisID",(err,res) =>{
        return res.recordset;

      })
      // console.log(insertComment.recordset,'reco')
      }).then(result =>{
        pool.request()
       .input('ContactComment', sql.NVarChar, sample.ContactComment)
       .input('ArtemisID', sql.Int, sample.ArtemisID)
       .input('UpdateBy', sql.NVarChar, sample.UpdatedBy)
       .input('DateUpdated', sql.DateTime, sample.lastUpdated)
       .input('LastUpdatedDate', sql.DateTime, sample.LastUpdatedDate)
       .input('AddedDate', sql.DateTime, sample.LastUpdatedDate)
      .query("INSERT INTO dbo.ArtemisApplicationProject_4Test (ArtemisID,ContactComment,UpdateBy,LastUpdatedDate) VALUES (@ArtemisID,@ContactComment,@UpdateBy,@LastUpdatedDate)",(err,res) =>{
        //  return res.recordset;

       })
       // console.log(insertComment.recordset,'reco')
       })


  }
  catch (err) {
      console.log(err);
  }

}
async  function  getSample(productId) {
  try {
    let  pool = await  sql.connect(config);
    let  comments = await  pool.request()
    .input('ArtemisID', sql.Int, productId)
    .query("SELECT LastUpdatedDate,ContactComment,UpdateBy FROM dbo.ArtemisApplicationProject_4Test WHERE ArtemisID = @ArtemisID")
    let  product = await  pool.request()
    .input('ArtemisID', sql.Int, productId)
    .query("SELECT TOP(1)  A.ArtemisID,A.DateUpdated,A.AddedDate,A.ArtemisName,A.ArtemisLoc,A.ConfirmedBusiness,B.tsCustBusiness,C.AptCOrganisation,D.eMRFOwningBusiness,D.eMRFOwningBusiness,D.eMRFOperatingBusiness,E.SnowOperatingBusiness,D.eMRFAssetCIOwner,E.SnowAssetTag, A.MigrationCompleted,A.ExitStrategy,A.ScopeGroup,A.ScopeSet,A.Bucket,A.Wave,A.MigrationComment,A.HighestBucketPerDeployment,A.PlannedDate,C.AptManufacturer,C.AptModel,C.AptModelInfo,C.AptAssetClass,C.AptCDeviceUse,B.tsUsage,B.tsComputerType, E.SnowClass,B.tsOperatingMode,B.tsVirtualization,B.tsPlatform,B.tsConsolidatedOS,C.AptRackName,A.Target,A.Move2Azure,C.AptSerialNumber,E.SnowSerialNumber,B.tsSystemStatus,C.AptCDeviceCondition,E.SnowStatus,B.tsService,B.tsSpecialService,B.tsNetworkType,B.tsDRS,B.tsSHELL_DeploymentID,D.eMRFDeploymentID,B.tsSHELL_DeploymentName,D.eMRFDeploymentName,D.eMRFDeploymentCIOwner,D.eMRFApplicationID,D.eMRFApplicationName,D.eMRFPortfolioName,D.eMRFPortfolioManager,B.tsAppl_LifeCycle,B.tsAppl_Business_Criticality,B.tsAppl_DR_Required,D.eMRFBusinessApplicationOwner,A.ContactFocalPoint FROM dbo.ArtemisProjectPlanNaction_4Test AS A, dbo.TSILOgicalAsset_4Test AS B, dbo.TSIPhysicalAsset_4Test AS C, dbo.Dale_App_Data_Raw AS D, dbo.SnowAsset_4Test AS E WHERE A.ArtemisID = @ArtemisID")
    let data = product.recordsets;
    return  data;
  }
  catch (error) {
    console.log(error);
  }
}

async  function  getComments(productId) {
  try {
    let  pool = await  sql.connect(config);
    let  comments = await  pool.request()
    .input('ArtemisID', sql.Int, productId)
    .query("SELECT LastUpdatedDate,ContactComment,UpdateBy FROM dbo.ArtemisApplicationProject_4Test WHERE ArtemisID = @ArtemisID ORDER BY LastUpdatedDate DESC")
    return  comments.recordsets;
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = {getSamples:  getSamples, addSamples : addSamples, editsample : editsample, getSample: getSample, getComments: getComments};
