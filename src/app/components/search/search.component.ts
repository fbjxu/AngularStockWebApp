import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//services
import { ComponentLayoutServiceService } from 'src/app/services/component-layout-service.service';
import { DataServiceService } from 'src/app/services/data-service.service';

import { autoCompleteEntry } from 'src/app/models/autoCompleteEntry';
//filter for autocomplete
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  showAutoLoading:boolean = true;
  filteredOptions: Observable<string[]>;

  //methods
  constructor(
    private dataService:DataServiceService,
    private router: Router, public componentLayoutService: ComponentLayoutServiceService) { 
      this.dataService.getAutoComplete("apple").subscribe((data:autoCompleteEntry[])=> {
        this.objectPreOptions = data;
        this.objectOptions = this.objectPreOptions.map(entry=>entry.ticker+" | "+entry.name);
      });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  onSubmit() {    
    const ticker = this.title;
    this.componentLayoutService.makeInvisible();
    this.router.navigate(["details/",ticker])
  }

  displayFn(subject) {
    return subject? subject.ticker : undefined;
  }

  myControl = new FormControl();

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.objectOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
}
