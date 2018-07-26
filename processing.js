const { sleep } = require("./helpers")
const { filesGet, filesList, filesExport } = require('./google-drive');
const { pretty } = require('js-object-pretty-print');

const processDirectory = async (drive, id) => {  
  const currentFile = await filesGet(drive, id);
  console.log(`### processing directory ${currentFile.data.name} [GOOGLE ID ${id}]`);

  const directories = await filesList(drive, id);
  
  var p = Promise.resolve();
  directories.data.files.map((file) => {
    const next = () => new Promise((resolve, reject) => {
      processFile(drive, file).then((results) => {
        resolve();
      })
    });
    p = p.then(next);
  });
}


const processFile = (drive, file) => new Promise((resolve, reject) => {
  sleep(3000).then(() => {
    console.log(`----- ${file.name} ${file.mimeType} ${file.id}`);

    if (file.mimeType === 'application/vnd.google-apps.folder') {
      return processDirectory(drive, file.id).then(() => {
        resolve();
      })
    } else {
      resolve();
    }
    
  });
});

module.exports.processDirectory = processDirectory;