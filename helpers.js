module.exports.sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports.cleanFileName = (path, file) => {
  path = `${path}-${file.id}`;

  if (path.startsWith("/")) {
    path = path.substring(1);
  }
  path = path.replace(/ \//g, '-');;
  path = path.replace(/\//g, '_');;
  path = path.replace(/[ ]*[&]+[ ]*/g, '-and-');
  path = path.replace(/[ ]+/g, "-");

  return path;
}