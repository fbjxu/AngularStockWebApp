import { Component, Input, OnInit } from '@angular/core';
import {LivestockService } from '../../services/livestock.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfoliomanagerService } from '../../services/portfoliomanager.service';
import { HttpClient } from '@angular/common/http';
import { map, startWith} from 'rxjs/operators';
import { Observable, interval, Subscription, BehaviorSubject, Subject } from 'rxjs';
import { tickerPrice } from "../../models/tickerPrice";



@Component({
  selector: 'app-stockbuy',
  templateUrl: './stockbuy.component.html',
  styleUrls: ['./stockbuy.component.css']
})
export class StockbuyComponent implements OnInit {
  @Input() public ticker:string;
  @Input() public name: string;
  @Input() public isBuy: boolean = true;
  @Input() public maxNumShares: number;
  subscription:Subscription;
  numShares:number= 0;
  @Input() public price: number;
  

  constructor(
    public http: HttpClient,
    public activeModal: NgbActiveModal,
    public portfolioManager: PortfoliomanagerService) {
      const source = interval(15000);//refresh price every 15 mins
      this.subscription = source.subscribe(val=> 
        {
          this.http.get<tickerPrice[]>('http://localhost:80/api/pricesummary/'+this.ticker).pipe(
          map(res => {
            let result: tickerPrice[];
            result =res;
            return result;
          })).subscribe(data => {
            var price = data[0];
            console.log("stock buy price ready ", price);
            this.price = Math.round(price.last * 100) / 100;
          })
        }
      );
   }

  ngOnInit(): void {
    console.log("max num shares is", this.maxNumShares);
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  buyStock(ticker:string, name:string, numShares: number, price: number) {
    this.portfolioManager.buyStock(ticker,name, price*numShares, numShares, price);
  }

  sellStock(ticker:string, numShares:number) {
    this.portfolioManager.sellStock(ticker, numShares);
  }

}
