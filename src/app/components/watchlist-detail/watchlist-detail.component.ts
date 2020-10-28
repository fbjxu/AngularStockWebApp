import { Component, Input, OnInit } from '@angular/core';
import { LivestockService } from '../../services/livestock.service';


@Component({
  selector: 'app-watchlist-detail',
  templateUrl: './watchlist-detail.component.html',
  styleUrls: ['./watchlist-detail.component.css']
})
export class WatchlistDetailComponent implements OnInit {
  @Input() ticker:string;

  constructor(private livestock: LivestockService) { }

  ngOnInit(): void {
  }

}
