"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports._Database = void 0;
const sql = __importStar(require("sqlite3"));
const promises_1 = require("node:fs/promises");
class _Database {
    constructor() { }
    static createDatabase(database_name) {
        let result = true;
        let dt = new sql.Database(`src/dist/SQLITE_DATABASES/${database_name}.db`, (feed) => {
            if (feed != null) {
                result = false;
                return;
            }
        });
        dt.close((feed) => { });
        return result;
    }
    static deleteDatabase(name) {
        return __awaiter(this, void 0, void 0, function* () {
            let results = false;
            try {
                yield (0, promises_1.unlink)(`src/dist/SQLITE_DATABASES/${name}.db`);
                results = true; //console.log("worked");
            }
            catch (err) {
                results = false; //console.log("error");
            }
            return results;
        });
    }
    static createTable(options) {
        let result = true;
        let query_half = "";
        let instance = new sql.Database(`src/dist/SQLITE_DATABASES/${options.database_name}.db`, (feed) => {
            if (feed != null) {
                result = false;
                return;
            }
        });
        options.columns.forEach((data, index) => {
            query_half += (`${data} ${options.types[index]} NOT NULL`);
            query_half += (index == options.columns.length - 1) ? " " : ", ";
        });
        instance.serialize(() => {
            instance.run(`CREATE TABLE ${options.tableName} ( ${query_half} );`, (err) => {
                if (err) {
                    console.log("sorry");
                    result = false;
                }
                else {
                    console.log("success");
                    result = true;
                }
            });
        });
        return result;
    }
    static deleteTable(database_name, table_name) {
        let result = true;
        let instance = new sql.Database(`src/dist/SQLITE_DATABASES/${database_name}.db`, (feed) => {
            if (feed != null) {
                result = false;
                return;
            }
        });
        instance.serialize(() => {
            instance.run(`DROP TABLE ${table_name}`, (err) => {
                if (err) {
                    result = false;
                    console.log("error");
                }
                else {
                    result = true;
                    console.log("worked");
                }
            });
        });
    }
    static createColumn(options) {
        let result = true;
        let instance = new sql.Database(`src/dist/SQLITE_DATABASES/${options.database_name}.db`, (feed) => {
            if (feed != null) {
                result = false;
                return;
            }
        });
        instance.serialize(() => {
            instance.run(`ALTER TABLE ${options.tableName} ADD ${options.column} ${options.type};`, (err) => {
                if (err) {
                    result = false;
                    console.log("couldn't create column");
                }
                else {
                    result = true;
                    console.log("created column");
                }
            });
        });
        return result;
    }
    static deleteColumn(options) {
        let result = true;
        let instance = new sql.Database(`src/dist/SQLITE_DATABASES/${options.database_name}.db`, (feed) => {
            if (feed != null) {
                result = false;
                return;
            }
        });
        instance.serialize(() => {
            instance.run(`ALTER TABLE ${options.tableName} DROP COLUMN ${options.column};`, (err) => {
                if (err) {
                    result = false;
                    console.log("couldn't delete column");
                }
                else {
                    result = true;
                    console.log("deleted column");
                }
            });
        });
        return result;
    }
}
exports._Database = _Database;
