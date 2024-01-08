/// <reference types="vite/client" />
interface Window {
    verify: {
      // Define your API methods and properties here
      close: () => void;
      fingerprint: () => Promise<string | null>;
      verified: ()=> void;
      setVerification: (state:boolean) => void;
      getVerification:  () => Promise<boolean>;
    };

    main: {
      getVerification: () => Promise<boolean>;
      close: () => void;
      minimize: ()=> void;
    }
  }


  