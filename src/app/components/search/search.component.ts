import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';

import { autoCompleteEntry } from 'src/app/models/autoCompleteEntry';
//filter for autocomplete
import { FormControl } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import {debounceTime, tap} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //attributes
  title:string;
  objectPreOptions:autoCompleteEntry[];
  objectOptions:string[];
  showAutoLoading:boolean = false;
  filteredOptions: Observable<string[]>;

  //methods
  constructor(
    private dataService:DataServiceService,
    private router: Router, public componentLayoutService: ComponentLayoutServiceService) { 
  }

  ngOnInit(): void {
    const result =  this.myControl.valueChanges.pipe(
      tap(ev => this.showAutoLoading = true),
      debounceTime(500)).
    subscribe(value=>
      { 
        this.lookupAutoCompleteEntries(value);
      });
  }

  onSubmit() {    
    const ticker = this.title;
    this.componentLayoutService.makeInvisible();
    this.router.navigate(["details/",ticker])
  }

  lookupAutoCompleteEntries(input: string) {
    this.dataService.getAutoComplete(input).subscribe((data:autoCompleteEntry[])=> {
      this.objectPreOptions = data;
      this.objectOptions = this.objectPreOptions.map(entry=>entry.ticker+" | "+entry.name);
      this.showAutoLoading = false;
    });
  }
  
  displayFn(subject) {
    return subject? subject.ticker : undefined;
  }

  myControl = new FormControl();
}
