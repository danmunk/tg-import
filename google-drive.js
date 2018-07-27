const { google } = require('googleapis');

const TEAM_DRIVE_ID = '0AP07WSkRKZ9kUk9PVA';

const googleDrive = (auth) => google.drive({ version: 'v3', auth });

module.exports.filesList = (drive, parentId) => drive.files.list({
  pageSize: 1000,
  teamDriveId: TEAM_DRIVE_ID,
  q: "'" + parentId +"' in parents",
  includeTeamDriveItems: true,
  corpora: "teamDrive",
  supportsTeamDrives: true,
});

module.exports.filesExport = (drive, fileId) => drive.files.export({
  // application/vnd.google-apps.document
  
  fileId: fileId, // '1jxyOphOb3pJR_DFyJFk78N7UPqlD-PTTroPWn8CM6Gg'
  mimeType: 'text/plain',
})

module.exports.filesGet = (drive, fileId) => drive.files.get({
  fileId: fileId,
   // alt: 'media',
  supportsTeamDrives: true,
});


// drive.files.get({
//   // 1IruUndXksVzZBSIrVcpXZmyauE5MhAnV
    
//   fileId: '1kcqld5qdVEr0Co7g93vAzqSDBOBROiwwWKlI4hcu_EY',
//   alt: 'media',
//   supportsTeamDrives: true,
// }).then((result) => {
//   console.log(`****** ${result.name} ${result.mimeType} (${result.id})`);
//   // result.executeMediaAndDownloadTo("./test.docx");

//   console.log(result);
// })

// filesExport(drive, '1jxyOphOb3pJR_DFyJFk78N7UPqlD-PTTroPWn8CM6Gg').then((result) => {
//   console.log(result.data);
// })  