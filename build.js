const path = require('path');
const ssg = require('./simple-ssg');

const INPUT = 'src'
const OUTPUT = 'docs';

function main() {

    let inDir = path.join(__dirname, INPUT);
    ssg.checkDirExists(inDir);

    let outDir = path.join(__dirname, OUTPUT);
    ssg.checkDirExists(outDir);

    // process cv.md

    let markdownDir = path.join(inDir, 'markdown', 'cv.md');
    let cvHTML = ssg.parseMarkdown(markdownDir);

    // process index.ejs

    let indexDir = path.join(inDir, 'pages', 'index.ejs');
    ssg.checkDirExists(indexDir);

    let destDir = path.join(outDir, 'index.html');
    ssg.renderPage(indexDir, destDir, { cvHTML: cvHTML });

    // process index.scss

    let styleDir = path.join(inDir, 'stylesheets', 'index.scss');
    ssg.checkDirExists(styleDir);

    destDir = path.join(outDir, 'index.css');
    ssg.renderStyle(styleDir, destDir);

}

main();