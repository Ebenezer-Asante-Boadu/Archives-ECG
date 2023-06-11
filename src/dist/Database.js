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
Object.defineProperty(exports, "__esModule", { value: true });
exports._Database = void 0;
const sql = __importStar(require("sqlite3"));
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
        const instance = new sql.Database(name, (feed) => {
            if (feed != null) {
                return;
            }
        });
        let query = `DROP DATABASE IF EXISTS ${name}`;
        instance.run(query);
    }
    static createTable(options) {
        const instance = new sql.Database(options.database_name);
    }
}
exports._Database = _Database;
