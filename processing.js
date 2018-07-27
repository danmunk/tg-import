const { sleep } = require("./helpers")
const { filesGet, filesList, filesExport } = require('./google-drive');
const { pretty } = require('js-object-pretty-print');

const processDirectory = async (drive, id, path) => {  
  const currentFile = await filesGet(drive, id);
  path = `${path}/${currentFile.data.name}`;
  console.log(path);

  const response = await filesList(drive, id);
  
  for (file of response.data.files) {
    await sleep(300);
    await processFile(drive, file, path);
  }
}


const processFile = async (drive, file, path) => {
  
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      await processDirectory(drive, file.id, path);
    } else if (file.mimeType === 'application/vnd.google-apps.document') {
      console.log(`**** processing file ${file.name}`);
      // const contents = await filesExport(drive, file.id);
      // console.log(contents);
    }  else {
      console.log(`!!!!!!!!!!!!!! ${path}/${file.name} ${file.mimeType} ${file.id}`);
    }
};


module.exports.processDirectory = processDirectory;