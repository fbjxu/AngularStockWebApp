import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { SpinnerService } from '../../services/spinner.service';
import { DataServiceService } from '../../services/data-service.service';
import { PortfoliomanagerService } from '../../services/portfoliomanager.service';
import { portfolioEntry } from '../../models/portfolioEntry';
import { portfolioDisplayItem } from '../../models/portfolioDisplayItem';
import { Observable, interval, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  showPortfolioList:boolean = false;
  myPortfolio: portfolioEntry[] =[];
  myPortfolioTickers: string[] = [];
  myPortfolioDisplay =[];
  tickerNameMap = new Map();
  subscription: Subscription;
  constructor(
    public dataService: DataServiceService,
    public portfolioManager: PortfoliomanagerService,
    public spinnerService: SpinnerService,
    public componentLayoutService: ComponentLayoutServiceService) { 
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible(); //make search section disappear

    //check price every 15s
    const source = interval(15000);//set interval to 15s
    this.subscription = source.pipe(startWith(0)).subscribe(val => {
      console.log("called portfolio 15s subscription")
      let ticker_query = this.portfolioManager.getPortfolioTickerList().join(",");
      this.dataService.getPrice(ticker_query).subscribe(data => {
        var newPortfolioDisplay =[];
        var portfolioList = this.portfolioManager.getPortfolioList();
        for (let stock of data) {
          for (let portfolioStock of portfolioList) {
            if(stock.ticker.toLowerCase() == portfolioStock.ticker.toLowerCase()) {
              var ticker = stock.ticker.toUpperCase();
              var name = portfolioStock.name;
              var currPrice = stock.last.toFixed(2);
              var change = (stock.last - stock.prevClose).toFixed(2);
              var changePercent = "%" + (((stock.last - stock.prevClose)/stock.prevClose)*100).toFixed(2);
              var numShares = portfolioStock.numShares.toFixed(0);
              var avgPrice = portfolioStock.avgPrice.toFixed(2);
              var totalCost = portfolioStock.cost.toFixed(2);
              var marketVal = (stock.last * portfolioStock.numShares).toFixed(2);
              var portfolioDisplayNewItem: portfolioDisplayItem = new portfolioDisplayItem(ticker,
                name, currPrice, change, changePercent, numShares, avgPrice, totalCost,marketVal);
                newPortfolioDisplay.push(portfolioDisplayNewItem);
            }
          }
          this.myPortfolioDisplay = newPortfolioDisplay;
          console.log("inside my portfolio display", JSON.stringify(this.myPortfolioDisplay))
        }
      })
    })
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
    this.showPortfolioList = true;
    console.log(this.showPortfolioList);
  }

  ngOnDestroy():void {

  }

  onClick(ticker:string) {
    
  }

}
