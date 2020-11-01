import { Component, Input, OnInit } from '@angular/core';
import {LivestockService } from '../../services/livestock.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-stockbuy',
  templateUrl: './stockbuy.component.html',
  styleUrls: ['./stockbuy.component.css']
})
export class StockbuyComponent implements OnInit {
  @Input() public ticker:string;
  numShares:number= 0;
  price: number = 100;

  constructor(
    public activeModal: NgbActiveModal) {
   }

  ngOnInit(): void {
  }

}
