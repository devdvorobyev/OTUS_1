import { createReadStream, createWriteStream } from 'node:fs';
import { createInterface } from 'node:readline';


async function processLineByLine( readPath, writePath ) {

    const fileStream = createReadStream( readPath || './files_to_read/fst.txt' ),
            /* crlfDelay - делит строки по символам \r\n */
            rl = createInterface({
                input: fileStream,
                crlfDelay: Infinity
            }),
            writeStream = createWriteStream( writePath || './result_file/result.txt' );
    
  
    /* Читаем построчно */
    for await (const line of rl) {
        let finalArray = [],
            excludedSymb = [];
        const formattedLine = line.replace(/[^ \w]/gm,'').split(' ').sort();
        formattedLine.forEach(el => {
            if( !excludedSymb.includes( el ) ){
                finalArray.push( formattedLine.filter( symbol => symbol === el ).length )
            }
            excludedSymb.push( el );
        });
        writeStream.write( JSON.stringify(finalArray) + '\r\n' )
    }
    fileStream.close();
    writeStream.close();
}

//node index.js ./files_to_read/fst.txt ./result_file/new.txt
processLineByLine( process.argv[2], process.argv[3] );