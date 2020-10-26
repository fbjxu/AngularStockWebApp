import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';
import { MainComponent } from './components/main/main.component';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: "", component: MainComponent},
  { path: "portfolio", component: PortfolioComponent},
  { path: "watchlist", component: WatchlistComponent },
  {
    path: 'details', children: [
      { path: ":ticker", component: StockDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
