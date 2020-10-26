import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title:string;
  constructor(private router: Router, public componentLayoutService: ComponentLayoutServiceService) { }

  ngOnInit(): void {
  }

  onSubmit() {    
    // const ticker = this.title;
    this.componentLayoutService.makeInvisible();
  }

}
