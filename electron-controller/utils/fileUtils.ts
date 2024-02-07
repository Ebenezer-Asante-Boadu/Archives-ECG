// const ExcelJS = require('exceljs');



// export function generateSpreadsheet(){
//     // Create a new workbook
// const workbook = new ExcelJS.Workbook();

// // Add a worksheet
// const worksheet = workbook.addWorksheet('My Sheet');

// // Add data to the worksheet
// worksheet.addRow(['Name', 'Age']);
// worksheet.addRow(['John', 30]);
// worksheet.addRow(['Jane', 25]);

// // Save the workbook
// workbook.xlsx.writeFile('mySheet.xlsx')
//   .then(function () {
//     console.log('Workbook created successfully');
//   })
//   .catch(function (error:any) {
//     console.log('Error creating workbook:', error);
//   });

// }

import * as path from 'path';
import { app, dialog } from 'electron';
const ExcelJS = require('exceljs');




// Save the workbook to user's downloads directory
export async function saveWorkbook() {
    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
  
    // Add a worksheet
    const worksheet = workbook.addWorksheet('My Sheet');
  
    // Add data to the worksheet
    worksheet.addRow(['Name', 'Age']);
    worksheet.addRow(['John', 30]);
    worksheet.addRow(['Jane', 25]);
  
    try {
      const savePath = await dialog.showSaveDialog({
        defaultPath: path.join(app.getPath('downloads'), 'mySheet.xlsx'),
        filters: [{ name: 'Excel Files', extensions: ['xlsx'] }]
      });
  
      if (!savePath.canceled && savePath.filePath) {
        await workbook.xlsx.writeFile(savePath.filePath);
        console.log('Workbook created successfully at:', savePath.filePath);
      } else {
        console.log('File save dialog was canceled.');
      }
    } catch (error) {
      console.error('Error creating workbook:', error);
    }
  }


