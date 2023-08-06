import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeComponent } from './trade/trade.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HomeComponent } from './home/home.component';
import { PoolsComponent } from './pools/pools.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'trade', component: TradeComponent},
  {path:'pools', component: PoolsComponent},
  {path:'aboutus', component: AboutusComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
