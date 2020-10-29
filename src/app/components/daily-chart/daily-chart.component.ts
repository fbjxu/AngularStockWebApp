import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { startWith } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { LivestockService } from '../../services/livestock.service';
import { dailyPrice } from '../../models/dailyPrice';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
var HighchartsStock = require('highcharts/highstock'); 

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
  @Input() prevClose: string;
  price_series:any[];
  volume_series:any[];
  public options: any; 
  subscription: Subscription;
  stockUp:string = "green";

  constructor(
      private livestockService:LivestockService,
      private http: HttpClient) { 
      
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
            data: [],
            tooltip: {
                valueDecimals: 2
            },
            color: this.stockUp,
        }],
    }
  }

  ngOnInit(){
    const source = interval(15000);//15 s refresh
    this.subscription = source.pipe(startWith(0)).subscribe(val => this.getApiResponse(this.ticker).
    then(
        data => {
            const updated_normal_data = [];
            const updated_abnormal_data = [];
            var latest_data = data[data.length-1];
            if (latest_data.close>=parseFloat(this.prevClose)) {
                this.stockUp = "green";
            } 
            else{
                this.stockUp = "red";
            }
            data.forEach(dayData => {
                const temp_row = [
                    Date.parse(dayData.date),
                    dayData.close
                ];
                updated_normal_data.push(temp_row);
            });
            this.options.series[0]['data'] = updated_normal_data;
            this.options.series[0]['color'] = this.stockUp;
            HighchartsStock.stockChart('test', this.options);
            },
            error => {
            console.log('Something went wrong.');
            })
    );
    //   for (let dayData of dailyData) {
    //     var time = Date.parse(dayData.date);
    //     if(dayData.date!=null){
    //         this.price_series.push([time, dayData.close]);
    //     }
    //   }
      
  }

  getApiResponse(ticker:string) {
      return this.http.get<dailyPrice[]>('http://localhost:80/api/dailychartsummary/'+ticker, {})
      .toPromise().then(res => {
          return res;
      })
  }

}