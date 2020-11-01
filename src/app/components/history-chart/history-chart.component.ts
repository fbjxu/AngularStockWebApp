import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { startWith } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { LivestockService } from '../../services/livestock.service';
import { dailyPrice } from '../../models/dailyPrice';


@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css']
})
export class HistoryChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
