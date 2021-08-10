import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/DTR/service/data.service';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { RouterModule } from '@angular/router';

export interface empTable {
  emp_no: any;
  emp_id: any;
  emp_firstname: any;
  emp_lastname: any;
  emp_address: any;
  emp_datebirth: any;
  emp_contact: any;
  emp_time_in: any;
  emp_time_out: any;
  emp_department: any;
  emp_is_archived: any;
  emp_sex: any;
  emp_position: any;
  emp_start_date: any;
  emp_status: any;
  emp_last_mod_date: any;
  emp_last_mod_by: any;
}

export interface aPTable {
  ap_no: any;
  ap_name: any;
  ap_JSON: apJSON[];
}

export interface apJSON {
  emp_no: any;
  ap_rate: any
  ap_argument: any;
}


@Component({
  selector: 'app-additionpage',
  templateUrl: './additionpage.component.html',
  styleUrls: ['./additionpage.component.css']
})
export class AdditionpageComponent implements OnInit {


 /* apJSONSample: apJSON[] = [{ "emp_no" : "1", "ap_rate" : "100", "ap_argument" : "daily"}]*/

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.buildTable();  
    this.pullAllAP();
    this.pullAllEmp();
   
    
  }
  
  aPInfoTable: aPTable[] = [];
  aPInfoTableJSON: apJSON[] = [];
  aPInfoTableDataSource = new MatTableDataSource(this.aPInfoTable);

  jsonData: any;
  pullAllAP() {
    this.data.sendApiRequest("pullAllAP", null).subscribe((data: any) => {
      console.log(data.payload)
      this.aPInfoTable = data.payload;
      this.aPInfoTableDataSource.data = this.aPInfoTable;
      /*console.log(this.aPInfoTableDataSource.data + ' From DTR Page: Method pullAllAP');*/

      //for (let dtrInfoTable of this.dtrInfoTable) {
      //  this.jsonData = dtrInfoTable.dtr_content;
      //  this.dtrJSONTable = JSON.parse(this.jsonData);
      //  dtrInfoTable.dtr_content = this.dtrJSONTable;
      //}

      for (let aPInfoTable of this.aPInfoTable) {
        this.jsonData = aPInfoTable.ap_JSON;
        this.aPInfoTableJSON = JSON.parse(this.jsonData);
        aPInfoTable.ap_JSON = this.aPInfoTableJSON;
      }

      /*console.log(this.aPInfoTable[0].ap_JSON[0].emp_no + 'XXXXXXXXXXXXXXXXXX')*/

    });
  }

  //Table Columns

  displayedColumns: string[] = ['Employee No', 'Added Payments Name', 'Added Payments Arguments'];

  empInfoTable: empTable[] = [];
  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      console.log("PULLING DATA");
      this.empInfoTable = data.payload;
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource.data);
      console.log("DATA PULLED")

      //for (let aPInfoTable of this.aPInfoTable) {
      //  console.log(this.checkIfHasEmp(aPInfoTable.emp_no))
      //  this.checkIfHasEmp(aPInfoTable.emp_no);

      //}


    });
  }

  getEmpName(emp_no : any) {
    for (let empInfoTable of this.empInfoTable) {
      if (emp_no == empInfoTable.emp_no) {
        console.log(empInfoTable.emp_firstname)
      }
    }
  }

  checkIfHasEmp(emp_no: any) {
    var hasEmp : boolean = false
    for (let empInfoTable of this.empInfoTable) {
      console.log(empInfoTable.emp_no)
      if (emp_no == empInfoTable.emp_no) {
        console.log('match found')
        hasEmp = true;
        ;break
      }
      hasEmp = false;
    }
    return(hasEmp)
  }

  additionsColumns: string[] = [];

  buildTable() {
    this.additionsColumns = [];
    this.additionsColumns.push("emp_name");
    this.additionsColumns.push("ap_rate");
    this.additionsColumns.push("ap_argument");
    this.additionsColumns.push("actions");
  }

  updateList() {

  }






}
