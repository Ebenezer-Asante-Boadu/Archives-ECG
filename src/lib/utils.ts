

export function close(){
    window.verify.close();
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