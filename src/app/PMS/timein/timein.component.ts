import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/DTR/service/data.service';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

export interface empTable {
  emp_no: any;
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
  dtr_no: any;
  dtr_id: any;
  emp_id: any;
  dtr_content: JSON;
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

export interface settings {
  setting_name: any;
  setting_args: any;
}


@Component({
  selector: 'app-timein',
  templateUrl: './timein.component.html',
  styleUrls: ['./timein.component.css']
})
export class TimeinComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private data: DataService, public datepipe: DatePipe, public lowercasepipe: LowerCasePipe) { }

  ngOnInit(): void {
    this.getDate();
    this.pullAllEmp();
    this.pullAllDTR();
    this.pullSettings();

    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  settingsInfo: settings[] = [];

  pullSettings() {
    this.data.sendApiRequest("pullASetting", null).subscribe((data: any) => {
      this.settingsInfo = data.payload;
      console.log(this.dtrInfoTable + ' From DTR Page: Method pullSetting');
    });
  }

  time = new Date();
  intervalId: any;
  subscription!: Subscription;

  //Set Date Functions

  currentDate: any;
  month: any;
  monthinNum: any;
  year: any;
  monthintText: any;
  month_year: any;



  //Sets Date Variables
  getDate() {

    //Sets Date
    this.currentDate = new Date(this.data.getDate());
    console.log(this.currentDate + " From DTR Page: Method getDate");
    //Sets Month and MonthYear Var
    this.monthinNum = this.data.getMonthinNum();
    this.month = this.data.getMonth();
    console.log(this.month + " From DTR Page: Method getDate ++++++++++++++++++");
    this.monthintText = this.lowercasepipe.transform(this.month);
    console.log(this.monthintText + " From DTR Page: Method getDate");
    this.year = this.data.getYear();
    this.month_year = this.monthintText + '_' + this.year;
    console.log(this.month_year + " From DTR Page: Method getDate");
  }

  emp_id: any;

  empInfoTable: empTable[] = [];
  dtrInfoTable: dtrTable[] = [];
  dtrJSONTable: dtrJSON[] = [];

  empInfo: any = {};
  dtrInfo: any = {};
  dtrJSONInfo: any = {};


  //Pull Emps
  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable + ' From TimeIn Page: Method pullAllEmp');
    });
  }


  //Pull DTR
  pullAllDTR() {
    this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
      this.dtrInfoTable = data.payload;
      console.log(this.dtrInfoTable + ' From DTR Page: Method pullAllDTR');
    });
  }

  //Pull DTR Contents
  jsonData: any;

  onClickEditDTR(emp_no: string, value: any, argument: any) {
    console.log(emp_no + '_' + this.month_year + ' From DTR Page: Method pullDTRContents');
    this.dtrJSONTable = [];

    for (let dtrInfoTable of this.dtrInfoTable) {
      console.log(emp_no + '_' + this.month_year);
      if (dtrInfoTable.dtr_id === emp_no + '_' + this.month_year) {
        console.log('MAAAAAAAAATCH' + dtrInfoTable.dtr_id)
        this.jsonData = dtrInfoTable.dtr_content;
        this.dtrJSONTable = JSON.parse(this.jsonData);
        console.log(this.dtrJSONTable + ' From DTR Page: Method pullDTRContents');
        this.updateList(dtrInfoTable.dtr_id, value, argument, this.datepipe.transform(this.currentDate, 'yyyy-MM-dd'));
        ; break
      } else {
        console.log('NO MAAAAAAAAATCH' + dtrInfoTable.dtr_id)
      }
    }
  }

  //onTimeClick

  onTimeClick(input_emp_id: any, argument: any) {
    console.log(input_emp_id)
    
    var time = this.datepipe.transform(this.time, 'h:mm');
    var isAMorPM = this.datepipe.transform(this.time, 'a');
    console.log(isAMorPM);

    var mString;

    if (isAMorPM == 'AM') {
      mString = 'am'
    }
    if (isAMorPM == 'PM') {
      mString = 'pm'
    }

    var argString = mString + '_' + argument;

    console.log(mString + '_' + argument)

    for (let empInfoTable of this.empInfoTable) {
      if (empInfoTable.emp_id === input_emp_id) {
        this.openSnackBar('Match Found' + input_emp_id + 'has been entered', 'ok');
        console.log('Match Found');
        this.onClickEditDTR(empInfoTable.emp_no, time, argString);


        ; break
      }
      else {
        console.log('No Match Found ')
      }
    }
  }

  //Edit DTR
  async editDTR(dtrJSON: any, dtr_id: any) {

    this.dtrInfo.dtr_id = dtr_id;
    this.dtrInfo.dtr_content = JSON.stringify(dtrJSON)
    this.data.sendApiRequest("editDTR", this.dtrInfo).subscribe((data: any) => {
    });
  }

  updateList(dtr_id: any, value: any, argument: string, date: any) {
    console.log(dtr_id, value, argument, date + '+++++++++ From DTR Page: Method updateList');

    for (let dtrJSONTable of this.dtrJSONTable) {
      if (dtrJSONTable.date == date) {
        console.log('Date Matched');
        switch (argument) {
          case "am_time_in": {
            dtrJSONTable.am_time_in = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "am_time_out": {
            dtrJSONTable.am_time_out = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "pm_time_in": {
            dtrJSONTable.pm_time_in = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "pm_time_out": {
            dtrJSONTable.pm_time_out = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "ot_time_in": {
            dtrJSONTable.ot_time_in = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "ot_time_out": {
            dtrJSONTable.ot_time_out = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }

          default: {
            console.log(argument + ': No Valid Argumments From DTR Page: Method updateList');
            break;
          }
        }
      }
    }
    this.editDTR(this.dtrJSONTable, dtr_id);
  }



}
