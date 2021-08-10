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

export interface deTable {
  ded_no: any;
  ded_name: any;
  ded_JSON: dedJSON[];
}

export interface dedJSON {
  emp_no: any;
  ded_rate: any
  ded_argument: any;
}

@Component({
  selector: 'app-deductionpage',
  templateUrl: './deductionpage.component.html',
  styleUrls: ['./deductionpage.component.css']
})
export class DeductionpageComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.buildTable();
    this.pullAllDed();
    this.pullAllEmp();

  }

  deInfoTable: deTable[] = [];
  deInfoTableJSON: dedJSON[] = [];
  deInfoTableDataSource = new MatTableDataSource(this.deInfoTable);

  jsonData: any;

  pullAllDed() {
    this.data.sendApiRequest("pullAllDed", null).subscribe((data: any) => {
      console.log(data.payload)
      this.deInfoTable = data.payload;
      this.deInfoTableDataSource.data = this.deInfoTable;

      for (let deInfoTable of this.deInfoTable) {
        this.jsonData = deInfoTable.ded_JSON;
        this.deInfoTableJSON = JSON.parse(this.jsonData);
        deInfoTable.ded_JSON = this.deInfoTableJSON;
      }

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

  getEmpName(emp_no: any) {
    for (let empInfoTable of this.empInfoTable) {
      if (emp_no == empInfoTable.emp_no) {
        console.log(empInfoTable.emp_firstname)
      }
    }
  }

  //checkIfHasEmp(emp_no: any, ap_name: any) {
  //  var hasEmp: boolean = false;
  //  console.log(ap_name)
  //  for (let aPInfoTable of this.aPInfoTable) {
  //    if (aPInfoTable.ap_name === ap_name) {
  //      for (let ap_json of aPInfoTable.ap_JSON) {
  //        if (ap_json.emp_no == emp_no ) {
  //          console.log('maaaaaaaaaaaatch');
  //          hasEmp = true;
  //          ;break
  //        }
  //      }
  //    }      
  //  }
  //  if (hasEmp == false) {
  //    console.log('No maaaaaaaaaaaatch');
  //    /*this.generateEmpty(this.aPInfoTableJSON, ap_name, emp_no);*/
  //  }  

  //}

  getAPRate(emp_no: any, ap_name: any) {
    var rate = null;
    console.log(ap_name)
    for (let aPInfoTable of this.deInfoTable) {
      if (aPInfoTable.ded_name === ap_name) {
        for (let ap_json of aPInfoTable.ded_JSON) {
          if (ap_json.emp_no == emp_no) {
            /*console.log('maaaaaaaaaaaatch');*/
            rate = ap_json.ded_rate;
            ; break
          }
        }
      }
    }
    return (rate)
  }

  getAPFunction(emp_no: any, ap_name: any) {
    var arg = null;
    console.log(ap_name)
    for (let aPInfoTable of this.deInfoTable) {
      if (aPInfoTable.ded_name === ap_name) {
        for (let ap_json of aPInfoTable.ded_JSON) {
          if (ap_json.emp_no == emp_no) {
            /*console.log('maaaaaaaaaaaatch');*/
            arg = ap_json.ded_argument;
            ; break
          }
        }
      }
    }
    return (arg)
  }

  additionsColumns: string[] = [];

  buildTable() {
    this.additionsColumns = [];
    this.additionsColumns.push("emp_name");
    this.additionsColumns.push("ap_rate");
    this.additionsColumns.push("ap_argument");
    /* this.additionsColumns.push("actions");*/
  }

  aPInfoTableCopy: deTable[] = [];

  //generateEmpty(aPJSON : any, ap_name: any, emp_no : any) {
  //  console.log(emp_no);
  //  this.aPInfoTableCopy = this.aPInfoTable;
  //  console.log(this.aPInfoTableCopy);
  //  for (let aPInfoTableCopy of this.aPInfoTableCopy) {
  //    console.log(aPInfoTableCopy)
  //    aPInfoTableCopy.ap_JSON.push({ "emp_no": emp_no, "ap_rate": "0", "ap_argument": "none" })
  //  }

  //  console.log(this.aPInfoTableCopy[0].ap_JSON + 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  //  console.log(this.aPInfoTable[0].ap_JSON);


  //  //for (let aPInfoTableCopy of this.aPInfoTableCopy) {
  //  //  if (aPInfoTableCopy.ap_name === ap_name) {
  //  //    aPInfoTableCopy.ap_JSON.push({ "emp_no": emp_no, "ap_rate": "0", "ap_argument": "none" });
  //  //    console.log()
  //  //    /*this.compileAP(aPInfoTableCopy.ap_JSON, aPInfoTableCopy.ap_no);*/
  //  //  }      
  //  //}


  //}

  updateList(event: any) {
    console.log(event + '+++++++++ From DTR Page: Method updateList');
    //for (let dtrJSONTable of this.dtrJSONTable) {
    //  if (dtrJSONTable.date == date) {
    //    console.log('Date Matched');
    //    switch (argument) {
    //      case "am_time_in": {
    //        dtrJSONTable.am_time_in = event.target.value;
    //        console.log(argument + ': Argumments From DTR Page: Method updateList');
    //        break;
    //      }
    //      case "am_time_out": {
    //        dtrJSONTable.am_time_out = event.target.value;
    //        console.log(argument + ': Argumments From DTR Page: Method updateList');
    //        break;
    //      }
    //      case "pm_time_in": {
    //        dtrJSONTable.pm_time_in = event.target.value;
    //        console.log(argument + ': Argumments From DTR Page: Method updateList');
    //        break;
    //      }
    //      case "pm_time_out": {
    //        dtrJSONTable.pm_time_out = event.target.value;
    //        console.log(argument + ': Argumments From DTR Page: Method updateList');
    //        break;
    //      }
    //      case "ot_time_in": {
    //        dtrJSONTable.ot_time_in = event.target.value;
    //        console.log(argument + ': Argumments From DTR Page: Method updateList');
    //        break;
    //      }
    //      case "ot_time_out": {
    //        dtrJSONTable.ot_time_out = event.target.value;
    //        console.log(argument + ': Argumments From DTR Page: Method updateList');
    //        break;
    //      }
    //      case "mhrs": {
    //        dtrJSONTable.mhrs = event.target.value;
    //        console.log(argument + ': Argumments From DTR Page: Method updateList');
    //        break;
    //      }
    //      case "remarks": {
    //        dtrJSONTable.remarks = event.target.value;
    //        console.log(argument + ': Argumments From DTR Page: Method updateList');
    //        break;
    //      }

    //      default: {
    //        console.log(argument + ': No Valid Argumments From DTR Page: Method updateList');
    //        break;
    //      }
    //    }
    //  }
    //}
    //this.editDTR(this.dtrJSONTable, dtr_id);
  }


  aPInfo: any = {};
  async compileAP(aPJSON: any, ap_no: any) {
    this.aPInfo = {};
    this.aPInfo.ap_no = ap_no;
    this.aPInfo.ap_JSON = JSON.stringify(aPJSON);

    console.log(this.aPInfo.ap_JSON)
    //this.data.sendApiRequest("editAP", this.aPInfo).subscribe((data: any) => {
    //});
  }

  editAP() {

  }





}
