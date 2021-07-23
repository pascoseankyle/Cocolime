import { AfterViewInit, Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {StocksAddComponent} from './stocks-add/stocks-add.component';

import { DataService } from 'src/app/services/data.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {MatSort} from '@angular/material/sort';
import { ArchiveComponent } from '../archive/archive.component';
import { EventTriggerService } from '../services/eventTrigger/event-trigger.service';
import { Subscription } from 'rxjs';
import { EditStockComponent } from '../modals/edit-stock/edit-stock.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


export interface StocksTable {
  item_id: number;
  item_name: string;
  item_desc: string;
  item_quant: number;
  date_expiry: string;
  item_price: number;
  item_minimum: number;
  remarks: string;

  
}

interface measurementType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, AfterViewInit {

  
  mt: measurementType[] = [
    {value: 'PCS/PCE', viewValue: 'Piece/s (PCS/PCE)'},
    {value: 'L', viewValue: 'Liters (L)'},
    {value: 'ml', viewValue: 'mililiters (ml)'},
    {value: 'dL', viewValue: 'deciliters (dl)'},
    {value: 'g', viewValue: 'grams (g)'},
    {value: 'mg', viewValue: 'miligrams (mg)'},
    {value: 'kg', viewValue: 'kilogram (kg)'},
    
    
  ];

  @ViewChild('EditDialog', { static: true }) EditDialog: TemplateRef<any>;


  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  productInfoTable: StocksTable[]  = [];
  productInfoTableDataSource = new MatTableDataSource(this.productInfoTable);
  displayedColumns: any[] = [

    "statusCol",
    "Column1",
    "Column2",
    "Column3",
    "Column4",
    "Column5",
    "Column6",
    "Column7",
    "Column8",
    "Column9",
    "ActionColumn",
  
  ];

  router: any;
  
  // displayedColumns: string[] = ['position', 'name', 'description', 'quantity','date_acquired','date_expiry','price','minimum','remarks','date_modified','modified_by','action'];
  // dataSource = ELEMENT_DATA;
  modifiedBy: any;
  modifiedBy1: any;

  prodInfo: any = {};
  products: any;

  item_id: any;
  item_name: any;
  item_desc: any;
  item_quant: number;
  date_expiry: any;
  item_price: any;
  item_minimum: number;
  remarks: any;
  username: string
  username1: string
  measurementType: any;
  item_id1: any;
  item_name1: any;
  item_desc1: any;
  item_quant1: number;
  date_expiry1: any;
  item_price1: any;
  item_minimum1: number;
  remarks1: any;
  measurementType1: any;

  clickEvent: Subscription;


  archiveCounter = 0;

  constructor(private fb: FormBuilder, private et: EventTriggerService,public dialog: MatDialog, private ds: DataService) {

    this.clickEvent = this.et.getClickEvent().subscribe(()=> {
      this.pullProducts();

      this.archiveCount();
    });

  }

  productForm = this.fb.group({
    item_id:['',Validators.required],
    item_name:['',Validators.required],
    item_desc:['',Validators.required],
    item_quant:['',Validators.required],
    date_expiry:['',Validators.required],
    item_price:['',Validators.required],
    item_minimum:['',Validators.required],
    measurementType:['',Validators.required],
    remarks:['',Validators.required]
   });



   
  editModal = (i) => {
    
    this.dialog.open(this.EditDialog);

    this.productForm.patchValue({
      item_id: i.item_id,
      item_name: i.item_name,
      item_desc: i.item_desc,
      item_quant: i.item_quant,
      item_price: i.item_price,
      item_minimum: i.item_minimum,
      remarks: i.remarks,
      date_expiry: i.date_expiry,
      measurementType: i.measurementType
    })
  }




  // openDialog(): void {
  //   const dialogRef = this.dialog.open(StocksAddComponent, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });
  // }
  

  editStocks(): void {
    this.dialog.open(EditStockComponent, {
      data: {
        item_id: this.item_id, 
        item_name: this.item_name
            }
    });
  }
  
  addStocks() {
    this.dialog.open(StocksAddComponent);
  }

  addArchive() {
    this.dialog.open(ArchiveComponent, {
      height: '800px',
      width: '15000px',
    });
  }



  getName(){
    this.modifiedBy = localStorage.getItem("Fullname");
    }
  
    getName1(){
      this.modifiedBy1 = localStorage.getItem("Fullname");
      }


      ngAfterViewInit() {
        this.productInfoTableDataSource.paginator = this.paginator;


       
      }

      ngOnInit() {

        this.archiveCount();
        this.pullProducts();


    
        document.getElementById('name').innerHTML = localStorage.getItem("Fullname");
       // this.pullProducts();
    
    
        //mapupunta yung name sa hidden na input sa add
        this.getName();
    
        //mapupunta yung name sa hidden na input sa edit
        this.getName1();
    
      }

   
  
  logoutFunction(){
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }
  


  public doFilter = (value: string) => {
    this.productInfoTableDataSource.filter = value.trim().toLocaleLowerCase();
  }

// TABLE POPULATE

//WHERE is_Archive = 0
pullProducts() {
  this.ds.sendApiRequest("inventory", null).subscribe(data => {
    this.productInfoTable = data.payload;
    this.productInfoTableDataSource.data = this.productInfoTable;
  })
}
pullArchive() {
  this.ds.sendApiRequest("inventory_Archive", null).subscribe(data => {
    this.productInfoTable = data.payload;
    console.log(this.productInfoTable);
    this.productInfoTableDataSource.data = this.productInfoTable;
    console.log(this.productInfoTableDataSource);
  })
}


archiveCount() {
  this.ds.sendApiRequest("inventory_Archive", null).subscribe(data => {
    this.productInfoTable = data.payload;
    var count = Object.keys(data.payload).length;
    this.archiveCounter = count;
  })
}

//CRUD FUNCTIONS



//ARCHIVE Item
async arcProduct(e) {

  Swal.fire({
    title: 'Are you sure you want to archive product?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, archive it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Recovered!',
        'Your file has been archived.',
        'success'
      )

      this.prodInfo.item_id = e;
      console.log(this.prodInfo);
        this.ds.sendApiRequest("arcProduct", this.prodInfo).subscribe(res => {
        this.pullProducts();
        this.archiveCount();
    });
 
    }
  });
 
}
//RECOVER Item
async recProduct(e) {
  this.prodInfo.item_id = e;
  await this.ds.sendApiRequest("recProduct", this.prodInfo).subscribe(res => {
    this.pullArchive();
});
}


