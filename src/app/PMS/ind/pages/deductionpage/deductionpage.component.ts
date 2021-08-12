import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/DTR/service/data.service';


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

export interface dedTable {
  ded_no: any;
  ded_name: any;
  ded_JSON: dedJSON[];
}

export interface dedJSON {
  emp_no: any;
  ded_rate: any;
}

@Component({
  selector: 'app-deductionpage',
  templateUrl: './deductionpage.component.html',
  styleUrls: ['./deductionpage.component.css']
})
export class DeductionpageComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.pullAllEmp();
    this.pullAllDed();
    

  }

  dedInfoTable: dedTable[] = [];
  dedInfoTableJSON: dedJSON[] = [];

  jsonData: any;

  pullAllDed() {
    this.data.sendApiRequest("pullAllDed", null).subscribe((data: any) => {
      console.log(data.payload)
      this.dedInfoTable = data.payload;

      for (let dedInfoTable of this.dedInfoTable) {
        this.jsonData = dedInfoTable.ded_JSON;
        this.dedInfoTableJSON = JSON.parse(this.jsonData);
        dedInfoTable.ded_JSON = this.dedInfoTableJSON;
      }

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


  getDedRate(ded_name: any, emp_no: any) {

    var rate = 0

    for (let dedInfoTable of this.dedInfoTable) {
      if (dedInfoTable.ded_name == ded_name) {
        for (let dedInfoTableJSON of dedInfoTable.ded_JSON) {
          if (emp_no == dedInfoTableJSON.emp_no) {
            rate = dedInfoTableJSON.ded_rate
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

    for (let dedInfoTable of this.dedInfoTable) {
      console.log('xxxxxxxxxxxxxxxxxxxxxxx')
      if (ap_name === dedInfoTable.ded_name) {
        for (let aPInfoTableJSON of dedInfoTable.ded_JSON) {
          /*console.log(ap_name, emp_no, event.target.value)*/
          if (aPInfoTableJSON.emp_no == emp_no) {
            console.log('matched')
            aPInfoTableJSON.ded_rate = event.target.value;
            this.editAP(dedInfoTable.ded_no);
            console.log(aPInfoTableJSON)
            hasMatch = true
          }
          console.log(dedInfoTable.ded_JSON)
        }

      }
    }
    if (hasMatch == false) {
      console.log('NO matched xxxxxxxxxxxxxxxxxxxxxxxx')
      this.pushJSON(emp_no, ap_name)
    }

  }

  pushJSON(emp_no: any, ded_name: any) {
    console.log('Trying to add one')
    for (let dedInfoTable of this.dedInfoTable) {
      if (dedInfoTable.ded_name === ded_name) {
        console.log('Will add one')
        dedInfoTable.ded_JSON.push({ "emp_no": emp_no, "ded_rate": "0" })

      }
    }
    console.log(this.dedInfoTableJSON)
  }


  dedInfo: any = {};

  async editAP(ded_no: any) {
    for (let aPInfoTable of this.dedInfoTable) {
      if (aPInfoTable.ded_no == ded_no) {
        this.dedInfo.ded_no = ded_no;
        this.dedInfo.ded_JSON = JSON.stringify(aPInfoTable.ded_JSON);
        console.log(this.dedInfo);
      }
    }

    this.data.sendApiRequest("editDed", this.dedInfo).subscribe((data: any) => {
    });

  }





}
