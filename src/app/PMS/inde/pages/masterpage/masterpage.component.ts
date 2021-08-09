import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DatePipe, Time } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface empTable {
  emp_id: string;
  emp_firstname: string;
  emp_lastname: string;
  emp_address: string;
  emp_datebirth: Date;
  emp_contact: string;
  emp_time_in: Time;
  emp_time_out: Time;
  emp_department: string;
  emp_is_archived: string;
  emp_sex: string;
  emp_position: string;
  emp_start_date: Date;
  emp_status: string;
  emp_last_mod_date: Date;
  emp_last_mod_by: any;
}
export interface dtrTable {
  emp_id: any;
  dtr_no: any;
  dtr_id: any;  
  dtr_content: dtrJSON[];
  dtr_month_year: any;
}
export interface dtrJSON {
  date: Date;
  am_time_in: any;
  am_time_out: any;
  pm_time_in: any;
  pm_time_out: any;
  ot_time_in: any;
  ot_time_out: any;
  mhrs: number;
  remarks: string;
}
export interface attendanceTable {
  emp_id: any;
  attendanceDate: any;
  attendanceHour: any;
}





@Component({
  selector: 'app-masterpage',
  templateUrl: './masterpage.component.html',
  styleUrls: ['./masterpage.component.css']
})
export class MasterpageComponent implements OnInit {

  dtrInfoTable: dtrTable[] = [];

  dtrJSONInfo: dtrJSON[] = []; 

  dtrInfo: any = {};

  jsonInfo: any = {};

  fileToUpload: File | null = null;


  constructor(private data: DataService) { }

  ngOnInit(): void {
    /*this.pullAllDTR();*/
  /*this.addDTR();*/
    /*this.getJSON();*/

  }

  getJSON() {
    this.data.getJSON(null).subscribe((data:any) =>{
      console.log(data);
    })
  }

  uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
      this.uploadFileToActivity(fileList, 'json_1')
    }
  }

  uploadFileToActivity(json_content: any, json_id: any) {

    this.jsonInfo.json_id = json_id;
    this.jsonInfo.jscon_content = json_content;
    this.data.sendApiRequest("addJSON",this.jsonInfo).subscribe((data :any) => {
      console.log(data);
    })
  }


  //pullAllEmp() {
  //  this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
  //    this.empInfoTable = data.payload;
  //    console.log(this.empInfoTable);
  //    console.log(this.empInfoTableLength + 'From Dashboard Page: Method pullAllEmp');
  //    this.empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);
  //    this.empInfoTableDataSource.data = this.empInfoTable;
  //    this.empInfoTableLength = this.empInfoTableDataSource.data.length;
  //    console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
  ////  });

  //}

  thisstring: any;

  pullAllDTR() {
    this.dtrInfoTable =[];
    this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
      this.dtrInfoTable = data.payload;
      this.thisstring = data.payload.dtr_content;
      console.log(this.thisstring);
      console.log(data);
      console.log(this.dtrInfoTable);
      console.log(JSON.stringify(data.payload.dtr_content) + '+++++++++++++++++++++');

      var astring: string;

      astring = this.thisstring
      console.log(astring); 
      this.showDTR()
    })

  }

  jsonData: any;
  showDTR() {
    for (let dtrInfoTable of this.dtrInfoTable) {
      this.jsonData = dtrInfoTable.dtr_content;
      this.dtrJSONInfo = JSON.parse(this.jsonData);
     
      console.log(dtrInfoTable.dtr_content + "++++++fefefef++++++++++++++++++++++++");
      console.log(this.dtrJSONInfo + "++++++fefefef++++++++++++++++++++++++");
    }

    for (let dtrJSONInfo of this.dtrJSONInfo) {
      console.log(dtrJSONInfo.date);

      console.log(dtrJSONInfo.am_time_in);
    }
  }


  
  currentDate: any;

  //async addDTR() {
  //  this.currentDate = this.data.getDate();
  //  this.dtrInfo = {}
  //  console.log(this.currentDate);
    
  //  this.dtrJSONInfo = [{ date: this.currentDate, am_time_in: this.currentDate, am_time_out: this.currentDate, pm_time_in: this.currentDate, pm_time_out: this.currentDate, ot_time_in: this.currentDate, ot_time_out: this.currentDate }, { date: this.currentDate, am_time_in: this.currentDate, am_time_out: this.currentDate, pm_time_in: this.currentDate, pm_time_out: this.currentDate, ot_time_in: this.currentDate, ot_time_out: this.currentDate }];
  //  var json ;

  //  json = JSON.stringify(this.dtrJSONInfo);
  //  var emp_id = 'XX-01';
  //  this.dtrInfo.dtr_id = emp_id+'_'+'july_2021';
  //  this.dtrInfo.emp_id = emp_id;
  //  this.dtrInfo.dtr_content = json;

  //  console.log(this.dtrInfo + ' From Dashboard Page: Method addEmp');
  //  this.data.sendApiRequest("addDTR", this.dtrInfo).subscribe((data: any) => {
  //    console.log(this.dtrInfo.dtr_content)

  //    console.log(JSON.parse(this.dtrInfo.dtr_content))

  //  });
  //}


}
