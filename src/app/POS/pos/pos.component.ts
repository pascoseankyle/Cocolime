import { AfterContentInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { NgxPrintModule } from 'ngx-print';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { DataService } from 'src/app/services/data.service';
import { MatAccordion } from '@angular/material/expansion';



@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})

export class POSComponent implements OnInit, AfterContentInit {


  @Output() reciptCodeContainer = new EventEmitter<string>();

  panelOpenState = false;
  Order: boolean = true;
  Invoice: boolean = false; 
  edit: boolean = false;
  view: boolean = false;

  reciptCode: any;
  code: any;
  orderCode: any = {};
  showFiller = false;
  orderList: any = {};
  orderSubmitted: any = {};

  tableSelected = "";
  tableOccupied: any = {};


  nameInput: any;

  constructor(
    public dialog: MatDialog,
    private ds: DataService,
    private ngx: NgxPrintModule,
    private route: Router
  ) { 

  }

  logout()
  {
    localStorage.clear();
  this.route.navigate(['']);
  }
  
  btnSubmit(){
    if (this.cashInput < this.subtotal ){
      
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Please Enter A Valid Amount of Cash',  
        
      })  
    }  
    else if(this.preOrder.length == 0){  
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Please Enter A Product',  
        
      })  
    }

    else if(this.tableSelected == "" || this.tableSelected == null){  
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Please Select a table',  
        
      })  
    }

    else if(this.nameInput == "" || this.nameInput == null){  
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Please Enter name',  
        
      })  
    }

    else if(this.nameInput == "" || this.nameInput == null || this.tableSelected == "" || this.tableSelected == null || this.preOrder.length == 0 || this.cashInput < this.subtotal ){  
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Please Enter name',  
        
      })  
    }

    
   
    

    else{

      this.cashEntered = this.cashInput;
      this.orderCode.order_code = this.reciptCode;  
      this.orderCode.cashChange = this.cashEntered - this.subtotal;
      var newtable = this.tableSelected.replace(' (Reserved)','');

      this.ds.apiReqPos("pushCode", this.orderCode).subscribe((data: any) => {
    
        if(data.status.remarks == "success"){

          this.orderList.list_order_code = this.reciptCode;
          this.orderList.list_order_total = this.subtotal;
          this.orderList.cashChange = this.cashEntered - this.subtotal;
          this.orderList.table_name = newtable;
          this.orderList.customer_name = this.nameInput;

          this.ds.apiReqPos("addOrderlist", this.orderList).subscribe((data1: any) => {
            console.log(this.orderList);
            if(data1.status.remarks == "success")
            {
              this.orderSubmitted.isSubmitted = 1;
              this.orderSubmitted.order_code = this.reciptCode;

              this.ds.apiReqPos("submittedOrder", this.orderSubmitted).subscribe((data2: any) => {

            
              if(data2.status.remarks == "success")
              {
                this.tableOccupied.table_name = newtable;
                this.ds.apiReqPos("tableOccupied", JSON.parse(JSON.stringify(this.tableOccupied))).subscribe((data3: any) => {
                  
                  if(data3.status.remarks == "success")
                  {

                    this.route.navigate(['/receipt', this.reciptCode, this.cashEntered, newtable]);

                  }

                });


             
              }
              });
            }
        }); 
           }
     }); 

  
    }
  }

  openOrder() {
    this.Order = true;
    this.Invoice = false;
  }
  openInvoice() {
    this.Invoice = true;
    this.Order = false;
  }



  ngOnInit() {
    this.pullProduct();
    this.pullPreOrder();
    this.pullOrder();
    this.availableTables();
    this.pullCategories();

  }


  ngAfterContentInit(){
    this.generateCode();
  }


  generateCode(){
    var seq = (Math.floor(100000000 + Math.random() * 900000000)).toString().substring(1);
    this.reciptCode = seq;


  }

  deleteBtn() {
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
  openView() {
    this.view = true;
  }
  closeView() {
    this.view = false;
  }

  openEdit() {
    this.edit = true;
  }

  closeEdit() {
    this.edit = false;
  }

  //adding function to database\

  /* public beforeChange($event: NgbPanelChangeEvent) {

    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  } */
  
  products: any = {};
  cardInfo: any = {};
  inputText= 0;
  cashInput: number = 0;
  cashEntered: number = 0;
  q: any;
  /*  @Input() title:string; */
  addOrder = (products: any) => {

    this.reciptCodeContainer.emit(this.reciptCode);
    this.orderInfo.product_name = products.name;
    this.orderInfo.quantity = products.subtitle * this.inputText;
    this.orderInfo.price = products.price * this.inputText;
    

    this.q = this.inputText;
    this.ds.apiReqPos("addOrder", JSON.parse(JSON.stringify(this.orderInfo))).subscribe((data: any) => {
      this.pullOrder();
    });
 

  }
  //addPreorder
  orderInfo:any={};
  addPreOrder = (product:any) =>{

    this.code = this.reciptCode;

    if (this.inputText == 0){
     
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Please Enter A Valid Amount of Quantity',  
        
      })  
    
    } 

    else {
      
     
        this.orderInfo.product_name = product.product_name ;
        this.orderInfo.quantity = product.available * this.inputText;
        this.orderInfo.price = product.product_price * this.inputText;
        this.orderInfo.order_code = this.reciptCode;

        this.q = this.inputText;

  

        this.ds.apiReqPos("addPreOrderNew", this.orderInfo).subscribe((data: any) => {
    
       if(data.status.remarks == "success"){
            console.log(true)
            this.pullPreOrder();
            this.inputText = 0;
    this.getSubTotal();
  
          }
    }); 
        
      
    
     

  




    
  }


}


  //pull function order
  order: any;
  pullOrder() {
    this.ds.apiReqPos("order", null).subscribe((data: any) => {
      this.order = data.payload;
    })

  }

