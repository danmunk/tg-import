const { google } = require('googleapis');
const { authenticate } = require('./google-auth');
const { processDirectory } = require('./processing');

const Settings = require("./settings");


(async function(){
  var auth = await authenticate();  
  const drive = google.drive({ version: 'v3', auth });

  await processDirectory(drive, Settings.CONCIERGE_SERVICES_ID);
  // const conciergeDirectories = await filesList(drive, Settings.CONCIERGE_SERVICES_ID);
  
  // var p = Promise.resolve();
  // conciergeDirectories.data.files.map((file) => {

  //   const next = (f) => new Promise((resolve, reject) => {
  //     sleep(1000).then(() => {
  //       console.log("child done");
  //       resolve();
  //     });
  //   });
  //   p = p.then(next);
  // });
})();
