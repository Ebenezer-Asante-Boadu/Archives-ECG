import { createObjectCsvWriter } from 'csv-writer';
import type { newError } from "./Types";
import { readdir, readFile, writeFile } from 'node:fs/promises';
require('dotenv').config();


interface nameCount {
    name: string,
    count: number
}

let readyFileName = "";

async function lineCounter(file_name: string): Promise<number> {
    const path = './src/dist/ERROR_LOGS/' + file_name;
    let recordCount = 0;

    try {
        const contents = await readFile(path, { encoding: 'utf8' });
        contents.split("\n").forEach((data, index) => { recordCount += 1; })
    } catch (err: any) {
        console.error(err.message);
    }

    return recordCount;
}


async function getLastFileName_Index(): Promise<nameCount> {
    const path = './src/dist/ERROR_LOGS';
    let fileNames = [""];

    try {
        const files = await readdir(path);
        for (const file of files)
            fileNames.push(file);
        //console.log(file);
    } catch (err) {
        //  console.error(err);
    }
    readyFileName = fileNames[fileNames.length-1];

    const ret: nameCount = {
        name: fileNames[fileNames.length - 1],
        count: fileNames.length - 1,
    };
    return ret;
}
// // console.log(900)
// getLastFileName_Index().then((data)=>{console.log(data.count)}).catch((er)=>{console.log(er)})



async function prepareFileForAppending() {
    const path = './src/dist/ERROR_LOGS/';

    try {
        getLastFileName_Index()
            .then((data) => {
                if (data.count > 0) {
                    lineCounter(data.name)
                        .then((data2) => {
                            if (data2 < Number(process.env.MAXIMUM_CSV_RECORDS_ROWS_IN_FILES)) {
                                //append the error
                            }
                            else {
                                //create file
                                try {
                                    writeFile(`${path}/error${Number(data.count) + 1}.csv`, "")
                                } catch (error) {
                                    //couldn't create file
                                    return
                                }
                            }
                        })
                        .catch((err) => {
                            //error in counting line
                            try {
                                writeFile(`${path}/error${Number(data.count) + 1}.csv`, "")
                            } catch (error) {
                                //couldn't create file
                                return
                            }
                        })
                } else {
                    //create file
                    try {
                        writeFile(`${path}/error${Number(data.count) + 1}.csv`, "")
                    } catch (error) {
                        //couldn't create file
                        return
                    }
                }
            })
            .catch((error) => {
                //error in getting the last name and index
                //record in firebase or send mail
                return;
            })
    }
    catch (err) {
        //everything failed or part failed
        return
    }
}

// prepareFileForAppending();




export async function logError(error: newError) { 
    prepareFileForAppending(); 
    let results: boolean = false;
    console.log(readyFileName)
    const csvWriter = createObjectCsvWriter({
        path: `./src/dist/ERROR_LOGS/${readyFileName}`,
        header: [
            { id: 'identifier', title: 'ID' },
            { id: 'file', title: 'ERROR CAUSED FILE' },
            { id: 'line', title: 'LINE ERROR' },
            { id: "time", title: "TIMESTAMP" },
            { id: "msg", title: "ERROR MESSAGE" },
            { id: "code", title: "ERROR CODE" }
        ],
        append: true
    });

    const Error = [{
        identifier: error.id,
        file: error.file,
        line: error.line,
        time: new Date().toISOString(),
        msg: error.message,
        code: error.error_code
    }];

    await csvWriter.writeRecords(Error)
        .then((success) => { console.log("success") })
        .catch((err) => { console.log("error " + err) });

    return results;
}

// prepareFileForAppending();