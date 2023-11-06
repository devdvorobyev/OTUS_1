const fileSys = require('fs');
const pathExtension = require('path');


async function printFileSysPath (fileSys, path, depFlag = '',depLevel = 1, prntPath = true, level = 2, dirCount = 0, fileCount = 0) {

    let countDir = dirCount,
        countFiles = fileCount;

    if(prntPath) printTree(path.replace(/.\//gm,''), level - 1);

    /* Читаем файлы */
    const files = await readFiles(fileSys, path).catch(err => console.log(err));
    /* перебираем файлы в массиве, не forEach - т.к. тогда нельзя сделать нормальный await */
    for(let key in files){
        if( pathExtension.extname(files[key]) ){
            countFiles++;
            printTree(files[key], level);
        }else{
            countDir++;
            printTree(files[key], level);
            /* console.log(files, depLevel); */
            if(level <= depLevel){
                let { countDir:returnedCntDir, countFiles:returnedCntFiles } = await printFileSysPath(fileSys, path + '/' + files[key], depFlag, depLevel, false, level + 1) 
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
    let {countDir, countFiles} = await printFileSysPath(fileSys, process.argv[2], process.argv[3], process.argv[4]);

    console.log(`${countDir} directories, ${countFiles} files`);
}

/* Вызов */
asyncShell();

function readFiles(fileSys, path){
    return new Promise((resolve, reject) => {
        fileSys.readdir(path, (err, files) => {
            if( err ) reject(err); // не прочитать содержимое папки
            if( files && files !== undefined && files.length ) resolve(files.filter(el => !(/(^|\/)\.[^\/\.]/g).test(el)));//Игнорим системные файлы
            resolve(); //Если в папке нет файлов
        });
    })
}


function printTree(strToPrint, level) {
    console.log( level > 1  ? level == 2 ? '├' + '─'  + strToPrint : '│' + ' '.repeat( level - 2 ) + '└' + '─' + strToPrint : strToPrint );
}