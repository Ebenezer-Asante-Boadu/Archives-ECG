import * as sql from 'sqlite3';
import type { newTable } from './Types';

export class _Database{
    constructor(){}

    static createDatabase(database_name : string){
      let result:boolean = true;
      let dt = new sql.Database(`src/dist/SQLITE_DATABASES/${database_name}.db`,  (feed)=>{
        if(feed != null){
          result =false;
          return;
        }
      });
      dt.close((feed)=>{})
      return result;
    }

    static deleteDatabase(name:string){
      const instance = new sql.Database(name, (feed)=>{
        if(feed != null){
          return;
        }
      });
      let query = `DROP DATABASE IF EXISTS ${name}`;
      instance.run(query,)
    }

    static createTable(options:newTable){
      const instance = new sql.Database(options.database_name)
    }
} 