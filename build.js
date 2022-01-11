const fs = require('fs');
const ejs = require('ejs');
const sass = require('sass');

const OUTPUT = '';

function main() {

    let outDir = __dirname + '/' + OUTPUT;
    checkDirExists(outDir);

    // index.ejs

    let indexDir = __dirname + '/src/index.ejs';
    checkDirExists(indexDir);

    let destDir = outDir + '/index.html';

    renderPage(indexDir, destDir, {});

    // index.scss

    let styleDir = __dirname + '/src/stylesheets/index.scss';
    checkDirExists(styleDir);

    destDir = outDir + '/index.css';

    renderStyle(styleDir, destDir);

}

function checkDirExists(dir) {

    if (!fs.existsSync(dir))
        throw new Error('{ NQ } -- directory [ ' + dir + ' ] does not exist --');

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