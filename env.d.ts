/// <reference types="vite/client" />
declare module 'qrcode';

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
      exportExcel: (data:Array<Array<string>>) => Promise<any>;
    }
  }

  interface DocumentEventTarget extends EventTarget {
    addEventListener(
      type: 'theme-change',
      listener: (event: ThemeChangeEvent) => void,
      options?: boolean | AddEventListenerOptions
    ): void;
  }
  
  interface ThemeChangeEvent extends Event {
    detail: {
      darkMode: boolean;
    };
  }
  
  