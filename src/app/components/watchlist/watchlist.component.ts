import { Component, OnInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { WatchlistmanagerService } from '../../services/watchlistmanager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  currentList: string[];
  currentObserve: Observable<string[]>;
  
  constructor(
    private watchlistmanager:WatchlistmanagerService,
    public componentLayoutService:ComponentLayoutServiceService) { 
    this.componentLayoutService.makeInvisible();
  }

  ngOnInit(): void {
    this.currentList = this.watchlistmanager._watchlist;
  }

}
