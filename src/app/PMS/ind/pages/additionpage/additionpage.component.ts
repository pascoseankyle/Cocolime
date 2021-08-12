import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DTR/service/data.service';

//import { DatePipe, Time } from '@angular/common';
//import { LowerCasePipe } from '@angular/common';


//import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatTableDataSource } from '@angular/material/table';
//import { MatPaginator } from '@angular/material/paginator';
//import { MatSort } from '@angular/material/sort';

//import { RouterModule } from '@angular/router';

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
  ap_rate: any;
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
    this.pullAllEmp();
    this.pullAllAP();
  }

  aPInfoTable: aPTable[] = [];
  aPInfoTableJSON: apJSON[] = [];

  jsonData: any;

  pullAllAP() {
    this.data.sendApiRequest("pullAllAP", null).subscribe((data: any) => {
      console.log(data.payload);
      this.aPInfoTable = data.payload;

      //this.aPInfoTableDataSource.data = this.aPInfoTable;
      //console.log(this.aPInfoTableDataSource.data + ' From DTR Page: Method pullAllAP');

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

      //console.log(this.aPInfoTable[0].ap_JSON[0].emp_no + 'XXXXXXXXXXXXXXXXXX')

    });
  }

  //Table Columns

  empInfoTable: empTable[] = [];

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      console.log("PULLING DATA");
      this.empInfoTable = data.payload;
      console.log("DATA PULLED")
    });
  }

  getAPRate(ap_name: any, emp_no: any) {

    var rate = 0

    for (let aPInfoTable of this.aPInfoTable) {
      if (aPInfoTable.ap_name == ap_name) {
        for (let aPInfoTableJSON of aPInfoTable.ap_JSON) {
          if (emp_no == aPInfoTableJSON.emp_no) {
            rate = aPInfoTableJSON.ap_rate
          }
        }
      }
    }
    return (rate)
  }

  updateRate(ap_name: any, emp_no: any, event: any) {
    console.log(event.target.value)
    var hasMatch = false;

    console.log(ap_name, emp_no, event.target.value)

    for (let aPInfoTable of this.aPInfoTable) {
      console.log('xxxxxxxxxxxxxxxxxxxxxxx')
      if (ap_name === aPInfoTable.ap_name) {
        for (let aPInfoTableJSON of aPInfoTable.ap_JSON) {
          /*console.log(ap_name, emp_no, event.target.value)*/          
          if (aPInfoTableJSON.emp_no == emp_no) {            
            console.log('matched')
            aPInfoTableJSON.ap_rate = event.target.value;
            this.editAP(aPInfoTable.ap_no);
            console.log(aPInfoTableJSON)
            hasMatch = true            
          }        
          console.log(aPInfoTable.ap_JSON)
        }
        
      }
    }
    if (hasMatch == false) {
      console.log('NO matched xxxxxxxxxxxxxxxxxxxxxxxx')
      this.pushJSON(emp_no, ap_name)
    } 

  }

  //updateFunc(ap_name: any, emp_no: any, event: any, func: any) {
  //  console.log(event.target.value)
  //  for (let aPInfoTable of this.aPInfoTable) {
  //    if (ap_name === aPInfoTable.ap_name) {
  //      for (let aPInfoTableJSON of aPInfoTable.ap_JSON) {
  //        if (aPInfoTableJSON.emp_no == emp_no) {
  //          console.log('matched')
  //          aPInfoTableJSON.ap_argument = event.target.value;
  //          /*console.log(aPInfoTableJSON)*/
  //          this.editAP(aPInfoTable.ap_no);
  //        }
  //        if (aPInfoTableJSON.emp_no != emp_no) {
  //          this.pushJSON(emp_no, ap_name)
  //        }
  //        /*console.log(aPInfoTableJSON)*/


  //      }
  //    }
  //  }
  //}

  pushJSON(emp_no: any, ap_name: any) {
    console.log('Trying to add one') 
    for (let aPInfoTable of this.aPInfoTable) {
      if (aPInfoTable.ap_name === ap_name) {
            console.log('Will add one')        
            aPInfoTable.ap_JSON.push({ "emp_no": emp_no , "ap_rate": "0" })         
        
      }     
    }
    console.log(this.aPInfoTableJSON)
  }


  APInfo: any = {};

  async editAP(ap_no: any) {
    for (let aPInfoTable of this.aPInfoTable) {
      if (aPInfoTable.ap_no == ap_no) {
        this.APInfo.ap_no = ap_no;
        this.APInfo.ap_JSON = JSON.stringify(aPInfoTable.ap_JSON);
        console.log(this.APInfo);
      }        
    }        
      
    this.data.sendApiRequest("editAP", this.APInfo).subscribe((data: any) => {
    });   
     
  }







}
