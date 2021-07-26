import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class CRMmainComponent implements OnInit {

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

  constructor(private ds: DataService, public router: Router, private modalService: NgbModal, public dialog: MatDialog) { }

  //Modals
  addModal(contentAdd) {
    
    this.dialog.open(contentAdd);

    
  }

  editModal(contentEdit) {
    this.dialog.open(contentEdit); 
    
  }

  redirectDining(){
    this.router.navigate(['/dining']);
  }

  ngOnInit() {

    
    document.getElementById('name').innerHTML = localStorage.getItem("Fullname");

    this.pullTables();


    //mapupunta yung name sa hidden na input sa add
    this.getName();

    //mapupunta yung name sa hidden na input sa edit
    this.getName1();

  }


  pullTables() {
    this.ds.sendApiRequest("tables", null).subscribe(data => {
      this.tables = data.data;
    })
    
  }
//CRUD FUNCTIONS

  //DELETE
  async delTable(e:any) {
    this.tblInfo.table_id = e;
    await this.ds.sendApiRequest("delTable", this.tblInfo).subscribe((res:any) => {
      this.pullTables();
    });
  }

  //CREATE

  async addTable(){

    this.tblInfo.table_name = this.table_name;
    this.tblInfo.table_capacity = this.table_capacity;
    this.tblInfo.status_id = this.status_id;


    console.log(this.tblInfo.modifiedBy);
    
    await this.ds.sendApiRequest("addTable", this.tblInfo).subscribe(res => {
      this.pullTables();
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

 
  async editTable(e){
    e.preventDefault();
    this.tblInfo.modifiedBy1 = this.modifiedBy1
    console.log(this.tblInfo.modifiedBy1);
    await this.ds.sendApiRequest("editTable", this.tblInfo).subscribe(res => {
      this.pullTables();
    })
  }

  
logoutFunction(){
  localStorage.clear();
  this.router.navigate(['']);
}

}
