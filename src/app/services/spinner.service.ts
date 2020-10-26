import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public isSpinning$ = new BehaviorSubject(true);
  constructor() { }

  public visible(): void {
    this.isSpinning$.next(true);
    console.log('Im inside visible()');
  }

  public invisible(): void {
    this.isSpinning$.next(false);
    console.log('Im inside invisible()');
  }

  public getIsOpen(): Observable<boolean>{
    console.log('Im inside getIsOpen');
    return this.isSpinning$;
  }

  public getIsClose(): Observable<boolean>{
    console.log('Im inside getIsClose');
    return this.isSpinning$;
  }
}

