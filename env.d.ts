/// <reference types="vite/client" />

interface Window {
    verify: {
      // Define your API methods and properties here
      close: () => void;
      fingerprint: () => Promise<string | null>;
      getVerification:  () => Promise<boolean>;
      verifyApp: ({fingerprint, date, staff_id}: {fingerprint:string, date:string, staff_id:string}) => 
      Promise<{ success: boolean, message: number }>;
    };

    main: {
      getVerification: () => Promise<boolean>;
      close: () => void;
      minimize: ()=> void;
      maximizeRestore: ()=>void;
      getUserDetails: ()=> Promise<{status:string, staff_id:string}|null>;
      resetDefault: ()=> void;
      setAuthenticated: (state:boolean)=>void;
      getAuthenticated: ()=>Promise<boolean>;
    }
  }


  