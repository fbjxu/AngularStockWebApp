import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { newsItem } from "../../models/newsItem";

@Component({
  selector: 'app-news-window',
  templateUrl: './news-window.component.html',
  styleUrls: ['./news-window.component.css']
})
export class NewsWindowComponent implements OnInit {
  @Input() public news:newsItem;
  formatted_date:string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.formatted_date = this.getTime(new Date(Date.parse(this.news.publishedAt)));

  }

  public getTime(date_input: Date):string {
    let date = ("0" + date_input.getDate()).slice(-2);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // current month
    
    // current year
    let year = date_input.getFullYear();

    return months[date_input.getMonth()] + " " + date + ", " +year;
  }

}
