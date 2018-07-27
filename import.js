const { google } = require('googleapis');
const { authenticate } = require('./google-auth');
const { processDirectory } = require('./processing');
const { filesExport, filesGet } = require('./google-drive');
const { pretty } = require('js-object-pretty-print');
const fs = require('fs');

const Settings = require("./settings");

// const id = '1OrcRpYbz6oISJNffOiQ7CnDcLkmbvtcU';

(async function(){
  var auth = await authenticate();  
  const drive = google.drive({ version: 'v3', auth });  
  await processDirectory(drive, Settings.GOLF_COURSES_ID, '');
})();