// EDIT
editProduct(e){
  e.preventDefault();

  if(!this.productForm.valid)
  {
    Swal.fire({
      icon: 'error',
      title: 'All fields are required',
      showConfirmButton: false,
      timer: 1200
    });

    return false;
  } 
  
  else
  {
    this.prodInfo.item_name = this.productForm.value['item_name'];
    this.prodInfo.item_id =   this.productForm.value['item_id'];
    this.prodInfo.item_desc = this.productForm.value['item_desc'];
    this.prodInfo.item_quant =  this.productForm.value['item_quant'];
    this.prodInfo.item_minimum =  this.productForm.value['item_minimum'];
    this.prodInfo.item_price =  this.productForm.value['item_price'];
    this.prodInfo.remarks = this.productForm.value['remarks'];
    this.prodInfo.date_expiry = this.productForm.value['date_expiry'];
    this.prodInfo.modifiedBy = this.modifiedBy;
    this.prodInfo.measurementType = this.productForm.value['measurementType'];
  
  this.ds.sendApiRequest("editProduct", this.prodInfo).subscribe(data => {
  this.pullProducts();
    });
  
    Swal.fire({
      icon: 'success',
      title: 'Stock Edited',
      showConfirmButton: false,
      timer: 1200
    });
  
  }
 


}

}


// const ELEMENT_DATA: StocksTable[] = [
//   {position: 1, name: 'Adobong Burat', description: 'Masarap', quantity: 1, date_acquired: '20-05-2021', date_expiry: '23-05-2021', price: 150, minimum: 1, remakrs: '', date_modified: '20-05-21', modified_by: 'Euriel John'},
// ];

