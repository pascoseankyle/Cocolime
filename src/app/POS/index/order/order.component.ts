import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


/* import { NgxPrintModule } from 'ngx-print'; */
import Swal from 'sweetalert2'

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

export interface orderCodes {
  list_id: any;
  list_order_code: any;
  list_order_total: any;
  list_order_date: any;
  
}


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, AfterViewInit {

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
    this.pullOrder();
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

