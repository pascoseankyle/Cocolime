import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { StocksComponent } from './stocks/stocks.component';
import { SupplyComponent } from './supply/supply.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ItemHistoryComponent } from './components/item-history/item-history.component';
import { IndexComponent } from './index/index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CRMmainComponent } from './CRM/main/main.component';
import { DiningComponent } from './CRM/dining/dining.component';
import { ReservationsComponent } from './CRM/reservations/reservations.component';
import { POSComponent } from './POS/pos/pos.component';

import { OrderComponent } from './POS/index/order/order.component';


import { ReceiptComponent } from './POS/receipt/receipt.component';
import { MarketingComponent } from './marketing/marketing.component';

//DTR PMS

import { IndeComponent } from './DTR/inde/inde.component';
import { EmployeepageComponent } from './DTR/inde/pages/employeepage/employeepage.component';
import { TimekeepingpageComponent } from './DTR/inde/pages/timekeepingpage/timekeepingpage.component';
import { AttendancepageComponent } from './DTR/inde/pages/attendancepage/attendancepage.component';
import { TimeinComponent } from './DTR/timein/timein.component';

import { IndComponent } from './PMS/ind/ind.component';
import { AdditionpageComponent } from './PMS/ind/pages/additionpage/additionpage.component';
import { DeductionpageComponent } from './PMS/ind/pages/deductionpage/deductionpage.component';
import { WagespageComponent } from './PMS/ind/pages/wagespage/wagespage.component';


const routes: Routes = [  
  

  //DTR ROUTES
  {
    path: 'DTR', component: IndeComponent, children:
      [
        { path: '', component: EmployeepageComponent },
      ]
  },
  {
    path: 'timein', component: TimeinComponent
  },
  {
    path: 'attendance', component: IndeComponent,
    children: [
      { path: '', component: AttendancepageComponent }
    ]
  },
  {
    path: 'employee', component: IndeComponent,
    children: [
      { path: '', component: EmployeepageComponent }
    ]
  },
  {
    path: 'timekeeping', component: IndeComponent, children:
      [
        { path: '', component: TimekeepingpageComponent },
      ]
  },

  //PMS ROUTES
  {
    path: 'PMS', component: IndComponent, children:
      [
        { path: '', component: EmployeepageComponent },
      ]
  },
  {
    path: 'pms-attendance', component: IndComponent,
    children: [
      { path: '', component: AttendancepageComponent }
    ]
  },
  {
    path: 'pms-employee', component: IndComponent,
    children: [
      { path: '', component: EmployeepageComponent }
    ]
  },
  {
    path: 'pms-timekeeping', component: IndComponent,
    children: [
        { path: '', component: TimekeepingpageComponent },
      ]
  },
  {
    path: 'pms-addition', component: IndComponent,
    children: [
      { path: '', component: AdditionpageComponent },
    ]
  },
  {
    path: 'pms-deduction', component: IndComponent,
    children: [
      { path: '', component: DeductionpageComponent },
    ]
  },
  {
    path: 'pms-wages', component: IndComponent,
    children: [
      { path: '', component: WagespageComponent },
    ]
  },






  {
    path: 'main', 
    component: MainComponent,
  },
  {
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'orders', 
    component: OrdersComponent,
  },
  {
    path: 'stocks', 
    component: StocksComponent,
  },
  {
    path: 'supply', 
    component: SupplyComponent,
  },
  {
    path: 'itemHistory',
    component: ItemHistoryComponent,
  }
  ,
  {
    path: 'menu',
    component: IndexComponent,
  }
  ,
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'crm',
    component: CRMmainComponent,
  }
  ,
  {
    path: 'dining',
    component: DiningComponent,
  },
  {
    path: 'reservations',
    component: ReservationsComponent,
  },

  {
    path: 'pos',
    component: POSComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'marketing',
    component: MarketingComponent
  },
  {
    path: 'receipt/:code/:cash/:table',
    component: ReceiptComponent
  }

  ,{ 
    path: '',   
    redirectTo: 'login', 
    pathMatch: 'full' 
  }

];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
