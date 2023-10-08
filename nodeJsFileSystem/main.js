const fileSys = require('fs');
const pathExtension = require('path');


async function printFileSysPath (fileSys, path, depFlag = '',depLevel = 1, prntPath = false, level = 2, dirCount = 0, fileCount = 0) {

    let countDir = dirCount,
        countFiles = fileCount,
        fileArray = [];

    prntPath ? printTree(path.replace(/.\//gm,''), level - 1) : '';

    /* Читаем файлы */
    await readFiles(fileSys, path).then(
        (files) => {
            fileArray = files;
        },
        (error) => {
            console.error(error);
        }
    )
    
    /* перебираем файлы в массиве, не forEach - т.к. тогда нельзя сделать нормальный await */
    for(let key in fileArray){
        if( pathExtension.extname(fileArray[key]) ){
            countFiles++
            printTree(fileArray[key], level);
        }else{
            countDir++
            printTree(fileArray[key], level);
            if(level <= depLevel){
                let { countDir:returnedCntDir, countFiles:returnedCntFiles } = await printFileSysPath(fileSys, path + '/' + fileArray[key], '-d', depLevel, false, level + 1) 
                countFiles += returnedCntFiles;
                countDir += returnedCntDir;
            }else{
                return {countDir, countFiles}
            }
        }
    }
    return {countDir, countFiles}
}

/* Обернул в Async что бы console.log ждал резульатт функции */
let asyncShell = async () => {
    let {countDir, countFiles} = await printFileSysPath(fileSys, process.argv[2], process.argv[3], process.argv[4], true);

    console.log(`${countDir} directories, ${countFiles} files`);
}

/* Вызов */
asyncShell();

function readFiles(fileSys, path){
    return new Promise((resolve, reject) => {
        fileSys.readdir(path, (err, files) => {
            if(err) reject(err); // не прочитать содержимое папки
            resolve(files)    
        });
    })
}


function printTree(strToPrint, level) {
    console.log( level > 1  ? level == 2 ? '├' + '─'  + strToPrint : '│' + ' '.repeat( level - 2 ) + '└' + '─' + strToPrint : strToPrint );
}