deleteIdentifier: any;
  preOrder: any;
  pullPreOrder() {
    this.ds.apiReqPos("pre", null).subscribe((data: any) => {
      this.preOrder = data.payload;
      
      this.deleteIdentifier = this.preOrder[0].order_code;
    
      this.getSubTotal();

    })

  }
  product: any = {};
  pullProduct() {
    this.ds.apiReqPos("prod", null).subscribe((data: any) => {
      this.product = data.payload;
  
    })

  }
  //delete function order

  async delPre(e: any) {
    this.orderInfo.order_code = e;
    Swal.fire({
      title: 'Remove item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ds.apiReqPos("delPre", JSON.parse(JSON.stringify(this.orderInfo))).subscribe((data: any) => {
          this.pullPreOrder();
        });
        Swal.fire('Deleted!', 'Item has been removed.', 'success')
      }
    })
  }


  defInfo: any = {};
  clearOrder() {
    
    this.defInfo.order_code = this.deleteIdentifier;

    this.ds.apiReqPos("clearAll", this.defInfo).subscribe((res: any) => {

      this.pullPreOrder();
      this.subtotal = 0;

    });
  }
  subtotal: number = 0;
  getSubTotal() {
    this.subtotal = 0;
    for (var i = 0; this.preOrder.length > i; i++) {
 
      this.subtotal = this.subtotal + this.preOrder[i].price;
    }


  }

  tables: any = {};
  availableTables()
  {
    this.ds.apiReqPos("availableTables", null).subscribe((data: any) => {
      this.tables = data.payload;
 
    })

  }

  categCon: any;
  categ: any = {};
  categInfo: any = {};
  categoryMenu1: any;
  pullCategories(){
    this.ds.apiReqPos("posCateg", null).subscribe((data: any) => {
      this.categ = data.payload;

    })
  }



 categMenu(categoryMenu) {
  this.categInfo.product_type =categoryMenu.tab.textLabel;
  this.categCon = categoryMenu.tab.textLabel;
  this.ds.apiReqPos("pullByCateg", this.categInfo).subscribe((data: any) => {
    this.categoryMenu1 = data.payload;
 
   
  });

  console.log(this.categCon);
}


value = 0;

  handleMinus() {
    if(this.inputText != 0){
      this.inputText--;  
    }

 
  }
  handlePlus() {
    this.inputText++;    
  }

  step = 0;



  
  setStep(index: number) {
    this.step = index;
  }

  @ViewChild(MatAccordion) accordion: MatAccordion;
}

export class YourClass {
  isOpen: boolean;
}

