import { Component } from '@angular/core';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent {
categories:string[] = [ "tables","spoon","bible", "book", 
"tables","spoon","bible", "book", "tables","spoon","bible", "book", "tables","spoon","bible", "book",
"tables","spoon","bible", "book","tables","spoon","bible", "book"]; 
amountScrolled = 0;

scrollToRight() {
  var scrollableDiv = document.getElementById('b') as HTMLElement;
  let scrollPiece = 0.1 * (document.getElementById("b") as HTMLElement).scrollWidth;
  scrollableDiv.scrollLeft = this.amountScrolled + scrollPiece;
  this.amountScrolled += scrollPiece;
}
}
