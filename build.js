const fs = require('fs');
const ejs = require('ejs');
const sass = require('sass');
const marked = require('marked');

// prevent marked from adding id elements to headers
// see here: https://github.com/treasonx/grunt-markdown/issues/54
const renderer = new marked.Renderer();
renderer.heading = (text, level) => { 
    return `<h${level}>${text}</h${level}>\n`;
};

marked.use({ renderer });

const OUTPUT = '';

function main() {

    let outDir = __dirname + '/' + OUTPUT;
    checkDirExists(outDir);

    // cv.md

    let markdownDir = __dirname + '/src/cv.md';
    checkDirExists(markdownDir);

    let cvHTML = parseMarkdown(markdownDir);

    // index.ejs

    let indexDir = __dirname + '/src/index.ejs';
    checkDirExists(indexDir);

    let destDir = outDir + '/index.html';
    renderPage(indexDir, destDir, { cvHTML: cvHTML });

    // index.scss

    let styleDir = __dirname + '/src/stylesheets/index.scss';
    checkDirExists(styleDir);

    destDir = outDir + '/index.css';
    renderStyle(styleDir, destDir);

}

function checkDirExists(dir) {

    if (!fs.existsSync(dir))
        throw new Error('-- Directory [ ' + dir + ' ] does not exist --');

}

function parseMarkdown(srcDir) {

    let markdown = fs.readFileSync(srcDir, 'utf8');
    return marked.parse(markdown);

}

function renderPage(sourceDir, destDir, data) {

    ejs.renderFile(sourceDir, data, (err, str) => {
            
        if (err != undefined) throw err;

        fs.writeFile(destDir, str, (err) => {

            if (err != undefined) throw err;

        });

    });

}

function renderStyle(sourceDir, destDir) {

    sass.render({ file: sourceDir }, (err, result) => {

        if (err != undefined) throw err;

        fs.writeFile(destDir, result.css.toString(), (err) => {

            if (err != undefined) throw err;

        });

    });

}

main();