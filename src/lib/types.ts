export interface UserRequest{
    fingerprint: string,
    date: string, //server timestamp
    staff_id: string,
    verified:boolean
}

export interface User{
    email:string,
    status:"admin"|"normal"
}

export interface FirebaseUser{
    email:string,
    status:"admin"|"normal",
    staff_id: string
}

export interface userDetails{
    status:string,
    staff_id:string
}