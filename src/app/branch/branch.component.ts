import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  gridFlex: string = '50%';

  constructor() { }

  ngOnInit(): void {
  }

  setGrid(cols: number) {
    if (cols === 1) this.gridFlex = '100%';
    else if (cols === 2) this.gridFlex = '50%';
    else if (cols === 4) this.gridFlex = '25%';
  }
}
