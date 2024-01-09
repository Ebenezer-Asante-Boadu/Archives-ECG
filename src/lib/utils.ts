

export function close(){
    window.verify.close();
}

export function closeMain(){
    window.main.close();
}

export function minimize(){
    window.main.minimize();
}

export async function getFingerprint(){
   return await window.verify.fingerprint();
}

export function startApp(){
    window.verify.verified();
}

export function setVerification(state:boolean){
    window.verify.setVerification(state);
}

export function getVerification(){
    if(window.main){
        console.log(window.main.getVerification())
        return window.main.getVerification();
    }else{
        console.log(window.verify.getVerification())
        return window.verify.getVerification();
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