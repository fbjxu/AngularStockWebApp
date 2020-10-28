import { Component, OnInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { WatchlistmanagerService } from '../../services/watchlistmanager.service';
import { Subscription } from 'rxjs';
import { watchListStock } from '../../models/watchListStock';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  

  constructor(
    public watchlistmanager:WatchlistmanagerService,
    public componentLayoutService:ComponentLayoutServiceService) { 
    this.componentLayoutService.makeInvisible();
  }

  ngOnInit(): void {
  }

}
