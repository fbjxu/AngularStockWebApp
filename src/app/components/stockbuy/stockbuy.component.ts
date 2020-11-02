import { Component, Input, OnInit } from '@angular/core';
import {LivestockService } from '../../services/livestock.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PortfoliomanagerService } from '../../services/portfoliomanager.service';

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
  numShares:number= 0;
  price: number = 100;
  

  constructor(
    public activeModal: NgbActiveModal,
    public portfolioManager: PortfoliomanagerService) {
   }

  ngOnInit(): void {
    console.log("max num shares is", this.maxNumShares);
  }

  buyStock(ticker:string, name:string, numShares: number, price: number) {
    this.portfolioManager.buyStock(ticker,name, price*numShares, numShares, price);
  }

  sellStock(ticker:string, numShares:number) {
    this.portfolioManager.sellStock(ticker, numShares);
  }

}
