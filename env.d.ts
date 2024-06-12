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
      showNotification: (message:string, email:string) => void;
      openFileDialog: ()=> Promise<{ filePath: string; base64Data: string } | null>;
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
  
  
//   
// .toolbar{
//     width: 100%;
//     background-color: rgb(22, 22, 22);
// }
// .bottom-bar{
//     width: 100%;
//     background-color: rgb(15, 15, 15);
//     box-shadow: 
//         0 3px 6px rgba(0, 0, 0, 0.1),
//         0 3px 6px rgba(0, 0, 0, 0.1),
//         0 10px 20px rgba(0, 0, 0, 0.2),
//         0 20px 40px rgba(0, 0, 0, 0.3);
// }

// .middle{
//     display: flex;
//     overflow: hidden;
// }
// .kl{
//     width: 4%;
//     background-color: black;
//     color: white;
//     position: sticky;
//     left: 0;
// }

// .high-index{
//     z-index: 5;
// }
// .scrollable{
//     width: 100%;
//     overflow: auto;
// }
// .scrollable::-webkit-scrollbar {
//     display: block!important;
//     padding: 10px;
//   }

  
// .scrollable::-webkit-scrollbar-track {
//     background-color: black;
//     padding: 10px;
//     box-shadow: 
//         0 3px 6px rgba(0, 0, 0, 0.1),
//         0 3px 6px rgba(0, 0, 0, 0.1),
//         0 10px 20px rgba(0, 0, 0, 0.2),
//         0 20px 40px rgba(0, 0, 0, 0.3);
//   }

//   .scrollable::-webkit-scrollbar-thumb {
//     background-color: rgba(255, 255, 255, 0.671); 
//     border-radius: 10px; 
//   } 
// table {
//     font-family: arial, sans-serif;
//     border-collapse: collapse;
//     width: 100%;
//     position: relative;
//   }
  
//   tr.head{
//     position: sticky;
//     top: 0;
//     background-color: black;
//     color: white;
//   }
//   td.borders{
//     border: 1px solid white;
//     border-left: none;
//     font-size: 13px;
//     color: rgb(207, 207, 207);
//   }
  
//   td, th, .kl p {
//     border: 1px solid black;
//     text-align: center;
//     padding: 3px;
//   }
//   th{
//     border: 1px solid white;
//     cursor: col-resize;
//     resize: horizontal;
//     font-size: 13px;
//     color: rgb(207, 207, 207);
//   }



//   .editput:focus{
//     border: 1px solid blue;
//   }

  