import { AfterViewInit, ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/PMS/service/data.service';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RouterModule } from '@angular/router';

import { NgxPrintModule } from 'ngx-print';

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';



export interface aPTable {
  ap_no: any;
  ap_name: any;
  ap_JSON: apJSON[];
}

export interface apJSON {
  emp_no: any;
  ap_rate: any;
}


export interface dedTable {
  ded_no: any;
  ded_name: any;
  ded_JSON: dedJSON[];
}

export interface dedJSON {
  emp_no: any;
  ded_rate: any
}

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
  emp_attendance: attendanceTable[];
}

export interface dtrTable {
  dtr_no: any;
  dtr_id: any;
  emp_no: any;
  dtr_content: dtrJSON[];
  dtr_month_year: any;
}

export interface attendanceTable {
  attendanceDate: Date;
  attendanceHour: number;
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




@Component({
  selector: 'app-wagespage',
  templateUrl: './wagespage.component.html',
  styleUrls: ['./wagespage.component.css']
})
export class WagespageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private datepipe: DatePipe, private noti: MatSnackBar, public lowercasepipe: LowerCasePipe, private data: DataService, private router: RouterModule) { }

  @ViewChild('content', { static: false }) es!: ElementRef;

  downloadPDF() {
    let pdf = new jspdf('l', 'px', 'a2');
    pdf.html(this.es.nativeElement, {
      callback: (pdf) => {
        pdf.save("dtr.pdf");
      }
    });
  }




  ngOnInit(): void {
    this.loadDate();
    this.pullAllEmp();
    this.pullAllDTR();
    this.dateIndex = this.monthinNum;
    this.buildTable();

  }

  ngAfterViewInit(): void {
    //this.empInfoTableDataSource.paginator = this.paginator;
    //this.empInfoTableDataSource.sort = this.sort;
  }

  loadDate() {
    this.getDate();
    this.getMonths();
    this.getDaysArray(this.monthinNum);
  }

  //Sets Date Variables

  currentDate: any;
  month: any;
  monthinNum: any;
  year: any;
  monthintText: any;
  month_year: any;
  dateIndex: any;

  getDate() {

    //Sets Date
    this.currentDate = new Date(this.data.getDate());
    console.log(this.currentDate + " From DTR Page: Method getDate");
    //Sets Month and MonthYear Varables
    //gets month in natural number form
    this.monthinNum = this.data.getMonthinNum();
    //gets month in text form
    this.month = this.data.getMonth();
    this.monthintText = this.lowercasepipe.transform(this.month);
    //gets year
    this.year = this.data.getYear();
    //generates monthyear needed in dtr id
    this.month_year = this.monthintText + '_' + this.year;
  }

  //Generate Months Array
  monthsArray: any;
  getMonths() {
    this.monthsArray = this.data.generateMonsArray();
    console.log(this.monthsArray + 'From DTR Page: Method generateMonsArray');
  }

  //Generate Days Array
  dayArray: any;
  getDaysArray(month: number) {
    this.dayArray = this.data.generateDaysArray(month);
    console.log(this.dayArray + 'From DTR Page: Method getDayArray');
  }

  //High Tab
  hightabClick(event: any) {

    // !!! Has one vulnelrabillity still not sure where

    var string = event.tab.textLabel;
    //sets month_year needed by dtr card
    string = string.split(':');
    var month = string[0].replace(/^\s+|\s+$/g, "");
    this.month = month;
    this.monthinNum = event.index;
    //changes active month
    this.monthintText = this.lowercasepipe.transform(this.month);
    console.log(this.monthintText + " From DTR Page: Method hightabClick");
    this.month_year = this.monthintText + '_' + this.year;
    console.log(this.month_year + " From DTR Page: Method hightabClick +++++++++++++++++++++++++");
    //reload arrays of Days
    this.getDaysArray(this.monthinNum);
    //pull dtr not sure why
    this.pullAllDTR();
    this.buildTable();
  }

  changeStartDay(event: any) {

    console.log(event.target.value);
    var day = this.datepipe.transform(event.target.value, 'd');
    console.log(day);
    this.startDay = day;
    this.getLimitedDaysArray(this.monthinNum);
  }

  changeEndDay(event: any) {

    console.log(event.target.value);
    var day = this.datepipe.transform(event.target.value, 'd');
    console.log(day);
    this.endDay = day;
    this.getLimitedDaysArray(this.monthinNum);
  }

  startDay: any = '1';
  endDay: any;


  //Generate Limited Days Array
  getLimitedDaysArray(month: number) {
    this.dayArray = this.data.generateLimitedDaysArray(month, this.startDay, this.endDay);
    console.log(this.dayArray + 'From DTR Page: Method getLimitedDaysArray');
    this.buildTable();

  }


  empInfoTable: empTable[] = [];
  dtrInfoTable: dtrTable[] = [];
  dtrJSONTable: dtrJSON[] = [];

  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  empInfo: any = {};
  dtrInfo: any = {};
  dtrJSONInfo: any = {};
  jsonData: any;

  startDate = this.datepipe.transform(new Date(2021, 6, 26), 'yyyy-MM-dd')

  pullAllDTR() {
    this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
      this.dtrInfoTable = data.payload;

      for (let dtrInfoTable of this.dtrInfoTable) {
        this.jsonData = dtrInfoTable.dtr_content;
        this.dtrJSONTable = JSON.parse(this.jsonData);
        dtrInfoTable.dtr_content = this.dtrJSONTable;
      }
      console.log(this.dtrInfoTable + ' From DTR Page: Method pullAllDTR');
      /*this.appendEmp();*/
      /*this.appendEmp('2021001', this.startDate );*/
    });
  }


  attendanceTableInfo: attendanceTable[] = [];

  

  ////Filter 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empInfoTableDataSource.filter = filterValue;
  }

  //TABLE BUILDER

  attendanceColumns: string[] = [];

  buildTable() {
    this.attendanceColumns = [];
    this.attendanceColumns.push("emp_name");
    this.attendanceColumns.push("daily_rate");
    this.attendanceColumns = this.attendanceColumns.concat(this.dayArray);
    this.pullAllDed();
    this.pullAllAP();
    
    
  }


  aPInfoTable: aPTable[] = [];

  aPInfoTableJSON: apJSON[] = [];

  pullAllAP() {
    this.data.sendApiRequest("pullAllAP", null).subscribe((data: any) => {
      this.aPInfoTable = data.payload;
      console.log(this.aPInfoTable + ' From DTR Page: Method pullAllAP');

      for (let aPInfoTable of this.aPInfoTable) {
        this.jsonData = aPInfoTable.ap_JSON;
        this.aPInfoTableJSON = JSON.parse(this.jsonData);
        aPInfoTable.ap_JSON = this.aPInfoTableJSON;
      }

      for (let aPInfoTable of this.aPInfoTable) {
        this.attendanceColumns.push(aPInfoTable.ap_name);
      }
      this.pushEnding()

    });
  }

  getAPRate(ap_name: any, emp_no: any) {

    var rate: number = 0

    for (let aPInfoTable of this.aPInfoTable) {
      if (aPInfoTable.ap_name == ap_name) {
        for (let aPInfoTableJSON of aPInfoTable.ap_JSON) {
          if (emp_no == aPInfoTableJSON.emp_no) {
            rate = aPInfoTableJSON.ap_rate
          }
        }
      }
    }

    if (rate != rate) {
      rate = 0
    }

    return (rate)
  }

  dedInfoTable: dedTable[] = [];
  dedInfoTableJSON: dedJSON[] = [];


  pullAllDed() {
    this.data.sendApiRequest("pullAllDed", null).subscribe((data: any) => {
      console.log(data.payload)
      this.dedInfoTable = data.payload;

      for (let dedInfoTable of this.dedInfoTable) {
        this.jsonData = dedInfoTable.ded_JSON;
        this.dedInfoTableJSON = JSON.parse(this.jsonData);
        dedInfoTable.ded_JSON = this.dedInfoTableJSON;
      }

      for (let dedInfoTable of this.dedInfoTable) {
        this.attendanceColumns.push(dedInfoTable.ded_name);
      }

      
    });
  }

  getDedRate(ded_name: any, emp_no: any) {

    var rate: number = 0

    for (let dedInfoTable of this.dedInfoTable) {
      if (dedInfoTable.ded_name == ded_name) {
        for (let dedInfoTableJSON of dedInfoTable.ded_JSON) {
          if (emp_no == dedInfoTableJSON.emp_no) {
            rate = dedInfoTableJSON.ded_rate
          }
        }
      }
    }

    if (rate != rate) {
      rate = 0
    }
    return (rate)
  }

  pushEnding() {
    this.attendanceColumns.push("total_wage");
    this.attendanceColumns.push("total_salary");
  }


  //Pull Emp Data
  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      this.empInfoTable = data.payload;
      console.log(this.empInfoTable);
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource + ' From Dashboard Page: Method pullAllEmp');
    });
  }


  //Calculations

  //COMMENTS HERE ARE SOOO LONG

  getHours(emp_no: any, date: any) {
    for (let dtrInfoTable of this.dtrInfoTable) {
      if (dtrInfoTable.emp_no == emp_no) {
        var attendanceDate: Date;
        var attendanceHour: number;

        for (let dtrContent of dtrInfoTable.dtr_content) {
          attendanceDate = dtrContent.date
          attendanceHour = dtrContent.mhrs
          if (attendanceDate === date) {
            if (attendanceHour < 0) {
              attendanceHour = -1
            }
            return <any>(attendanceHour)
          }
        }
        ; break
      }
    }
  }

  getDailyRate(rate: number) {
    var daily;
    daily = rate * 8;
    return (daily);
  }

  getWage(hours: any, rate: any) {
    var wage;
    wage = hours * rate;
    if (wage != wage) {
      wage = 0;
    }
    if (wage < 0) {
      wage = 0;
    }
    return <any>(wage);
  }  

  currentTotal: number = 0;

  addtoTotal(value: number) {
    if (value != value) {
      value = 0;
    }
    this.currentTotal = this.currentTotal + value;
  }

  totalWage: number = 0;

  getTotalWage() {
    this.totalWage = this.currentTotal;
    if (this.totalWage != this.totalWage) {
      this.totalWage = 0;
    }
    return (this.totalWage)
  }  

  difference: number = 0;

  addtoWage(number: any) {
    this.difference = this.difference + number;
  }

  subtracttoWage(number: any) {
    this.difference = this.difference - number;
  }

  totalSalary: number = 0

  getTotalSalary() {
    this.totalSalary = this.totalWage + this.difference;    

    if (this.totalWage != this.totalWage) {
      this.totalWage = 0;
    }

    return (this.totalSalary)
  }  

  resetCalc() {

    this.totalWage = 0
    this.currentTotal = 0;
    this.difference = 0;

  }  

  currentGrossTotal: number = 0;

  addToGrossTotal(value: number) {

    if (value != value) {
      value = 0;
    }
    this.currentGrossTotal = this.currentGrossTotal + value;
  }

  getGrossTotal() {
    var grossTotal = this.currentGrossTotal
    return (grossTotal)   
  }

  resetGrossTotal() {
    this.currentGrossTotal = 0;
  }



  ////Summate Hour, Needs Better Implementation

  //totalHours = 0;

  ////Reads per line needs to improve further

  //addtoTotal(hour: any, id: any) {
  //  //this.totalHours = this.totalHours + hour;
  //  //console.log(this.totalHours + ' From Dashboard Page: Method addtoTotal');
  //}

  //getTotalHours(id: any) {
  //  //var total;
  //  //total = this.totalHours;
  //  //this.totalHours = 0;
  //  //return total;
  //}

  //pullAllAtt() {
  //  this.data.sendApiRequest("pullAllAtt", null).subscribe((data: any) => {
  //    this.attInfoTable = data.payload;
  //    this.attInfoTableDataSource = new MatTableDataSource(this.attInfoTable);
  //    console.log(this.attInfoTable + ' From Dashboard Page: Method pullAllAtt');
  //  });
  //}



  //notify() {
  //  this.noti.open("hello", "ok");
  //  console.log("Index Running")
  //}








}




