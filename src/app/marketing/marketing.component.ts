import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { DataService } from '../services/data.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css',
              './css/style.css',
              './css/nivo-lightbox/nivo-lightbox.css',
              './css/nivo-lightbox/default.css',
              // './css/bootstrap.css',
              // './fonts/font-awesome/css/font-awesome.css'
             ]
})
export class MarketingComponent implements OnInit {

  constructor(
    private viewportScroller: ViewportScroller,
    private ds: DataService ,
    private modalService: NgbModal, 
    public dialog: MatDialog
  ) { }

  tblInfo: any= {};
  reserveInfo: any= {};
  tables: any;

  table_id: any;
  table_name: any;
  table_capacity: any;
  status_id: any;

  // Reservation Infos
  first_name: any;
  last_name: any;
  phone_no: any;


    //Modals
    reserveModal(contentReserve) {
    
      this.dialog.open(contentReserve);
  
      
    }

  ngOnInit(): void {
    this.pullTables();
  }
  public onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
}

reserveForm = (tables) => {
 

  this.tblInfo.table_id1 = tables.table_id;
  this.tblInfo.table_name1    = tables.table_name;
  this.tblInfo.table_capacity1    = tables.table_capacity;
  this.tblInfo.status_id1 = tables.status_id;   
}
addReservation(){
  this.reserveInfo.first_name1 = this.first_name;
  this.reserveInfo.last_name1    = this.last_name;
  this.reserveInfo.phone_no1    = this.phone_no;
  console.log(this.reserveInfo);
}
pullTables() {
  this.ds.sendApiRequest("tables", null).subscribe(data => {
    this.tables = data.data;
  })
}

}
