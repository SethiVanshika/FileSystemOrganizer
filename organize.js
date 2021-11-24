let fs = require("fs");
let path = require("path");
function organizeFn(dirPath) {
  let destPath;
  if (dirPath == undefined) {
    destPath = process.cwd();
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      destPath = path.join(dirPath, "organized_files");
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
    }
    else {
      console.log("Kindly enter the correct path");
      return;
    }

  }
  organizeHelper(dirPath, destPath);
}
function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  //console.log(childNames); 
  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      console.log(childNames[i]);
      let category = getCategory(childNames[i]);
      //console.log(childNames[i],"belongs to -->",category);
      sendFiles(childAddress, dest, category);
    }
  }
}
function getCategory(name) {
  let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xslx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps'],
    app: ['exe', 'dmg', 'pkg', 'deb']
  }
  let ext = path.extname(name);
  ext = ext.slice(1);
  for (let type in types) {
    let cTypeArray = types[type];
    for (let i = 0; i <= cTypeArray.length; i++)
      if (ext == cTypeArray[i])
        return type;
      }
      return "others";
}
function sendFiles(src, dest, category) {
  let categoryPath = path.join(dest, category);
  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath);
  }
  let fileName = path.basename(src);
  let destFP = path.join(categoryPath, fileName);
  fs.copyFileSync(src, destFP);
  console.log(fileName, "organized to", category);
}
module.exports = {
  orgK: organizeFn
}

