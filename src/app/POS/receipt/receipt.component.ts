import { Component, OnInit } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Route } from '@angular/compiler/src/core';




@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  code: any={};
  receiptID: any;
  cash: any;
  table: any;
  receiptInfo: any = {};
  dateAndCode: any = {};
  constructor( 
    public ngx: NgxPrintModule,
    private ds: DataService,
    public aRoute: ActivatedRoute
    , public router: Router
    ) {

     }
  preOrder: any = {};

  pullPreOrder() {

     this.receiptInfo.order_code = this.receiptID;

       this.ds.apiReqPos("preOrder", this.receiptInfo).subscribe((data: any) => {
         this.preOrder = data.payload;
         console.log(this.preOrder);
         this.getSubTotal();
   
       })
   
     }


     pullDateAndCode() {

      this.dateAndCode.list_order_code = this.receiptID;
 
        this.ds.apiReqPos("pullDateAndCode", this.dateAndCode).subscribe((data: any) => {
          this.code = data.payload;
   
   
    
        })
    
      } 

  subtotal: number = 0;
  
  getSubTotal() {
    this.subtotal = 0;
    for (var i = 0; this.preOrder.length > i; i++) {
      console.log(i)
      console.log(this.preOrder[i].price);
      this.subtotal = this.subtotal + this.preOrder[i].price;
    }


  }
  
  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.receiptID = params['code'];
      this.cash = params['cash'];
      this.table = params['table'];
    });



    this.pullDateAndCode();
    this.getSubTotal();
    this.pullPreOrder();
  }

  logout()
  {
    localStorage.clear();
  this.router.navigate(['']);
  }

}
