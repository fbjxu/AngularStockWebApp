import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
import { LivestockService } from '../../services/livestock.service';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.css']
})


export class DailyChartComponent implements OnInit {
  @Input() ticker:string;
  price_series:any[];
  volume_series:any[];
  public options: any; 
  constructor(
      private livestockService:LivestockService,
      private http: HttpClient) { 
      //Data prep
      
  }

  ngOnInit(){
    var dailyData = this.livestockService.dailyChartRawData;
    console.log("output daily chart daily data"+JSON.stringify(dailyData));
      for (let dayData of dailyData) {
        var time = Date.parse(dayData.date);
        if(dayData.date!=null){
            this.price_series.push([time, dayData.close]);
        }
      }
      console.log("output price series" + JSON.stringify(this.price_series));

      //high chart graph
      this.options = {

        rangeSelector: {
            enabled: false
        },

        title: {
            text: 'Stock Price ',
        },

        series: [{
            name: 'AAPL',
            data: this.price_series,
            tooltip: {
                valueDecimals: 2
            },
            color: 'red',
        }],
    }
    Highcharts.chart('test', this.options);
  }

}