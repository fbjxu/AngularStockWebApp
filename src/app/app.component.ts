import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
export class AppComponent{
  showLoadingIndicator:boolean = true;
  title = 'stock-web-app';
  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.getIsOpen().subscribe(data => this.showLoadingIndicator = data)
  }

  ngAfterViewInit() {
    this.spinnerService.invisible();
  }
}


