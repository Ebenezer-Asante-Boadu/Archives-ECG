export interface UserRequest{
    fingerprint: string,
    date: string, //server timestamp
    staff_id: string,
    verified:boolean,
    status: string
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