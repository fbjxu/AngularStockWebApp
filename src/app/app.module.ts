import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component'
import { MainComponent } from './components/main/main.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


//material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import { DailyChartComponent } from './components/daily-chart/daily-chart.component';
import { NewsComponent } from './components/news/news.component';
import { NewsWindowComponent } from './components/news-window/news-window.component';
import { StockbuyComponent } from './components/stockbuy/stockbuy.component';
import { HistoryChartComponent } from './components/history-chart/history-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    PortfolioComponent,
    WatchlistComponent,
    MainComponent,
    StockDetailComponent,
    DailyChartComponent,
    NewsComponent,
    NewsWindowComponent,
    StockbuyComponent,
    HistoryChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatTabsModule,
    NgbModule,
  ],
  entryComponents: [
    NewsWindowComponent, 
    StockbuyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
