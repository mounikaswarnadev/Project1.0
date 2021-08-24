
var config = require('./config');
const sql = require('mssql');
const sample = require('./../model/samples');


async function getSamples() {
    try {
        let pool = await sql.connect(config);
    let  products = await  pool.request().query("SELECT  A.CorrelationID, A.ArtemisID,A.ServerName,A.BusinessAppName,A.AppContactName,A.installStatus, B.ContactComment, B.UpdatedBy, B.DateUpdated,B.LastUpdatedDate, B.AddedDate FROM dbo.Applications A,dbo.ArtemisProjectPlanNaction_4Test B  WHERE A.ArtemisID = B.ArtemisID AND A.BusinessAppName IS NOT NULL");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
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
      // .query("UPDATE dbo.ArtemisProjectPlanNaction_4Test SET AddedDate=@AddedDate WHERE ArtemisID = @ArtemisID AND ContactComment IS NULL",(err,res)=>{
      //   if(!err){

      //   }
      // })
      .query("UPDATE dbo.ArtemisProjectPlanNaction_4Test SET ContactComment= @ContactComment, UpdatedBy = @UpdatedBy,LastUpdatedDate=@LastUpdatedDate WHERE ArtemisID = @ArtemisID", (err,res) =>{
        console.log(res,'ress');
      })
      .query("SELECT ContactComment,DateUpdated,UpdatedBy,LastUpdatedDate,AddedDate,LastInScope FROM dbo.ArtemisProjectPlanNaction_4Test WHERE ArtemisID = @ArtemisID")
      console.log(insertComment.recordset,'reco')
      return insertComment.recordset;
  }
  catch (err) {
      console.log(err);
  }

}

module.exports = {getSamples:  getSamples, addSamples : addSamples};
