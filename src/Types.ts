interface newTable {
    database_name: string,
    tableName: string,
    columns: string[],
    types: string[],
}

interface newObject {
    [key: string]: any;
}

interface newError {
    id: number,
    file: string,
    line: string,
    message: string,
    error_code: string
}

interface newColumn {
    database_name: string,
    tableName: string,
    column: string,
    type: string
}


interface deleteColumn {
    database_name: string,
    tableName: string,
    column: string
}

interface addFirebaseData {
    collection: string,
    sub_directory: string,
    data: Object
}

interface deleteFirebaseDocument {
    collection: string,
    sub_directory: string
}

interface deleteFirebaseFields {
    collection: string,
    sub_directory: string,
    fields: Array<string>
}

interface updateFirebaseFields {
    collection: string,
    sub_directory: string,
    data: object
}

interface uploadFirebaseFile {
    bucketName: string,
    path_to_the_file_to_upload: string,
    new_filename: string,
}

interface renameFirebaseFile {
    bucketName: string,
    oldname :string,
    newname :string
}

interface deleteFirebaseFile{
    bucketName: string,
    file : string,
}

export type { 
    deleteFirebaseFile,
    renameFirebaseFile,
    newTable, 
    newError, 
    newColumn, 
    deleteColumn, 
    addFirebaseData, 
    deleteFirebaseDocument, 
    deleteFirebaseFields, 
    updateFirebaseFields, 
    newObject, 
    uploadFirebaseFile 
}

