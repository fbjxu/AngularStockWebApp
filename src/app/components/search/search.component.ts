import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';

import { autoCompleteEntry } from 'src/app/models/autoCompleteEntry';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  title:string;
  // objectOptions =[
  //   { name: "Angular"},
  //   { name: "React"}
  // ]
  objectOptions:autoCompleteEntry[];
  showAutoLoading:boolean = true;
  constructor(
    private dataService:DataServiceService,
    private router: Router, public componentLayoutService: ComponentLayoutServiceService) { 
      this.dataService.getAutoComplete(this.title).subscribe((data:autoCompleteEntry[])=> {
        this.objectOptions = data;
      })
  }

  ngOnInit(): void {
  }

  onSubmit() {    
    const ticker = this.title;
    this.componentLayoutService.makeInvisible();
    this.router.navigate(["details/",ticker])
  }

  displayFn(subject) {
    return subject? subject.name : undefined;
  }

}
