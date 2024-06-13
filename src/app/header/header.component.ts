import { Component, OnInit } from '@angular/core';
declare function Myapp():void;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Myapp() {
    Myapp();
  }
  constructor() {
    Myapp();
   }

  ngOnInit(): void {
    Myapp();
  }

}
