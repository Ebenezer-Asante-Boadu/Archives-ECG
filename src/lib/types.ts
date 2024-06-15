export interface UserRequest{
    fingerprint: string,
    date: string, //server timestamp
    staff_id: string,
    verified:boolean
}

// export interface User{
//     email:string,
//     status:"admin"|"normal"
// }

export interface FirebaseUser{
    email:string,
    status:"admin"|"normal",
    staff_id: string
}

export interface userDetails{
    status:string,
    staff_id:string
}

export interface TableColumn{
    key: string,
    sortable: Boolean
}

export interface TableData {
    id: number;
    [key: string|symbol]: number | string;
}

export enum Gender {
    Male = "MALE",
    Female = "FEMALE"
  };
  
  export enum Status {
    Admin = "ADMIN",
    Normal = "NORMAL"
  }
  
 export  interface User {
    staff_id: string;
    email: string;
    name: string;
    gender: Gender,
    status: Status,
    uid: string;
    profile: string |null;
  }

  export interface SearchedUser{
    staff_id: string;
    email: string;
    name: string;
    gender: Gender,
    status: Status,
    uid: string;
    profile: string |null;
    lastMessage: string|null;
    lastMessageTime: string|null;
    unreadMessages: number|null;
  }