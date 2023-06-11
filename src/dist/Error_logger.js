"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
const csv_writer_1 = require("csv-writer");
const promises_1 = require("node:fs/promises");
require('dotenv').config();
let readyFileName = "";
function lineCounter(file_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = './src/dist/ERROR_LOGS/' + file_name;
        let recordCount = 0;
        try {
            const contents = yield (0, promises_1.readFile)(path, { encoding: 'utf8' });
            contents.split("\n").forEach((data, index) => { recordCount += 1; });
        }
        catch (err) {
            console.error(err.message);
        }
        return recordCount;
    });
}
function getLastFileName_Index() {
    return __awaiter(this, void 0, void 0, function* () {
        const path = './src/dist/ERROR_LOGS';
        let fileNames = [""];
        try {
            const files = yield (0, promises_1.readdir)(path);
            for (const file of files)
                fileNames.push(file);
            //console.log(file);
        }
        catch (err) {
            //  console.error(err);
        }
        readyFileName = fileNames[fileNames.length - 1];
        const ret = {
            name: fileNames[fileNames.length - 1],
            count: fileNames.length - 1,
        };
        return ret;
    });
}
// // console.log(900)
// getLastFileName_Index().then((data)=>{console.log(data.count)}).catch((er)=>{console.log(er)})
function prepareFileForAppending() {
    return __awaiter(this, void 0, void 0, function* () {
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
                                (0, promises_1.writeFile)(`${path}/error${Number(data.count) + 1}.csv`, "");
                            }
                            catch (error) {
                                //couldn't create file
                                return;
                            }
                        }
                    })
                        .catch((err) => {
                        //error in counting line
                        try {
                            (0, promises_1.writeFile)(`${path}/error${Number(data.count) + 1}.csv`, "");
                        }
                        catch (error) {
                            //couldn't create file
                            return;
                        }
                    });
                }
                else {
                    //create file
                    try {
                        (0, promises_1.writeFile)(`${path}/error${Number(data.count) + 1}.csv`, "");
                    }
                    catch (error) {
                        //couldn't create file
                        return;
                    }
                }
            })
                .catch((error) => {
                //error in getting the last name and index
                //record in firebase or send mail
                return;
            });
        }
        catch (err) {
            //everything failed or part failed
            return;
        }
    });
}
// prepareFileForAppending();
function logError(error) {
    return __awaiter(this, void 0, void 0, function* () {
        prepareFileForAppending();
        let results = false;
        console.log(readyFileName);
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
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
        yield csvWriter.writeRecords(Error)
            .then((success) => { console.log("success"); })
            .catch((err) => { console.log("error " + err); });
        return results;
    });
}
exports.logError = logError;
// prepareFileForAppending();
