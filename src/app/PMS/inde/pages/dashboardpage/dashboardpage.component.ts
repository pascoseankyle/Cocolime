import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/DTR/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { DatePipe, Time, LowerCasePipe } from '@angular/common';
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
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardpageComponent implements OnInit {


  empInfoTable: empTable[] = [];
  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);


  constructor(public datepipe: DatePipe, private snackBar: MatSnackBar, private data: DataService, public lowercasepipe: LowerCasePipe,) { }

  ngOnInit(): void {
    
    this.getDate();
    this.pullAllEmp();
  }

  //Set Date Functions

  currentDate: any;
  month: any;
  monthinNum: any;
  year: any;
  monthintText: any;
  month_year: any;
  dateIndex: any;
  calenderBreak: any;

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
    //Generate Days
    this.getDaysArray(this.monthinNum);
    //Sets Tab Index
    this.dateIndex = this.monthinNum;
  }


  //Generate Days Array
  dayArray: any;
  getDaysArray(month: number) {
    this.dayArray = this.data.generateDaysArray(month);
    console.log(this.dayArray + 'From DTR Page: Method getDayArray');
    this.calenderPrend();
  }

  //Calender Prend
  weekStart: any;
  weekPrep: any = [];
  calenderPrend() {
    this.weekStart = this.datepipe.transform(this.dayArray[0], 'E');
    console.log(this.weekStart + 'From DTR Page: Method getDayArray');

    switch (this.weekStart) {
      case ('Sun'):
        this.weekPrep = [];
        break;
      case ('Mon'):
        this.weekPrep = [1];
        break;
      case ('Tue'):
        this.weekPrep = [1,2];
        break;
      case ('Wed'):
        this.weekPrep = [1, 2, 3];
        break;
      case ('Thu'):
        this.weekPrep = [1, 2, 3, 4];
        break;
      case ('Fri'):
        this.weekPrep = [1, 2, 3, 4, 5];
        break;
      case ('Sat'):
        this.weekPrep = [1, 2, 3, 4, 5, 6];
        break;
      default:
    }

    console.log(this.weekPrep)
  }

  //Generate Months Array
  monthsArray: any;
  getMonsArray() {
    this.monthsArray = this.data.generateMonsArray();
    console.log(this.monthsArray + 'From DTR Page: Method generateMonsArray');
  }  

  //pull AllEmp

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      this.empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);
      console.log(this.empInfoTable + ' From Dashboard Page: Method pullAllEmp');
      this.empNumber()
    });
  }

  //empDami
  empDami: any; 

  empNumber() {
    this.empDami = this.empInfoTable.length;
    console.log(this.empDami + ' From Dashboard Page: Method pullAllEmp');
  }


  tableData:any = [
    {firstN : 'Cyril', middleN : 'Jivan', lastN: 'Balatbat'},
    {firstN : 'Cyril', middleN : 'Jivan', lastN: 'Balatbat'}
  ]
}
