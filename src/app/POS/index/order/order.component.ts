import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


/* import { NgxPrintModule } from 'ngx-print'; */
import Swal from 'sweetalert2'

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';


const moment = _rollupMoment || _moment;


// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM/YYYY',
  },
  display: {
    dateInput: 'MMMM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


export interface orderCodes {
  list_id: any;
  list_order_code: any;
  list_order_total: any;
  list_order_date: any;
  
}


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [ {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})



export class OrderComponent implements OnInit, AfterViewInit {


  monthYear: any;


  inputDisable = true;

  selectedMonth: string = 'All';
  selectedYear: any = [];

  selectedFilter: any = {};
  selected: any;
  selectedMY: any;

  initYear: any;
  initMonth: any;

  selectedMYBool = false;


  datePicker = new FormGroup({
    date1: new FormControl('', { validators: [Validators.required] }),
    date2: new FormControl('', { validators: [Validators.required] })
 });


 date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    this.selectedFilter.selectedYear = normalizedYear.year();
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

   
    
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.selectedFilter.selectedMonth= normalizedMonth.month() + 1;
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();

  }


  order:any;
  pullOrder() 
  { 
    this.ds.apiReqPos("order", null).subscribe((data: any) => 
    {
       this.codeInfoTable = data.payload; 
       this.codeTableDataSource.data = this.codeInfoTable;
       console.log(this.codeTableDataSource);
    })
    
  }

  monthSelected(){

    var count = Object.keys(this.selectedFilter).length;
    var  months1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    this.inputDisable = false;

    if(count < 2){
     
        this.monthYear = "All inventory stocks";

        this.ds.apiReqPos("order", null).subscribe(data => {
        this.selected = data.data;
        this.codeInfoTable = data.payload; 
        this.codeTableDataSource.data = this.codeInfoTable;    
    });
    }
      else if(count == 2){
        this.monthYear =  months1[this.selectedFilter.selectedMonth - 1 ] + "-" + JSON.stringify(this.selectedFilter.selectedYear) + "-Stocks";
        this.ds.sendApiRequest("selectMYpos", this.selectedFilter).subscribe(data => {
          this.codeInfoTable = data.payload; 
       this.codeTableDataSource.data = this.codeInfoTable; 
      });
    }   



  }


  clearDate(){
    this.datePicker.value['date1'] = null;
    this.datePicker.reset();
    this.selectedFilter={};
    this.monthSelected();
  }



  logout(){
    localStorage.clear();
  this.router.navigate(['']);
  }
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;


  codeInfoTable: orderCodes[]  = [];
  codeTableDataSource = new MatTableDataSource(this.codeInfoTable);

  displayedColumns: any[] = [


    "Column1",
    "Column2",
    "Column3",
    "Column4",
    "Column5",
    "Column6",
   
  
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.codeTableDataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit()
  {
    this.codeTableDataSource.paginator = this.paginator;
  }


  panelOpenState = false;
  Order:boolean = true;
  Invoice:boolean = false;
  edit: boolean = false; 
  view: boolean = false;
 
  @ViewChild('DetailsDialog', { static: true })
  DetailsDialog!: TemplateRef<any>;
  
  detailModal = (i:any) => {
    
    this.dialog.open(this.DetailsDialog,
      {
        width: '100%',
        height: '80%'
      });
    this.recieptDetails.order_code = i;

    this.ds.apiReqPos("pullDetails", this.recieptDetails).subscribe((data: any) => {
     this.details = data.payload;
     
 
   
   
 
   })
   
  }

  showFiller = false;

  constructor(
    public dialog: MatDialog,  
    private ds: DataService,
    /* private ngx: NgxPrintModule */
    public router: Router
    ) { }

  openOrder(){
    this.Order= true;
    this.Invoice = false;
  }
  openInvoice(){
    this.Invoice = true;
    this.Order = false;
  }



  ngOnInit() {
    this.datePicker.controls['date1'].disable();
    this.monthSelected();
  }

  
  deleteBtn(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  openView(){
    this.view = true;
  }
  closeView(){
    this.view = false;
  }

  openEdit(){
    this.edit = true;
  }

  closeEdit(){
    this.edit = false;
  }
//adding function to database
  products:any={};
  cardInfo:any={};
  inputText: number = 1;;
  q:any;
 /*  @Input() title:string; */
  addOrder = (products:any) =>{
    this.cardInfo.product_name = products.title ;
    this.cardInfo.quantity = products.subtitle * this.inputText;
    this.cardInfo.price = products.price * this.inputText;
     this.q = this.inputText;
     this.ds.apiReqPos("addOrder", JSON.parse(JSON.stringify(this.cardInfo))).subscribe((data: any) => {
    this.pullOrder();
    });
    console.log(this.cardInfo);
    
  }

  



  

 
//delete function order
async delOrder(e: any)
 { 
   this.cardInfo.prodID = e; 
   Swal.fire({ title: 'Remove item?', 
    icon: 'warning', 
    showCancelButton: true, 
    confirmButtonColor: '#3085d6', 
    cancelButtonColor: '#d33', 
    confirmButtonText: 'Yes' 
  }).then((result) => 
  { 
    if (result.isConfirmed) 
    { 
      this.ds.apiReqPos("delOrder", JSON.parse(JSON.stringify(this.cardInfo))).subscribe((data: any) => 
        { 
          this.pullOrder(); 
        }); 
        Swal.fire( 'Deleted!', 'Item has been removed.', 'success' ) 
      } 
    }) 
  }

  recieptDetails: any = {};
  details: any;
 

}

