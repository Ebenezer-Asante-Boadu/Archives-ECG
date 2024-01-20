

export function close() {
    window.verify.close();
}

export function closeMain() {
    window.main.close();
}

export function minimize() {
    window.main.minimize();
}

export function maximizeRestore(){
    window.main.maximizeRestore();
}

export async function getFingerprint() {
    return await window.verify.fingerprint();
}

export async function getMainVerification() {
    if (window.main) {
        const res = await window.main.getVerification();
        return res;
    }
}

export async function getVerifyVerification() {
    if (window.verify) {
        const res = await window.verify.getVerification();
        return res;
    }
}

export async function verifyApp({fingerprint, date, staff_id}: {fingerprint:string, date:string, staff_id:string}){
    const res = await window.verify.verifyApp({fingerprint, date, staff_id});
    return res;
}

export async function getUserDetails(){
    try{
        const res = await window.main.getUserDetails();

        if(!res){
            return null;
        }
        return res;
    }catch(err){
        return null;
    }
}

export function resetDefault(){
    try{
        window.main.resetDefault();
        return true;
    }catch(err){
        return err;
    }
}

export function setAuthenticated(state:boolean){
    try{
        window.main.setAuthenticated(state);
        return true;
    }catch(err){
        return err;
    }
}

export async function getAuthenticated() {
    try{
        const res = await window.main.getAuthenticated();
        alert(`from utils library ${res}`)
        return res;
    }catch(err){
        return err;
    }
}
// store work files in the cloud
//upload excel sheet to add to existing data or start new data
//request for files
//workspace area for editing files
//help reach
//settings
//notification tab
// announcements window
// who edited my file

//admin
// request reverification of an account
// block an account
//see users
// check each users activities, like last seen,
// receive user help messages
// see all files been worked on
// edit files
// send announcements