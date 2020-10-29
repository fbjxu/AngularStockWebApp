import { companySummary } from './companySummary';

export class liveStockInfo {
    
  //summary
  ticker:string;
  name:string;
  exchangeCode:string;
  description:string;
  startDate:string;

  //price
  high:number;
  mid: number;
  low: number;
  askPrice: number;
  open: number;
  askSize: number
  prevClose: number;
  bidPrice: number;
  volume: bigint;
  bidSize:number
  last:number;
  
  //live stock price
  openPrice: number; //open price for the ticker
  lastPrice: number;
  livePrice: string;
  liveDiff: string;
  liveDiffPercent: string;
  livePriceUp:boolean = true;
  liveTime: string;
  requestTime:string;

}