const { google } = require('googleapis');
const path = require('path');
const fs= require('fs');
const dir = '/';
const filePath = path.join('index.js');
let mongoose =require("mongoose");

let mongoURI="mongodb+srv://n7jIC8HFXMl2cTLN:n7jIC8HFXMl2cTLN@cluster0.ee0u5.mongodb.net/Mydb1?retryWrites=true&w=majority"

mongoose.connect(mongoURI, { useNewUrlParser: false }) .then(() => console.log("MongoDB connected")) .catch((err) => console.log(err));

var NewOne =mongoose.model("NewOne",mongoose.Schema({
  id:Number,
  name:String,
  Fileid:String,
  Date:{
    type: String,
    default:datetime
  }
}));

var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();


// (async()=>{
//   let result=await NewOne.find()
//   console.log(result)
// })()
const CLIENT_ID = '914260115450-nqu686jng62ab1ofn3eni4bn2r5ult2l.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04j_sLFfDUu3PCgYIARAAGAQSNwF-L9IreZX00FK6OgG7gksI4OUle2TKCUVCoRaaj4hL_eXDKvx4sInsGOJ4VRYyfmqh4FAeos4';
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});
async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'myfile', //This can be name of your choice
        mimeType: 'text/javascript',
      },
      media: {
        mimeType: 'text/javascript',
        body: fs.createReadStream(filePath),
      },
    });
  NewOne.create( { id:1066,
  name:"file1",
  Fileid:response.data.id,
                  Date:datetime
                 }).then(()=>console.log("successfully save on drive"))
  .catch(e=>console.log(e))
  } catch (error) {
    console.log(error.message);
  }
}
uploadFile(); 