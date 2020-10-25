import { Component, OnInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(public componentLayoutService: ComponentLayoutServiceService) { 
    this.componentLayoutService.makeInvisible(); //make search section disappear
  }

  ngOnInit(): void {
    
  }

}
