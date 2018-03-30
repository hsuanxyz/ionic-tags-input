const fs = require('fs-extra');
const path = require('path');

const buildDir = path.resolve(__dirname, '../.src');
const srcDir = path.resolve(__dirname, '../src/ion-tags-input');

fs.copySync(srcDir, buildDir);

const files = fs.readdirSync(buildDir);
const scssFiles = files.filter(file => /\.scss$/.test(file));
scssFiles.forEach(file => {
  const tsFile = `${buildDir}/${file.replace(/\.scss$/g, '.ts')}`;
  if (fs.existsSync(tsFile)) {
    let fileContent = fs.readFileSync(tsFile, 'utf-8');
    fileContent = fileContent.replace(/styleUrls\s*:\s*\[.*\]/g, `styleUrls: [ './${file}' ]`);
    fs.writeFileSync(tsFile, fileContent, 'utf-8')
  }
});


