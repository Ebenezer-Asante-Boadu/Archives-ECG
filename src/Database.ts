import * as sql from 'sqlite3';
import type { deleteColumn, newColumn, newTable } from './Types';
import {unlink} from 'node:fs/promises'

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


    static async deleteDatabase(name:string){
      let results:boolean = false;

      try{
        await unlink(`src/dist/SQLITE_DATABASES/${name}.db`);
        results = true; //console.log("worked");
      }
      catch(err){
        results = false; //console.log("error");
      }

      return results;
    }


    static createTable(options:newTable){
      let result:boolean = true;
      let query_half = "";
      let instance = new sql.Database(`src/dist/SQLITE_DATABASES/${options.database_name}.db`,  (feed)=>{
        if(feed != null){
          result =false;
          return;
        }
      });

      options.columns.forEach((data, index)=>{
        query_half += (`${data} ${options.types[index]} NOT NULL`);
        query_half += (index == options.columns.length - 1) ? " " : ", ";
      });

      instance.serialize(()=>{
        instance.run(`CREATE TABLE ${options.tableName} ( ${query_half} );`, (err)=>{
          if(err){
            console.log("sorry");
            result = false;
          } else{
            console.log("success");
            result = true;
          }
        });
      });
      return result;
    }



    static deleteTable(database_name:string, table_name:string){
      let result:boolean = true;
      let instance = new sql.Database(`src/dist/SQLITE_DATABASES/${database_name}.db`,  (feed)=>{
        if(feed != null){
          result =false;
          return;
        }
      });

      instance.serialize(()=>{
        instance.run(`DROP TABLE ${table_name}`, (err)=>{
          if(err){
            result =false;
            console.log("error");
          } else{
            result = true;
            console.log("worked");
          }
        });
      });
    }




    static createColumn(options:newColumn){
      let result:boolean = true;
      let instance = new sql.Database(`src/dist/SQLITE_DATABASES/${options.database_name}.db`,  (feed)=>{
        if(feed != null){
          result =false;
          return;
        }
      });

      instance.serialize(()=>{
        instance.run(`ALTER TABLE ${options.tableName} ADD ${options.column} ${options.type};`, (err)=>{
          if(err){
            result = false;
            console.log("couldn't create column");
          } else{
            result = true;
            console.log("created column")
          }
        });
      });
      return result;
    }




    static deleteColumn(options:deleteColumn){
      let result:boolean = true;
      let instance = new sql.Database(`src/dist/SQLITE_DATABASES/${options.database_name}.db`,  (feed)=>{
        if(feed != null){
          result =false;
          return;
        }
      });

      instance.serialize(()=>{
        instance.run(`ALTER TABLE ${options.tableName} DROP COLUMN ${options.column};`, (err)=>{
          if(err){
            result = false;
            console.log("couldn't delete column");
          } else{
            result = true;
            console.log("deleted column")
          }
        });
      });
      return result;
    }

    

} 