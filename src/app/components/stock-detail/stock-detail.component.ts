import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';
import { LivestockService } from '../../services/livestock.service';
import { startWith } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';
import { WatchlistmanagerService } from '../../services/watchlistmanager.service';
import { HttpClient } from '@angular/common/http';
//pop up news window
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsWindowComponent } from '../news-window/news-window.component';
import { StockbuyComponent } from '../stockbuy/stockbuy.component';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})

export class StockDetailComponent implements AfterViewInit, OnInit {

  ticker: string;
  showSummary: boolean = false;
  yellowStar;
  refreshRate:number = 15000; //divide 1000 to
  showWarning = false;

  //stock info
  constructor(
    public http:HttpClient,
    private modalService: NgbModal, 
    private watchlistmanager:WatchlistmanagerService,
    private livestockService: LivestockService,
    private route: ActivatedRoute, public componentLayoutService:ComponentLayoutServiceService, 
    private dataService: DataServiceService, private spinnerService:SpinnerService) { 
    this.spinnerService.visible();
    this.componentLayoutService.makeInvisible(); //make search section disappear
    this.ticker = this.route.snapshot.params['ticker']; //set ticker
    this.dataService.getSummary(this.ticker).subscribe(
      data=> {
        if((data.ticker?data.ticker:"").length == 0) {
          this.showWarning = true;
          this.showSummary = false;
        }
      }
    )
    this.livestockService.liveStockServiceInit(this.ticker);
    this.yellowStar = this.watchlistmanager.yellowStar(this.ticker);
    console.log(this.yellowStar);
    this.watchlistmanager.getYellowStar().
      subscribe(starData =>this.yellowStar = starData
    )
  }

  toggleStar() {
    this.yellowStar = !this.yellowStar;
  }

  addTicker() {
    this.watchlistmanager.addTicker(this.ticker, this.livestockService.liveStockData.name);
  }

  deleteTicker() {
    this.watchlistmanager.deleteTicker(this.ticker);
  }


  ngOnInit() {
    
    // this.reFreshPrice();
  }

  ngAfterViewInit() {
    setTimeout(()=> {
      this.spinnerService.invisible();
      console.log("ngafter in stock detail " +this.livestockService.liveStockData.ticker);
      if(this.showWarning == false) {
        this.showSummary = true;
      }
    }, 1500);
    
    
  }

  showBuyDialog() {
    let component = StockbuyComponent;
    const modelRef = this.modalService.open(component, { ariaLabelledBy: 'modal-basic-title', size: 'md'});
    modelRef.componentInstance.ticker = this.ticker;
    modelRef.componentInstance.name = this.livestockService.liveStockData.name;
    modelRef.componentInstance.isBuy = true;
  }

  ngOnDestroy() {
    this.livestockService.destroyCleanup();
  }
}
