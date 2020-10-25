import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentLayoutServiceService {
  isVisible:boolean = true;
  ticker:string = null;

  constructor() { }

  setTicker( ticker: string) {
    this.ticker = ticker;
    this.isVisible = !(ticker == null || typeof ticker == 'undefined');
  }

  makeInvisible() {
    this.isVisible=false;
  }

  makeVisible() {
    this.isVisible=true;
  }

}
