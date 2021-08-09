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

import { IndeComponent } from './DTR/inde/inde.component';
import { DashboardpageComponent } from './DTR/inde/pages/dashboardpage/dashboardpage.component';
import { EmployeepageComponent } from './DTR/inde/pages/employeepage/employeepage.component';
import { TimekeepingpageComponent } from './DTR/inde/pages/timekeepingpage/timekeepingpage.component';
import { AttendancepageComponent } from './DTR/inde/pages/attendancepage/attendancepage.component';
import { DailytimerecordpageComponent } from './DTR/inde/pages/dailytimerecordpage/dailytimerecordpage.component';
import { TimeinComponent } from './DTR/timein/timein.component';
import { AdditionpageComponent } from './DTR/inde/pages/additionpage/additionpage.component';
import { WagespageComponent } from './DTR/inde/pages/wagespage/wagespage.component';
import { DeductionpageComponent } from './DTR/inde/pages/deductionpage/deductionpage.component';


const routes: Routes = [

  {
    path: 'deduction', component: IndeComponent,
    children: [
      { path: '', component: DeductionpageComponent }
    ]
  },
  {
    path: 'addition', component: IndeComponent,
    children: [
      { path: '', component: AdditionpageComponent }
    ]
  },
  {
    path: 'wages', component: IndeComponent,
    children: [
      { path: '', component: WagespageComponent }
    ]
  },

  {
    path: 'timein', component:TimeinComponent
  },

  {
    path: 'dailytimerecord', component: IndeComponent,
    children: [
      { path: '', component: DailytimerecordpageComponent }
    ]
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


  {
    path: 'home', component: IndeComponent, children:
      [
        { path: '', component: DashboardpageComponent },
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
