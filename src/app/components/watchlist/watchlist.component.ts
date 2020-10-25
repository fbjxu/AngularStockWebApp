import { Component, OnInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  constructor(public componentLayoutService:ComponentLayoutServiceService) { 
    this.componentLayoutService.makeInvisible();
  }

  ngOnInit(): void {

  }

}
