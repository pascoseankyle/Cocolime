import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dining',
  templateUrl: './dining.component.html',
  styleUrls: ['./dining.component.css']
})
export class DiningComponent implements OnInit {

  tblInfo: any= {};
  tables: any;
  

  //dito ipapasa yung value ng input field kaya mas better kapag same nalng din yung  [(NgModel)] na attribute at var dito sa column name nyo sa db

  remarks: any;
  username: string
  username1: string
  modifiedBy: any;
  modifiedBy1: any;

  //tables

  table_id: any;
  table_name: any;
  table_capacity: any;
  status_id: any;
  
  //function to get the name of the user
  getName(){
    this.modifiedBy = localStorage.getItem("Fullname");
    }
  
    getName1(){
      this.modifiedBy1 = localStorage.getItem("Fullname");
      }


  //dito malalagay kung sino yung nag login hehe
  
  

  closeResult: string;


  //Font-awesome Icons NOTE: kaylangan mo munang iimport yung icon 
  //na gagamitin mo then declare mo lang dito kung anong icon yon kagaya netong nasa baba

  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;
  
  
  constructor(private ds: DataService, public router: Router, private modalService: NgbModal,public dialog: MatDialog) { }

  orderReserveModal(contentOrderReserve) {
    this.dialog.open(contentOrderReserve); 
    
  }
  checkoutModal(contentCheckout) {
    this.dialog.open(contentCheckout); 
  }

  ngOnInit() {
    this.pullTables();

  }

  pullTables() {
    this.ds.sendApiRequest("tables", null).subscribe(data => {
      this.tables = data.data;
    })
  }
    //EDIT

  //get the value of a row

  editForm = (tables) => {
 

    this.tblInfo.table_id1 = tables.table_id;
    this.tblInfo.table_name1    = tables.table_name;
    this.tblInfo.table_capacity1    = tables.table_capacity;
    this.tblInfo.status_id1 = tables.status_id;   
  }
    //EDIT FUNCTION

 
    async reserveTable(){
      this.tblInfo.status_id1 = 3;
      console.log(this.tblInfo.modifiedBy1);
      await this.ds.sendApiRequest("editTable", this.tblInfo).subscribe(res => {
        this.pullTables();
      })
    }
    async checkoutTable(){
      this.tblInfo.status_id1 = 1;
      console.log(this.tblInfo.modifiedBy1);
      await this.ds.sendApiRequest("editTable", this.tblInfo).subscribe(res => {
        this.pullTables();
      })
    }

  async getOrder(){
      this.tblInfo.status_id1 = 2;
      console.log(this.tblInfo.modifiedBy1);
      await this.ds.sendApiRequest("editTable", this.tblInfo).subscribe(res => {
        this.pullTables();
      })
      // localStorage.setItem("table_id", tables.table_id);
      // localStorage.setItem("table_name", tables.table_name);
      // this.router.navigate(['/order']);
  }
  back(){
    this.router.navigate(['/main']);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['']);
  }
}