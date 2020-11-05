import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { startWith } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { newsItem } from '../../models/newsItem';
import { SpinnerService } from 'src/app/services/spinner.service';

//pop up news window
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsWindowComponent } from '../news-window/news-window.component';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() ticker: string;
  newsCollection:newsItem[] = []; 
  localTesting:string = "http://localhost:8080";

  constructor(
    public spinnerService:SpinnerService,
    private modalService: NgbModal,
    private http:HttpClient) { 
      this.spinnerService.visible();
  }

  ngOnInit(): void {
    this.getApiResponse(this.ticker).then(
      data=> {
        this.newsCollection = data;
      }
    )
  }

  getApiResponse(ticker:string) {
    return this.http.get<newsItem[]>(this.localTesting+'/api/news/'+ticker, {})
    .toPromise().then(res => {
        return res;
    })
  }

  showNewsDialog(news:newsItem) {
    let component = NewsWindowComponent;
    const modelRef = this.modalService.open(component, { ariaLabelledBy: 'modal-basic-title', size: 'md'});
    // console.log(news.author);
    modelRef.componentInstance.news = news;
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
  }


}
