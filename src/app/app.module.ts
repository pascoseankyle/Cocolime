import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './index/header/header.component';
import { CardpanelComponent } from './index/cardpanel/cardpanel.component';
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './index/navbar/navbar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Modules Import

// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { OrdersComponent } from './orders/orders.component';
import { StocksComponent } from './stocks/stocks.component';
import { SupplyComponent } from './supply/supply.component';
import { StocksAddComponent } from './stocks/stocks-add/stocks-add.component';
import { ArchiveComponent } from './archive/archive.component';
import { EditStockComponent } from './modals/edit-stock/edit-stock.component';
import { EditServiceService } from './services/editService/edit-service.service';
import { ItemHistoryComponent } from './components/item-history/item-history.component';
import { CdkTableExporterModule, MatTableExporterModule } from 'mat-table-exporter';


import { WelcomeComponent } from './welcome/welcome.component';
import { CRMmainComponent } from './CRM/main/main.component';
import { DiningComponent } from './CRM/dining/dining.component';
import { ReservationsComponent } from './CRM/reservations/reservations.component';


// POS COMPONENTS

import { OrderComponent } from './POS/index/order/order.component';
import { POSComponent } from './POS/pos/pos.component'; 
import { ReceiptComponent } from './POS/receipt/receipt.component';
import { NgxPrintModule} from 'ngx-print';
import { MarketingComponent } from './marketing/marketing.component';

//DTR POS
//Providers
import { DatePipe } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
//DTRIndex
import { IndeComponent } from './DTR/inde/inde.component';

//POS Index
import { IndComponent } from './PMS/ind/ind.component';
import { EmployeepageComponent } from './DTR/inde/pages/employeepage/employeepage.component';
import { TimekeepingpageComponent } from './DTR/inde/pages/timekeepingpage/timekeepingpage.component';
import { TimeinComponent } from './DTR/timein/timein.component';
import { AttendancepageComponent } from './DTR/inde/pages/attendancepage/attendancepage.component';

import { AdditionpageComponent } from './PMS/ind/pages/additionpage/additionpage.component';
import { DeductionpageComponent } from './PMS/ind/pages/deductionpage/deductionpage.component';
import { WagespageComponent } from './PMS/ind/pages/wagespage/wagespage.component';

@NgModule({
  declarations: [

    //DTR PMS

    IndeComponent,
    IndComponent,
    TimeinComponent,
    AttendancepageComponent,
    TimekeepingpageComponent,
    EmployeepageComponent,
    AdditionpageComponent,
    DeductionpageComponent,
    WagespageComponent,

    NavbarComponent,
    IndexComponent,
    LoginComponent,
    HeaderComponent,
    CardpanelComponent,
    AppComponent,
    MainComponent,
    LoginComponent,
    OrdersComponent,
    StocksComponent,
    SupplyComponent,
    StocksAddComponent,
    ArchiveComponent,
    EditStockComponent,
    ItemHistoryComponent,
    WelcomeComponent,
    CRMmainComponent,
    DiningComponent,
    ReservationsComponent,

    // POS COMPONENTS
    OrderComponent,
    POSComponent,
    ReceiptComponent,
    MarketingComponent,
    IndeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    //Material Cons Imports
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,

    // Mat-Table Exporter
    MatTableExporterModule,
    CdkTableExporterModule,

    // HTTP
    HttpClientModule,
    NgxPrintModule
  ],
  exports: [MatFormFieldModule,
    MatInputModule,
    MatSortModule,],
  providers: [EditServiceService, DatePipe, LowerCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
