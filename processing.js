const { sleep, cleanFileName } = require("./helpers")
const { filesGet, filesList, filesExport } = require('./google-drive');
const { pretty } = require('js-object-pretty-print');
const fs = require('fs');

const processDirectory = async (drive, id, path) => {  
  const currentFile = await filesGet(drive, id);
  path = `${path}/${currentFile.data.name}`;

  
  const response = await filesList(drive, id);
  
  for (file of response.data.files) {
    if (file.name === 'Florida' || file.name === 'Alabama') {
      continue;
    }
    await sleep(50);
    await processFile(drive, file, path);
  }
}

const processFile = async (drive, file, path) => {  
    if (file.mimeType === 'application/vnd.google-apps.folder') {
      await processDirectory(drive, file.id, path);
    } else if (file.mimeType === 'application/vnd.google-apps.document') {
      const fileName =  cleanFileName(path + '/' + file.name, file)
      console.log(`processing gdoc ${fileName}`);
      const response = await filesExport(drive, file.id);
      fs.writeFileSync(`import/${fileName}.txt`, response.data);
    } else if (file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      console.log(`!!!! word doc ${file.id}`);
      console.log(path + "/" + file.name);
    } else if (file.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      console.log(`!!!! xls spreadsheet ${file.id}`);
      console.log(path + "/" + file.name);
    }  else {
      console.log(`!!! ${file.mimeType} (${file.id})`)
      console.log(path + "/" + file.name);
    }
};


module.exports.processDirectory = processDirectory;