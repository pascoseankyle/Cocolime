import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../services/data.service';
import { EventTriggerService } from '../services/eventTrigger/event-trigger.service';
import Swal from 'sweetalert2';

export interface archiveTable {
  item_id: number;
  item_name: string;
  item_desc: string;
  item_quant: number;
  date_expiry: string;
  item_price: number;
  item_minimum: number;
  remarks: string;
}
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})


export class ArchiveComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  productInfoTable: archiveTable[]  = [];
  productInfoTableDataSource = new MatTableDataSource(this.productInfoTable);
  displayedColumns: string[] = [

    "Column1",
    "Column2",
    "Column3",
    "Column4",
    "Column5",
    "Column6",
    "Column7",
    "Column8",
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
  item_quant: any;
  date_expiry: any;
  item_price: any;
  item_minimum: any;
  remarks: any;
  username: string
  username1: string
  
  constructor(public dialog: MatDialog, private ds: DataService, private et: EventTriggerService) {}

  
  getName(){
    this.modifiedBy = localStorage.getItem("Fullname");
    }
  
    getName1(){
      this.modifiedBy1 = localStorage.getItem("Fullname");
      }
      ngAfterViewInit() {
        this.productInfoTableDataSource.paginator = this.paginator;
        this.productInfoTableDataSource.sort = this.sort;
      }
      ngOnInit() {
        this.pullArchive();
        document.getElementById('name').innerHTML = localStorage.getItem("Fullname");
        this.getName();
        this.getName1();
    
      }

      //TABLE POPULATE 
      
      // pullProducts() {
      //   this.ds.sendApiRequest("inventory", null).subscribe(data => {
      //     this.productInfoTable = data.payload;
      //     console.log(this.productInfoTable);
      //     this.productInfoTableDataSource.data = this.productInfoTable;
      //     console.log(this.productInfoTableDataSource);
      //   })
      // }
      pullArchive() {
        this.ds.sendApiRequest("inventory_Archive", null).subscribe(data => {
          this.productInfoTable = data.payload;
          console.log(this.productInfoTable);
          this.productInfoTableDataSource.data = this.productInfoTable;
          console.log(this.productInfoTableDataSource);
        })
      }

      //RECOVER PRODUCT
      async recProduct(e) {

        Swal.fire({
          title: 'Are you sure you want to recover product?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, recover it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Recovered!',
              'Your file has been recovered.',
              'success'
            )

              this.prodInfo.item_id = e;
              this.ds.sendApiRequest("recProduct", this.prodInfo).subscribe(res => {
              this.pullArchive();
              this.et.sendClickEvent();
          });
       
          }
        });


      
      }
       //DELETE PRODUCT
       async delProduct(e) {

        Swal.fire({
          title: 'Are you sure you want permanent delete?',
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
            
          this.prodInfo.item_id = e;
          this.ds.sendApiRequest("delProduct", this.prodInfo).subscribe(res => {
          this.pullArchive();
          this.et.sendClickEvent();
      });
          }
        });

      }
}
