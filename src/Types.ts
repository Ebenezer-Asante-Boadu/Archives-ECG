interface newTable {
    database_name : string,
    columns : string[],
    types : string[],
    ["size of type"]? : string[],
}

interface newError {
    id : number,
    file : string,
    line : string,
    message : string,
    error_code : string
}

export {newTable, newError}