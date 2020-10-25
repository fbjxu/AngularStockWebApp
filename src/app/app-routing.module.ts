import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { PortfolioComponent } from './components/portfolio/portfolio.component';
// import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'details', children: [
      { path: ":ticker", component: StockDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
