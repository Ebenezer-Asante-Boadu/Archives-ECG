interface newTable {
    database_name : string,
    tableName : string,
    columns : string[],
    types : string[],
}

interface newObject {
    [key: string]: any;
  }

interface newError {
    id : number,
    file : string,
    line : string,
    message : string,
    error_code : string
}

interface newColumn{
    database_name : string,
    tableName : string,
    column : string,
    type : string
}


interface deleteColumn{
    database_name : string,
    tableName : string,
    column : string
}



export {newTable, newError, newColumn, deleteColumn,  newObject}