import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/DTR/service/data.service';
import { DatePipe, Time } from '@angular/common';
import { LowerCasePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import jspdf from 'jspdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

//INTERFACES

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
  selector: 'app-attendancepage',
  templateUrl: './attendancepage.component.html',
  styleUrls: ['./attendancepage.component.css']
})
export class AttendancepageComponent implements OnInit, AfterViewInit {


  @ViewChild('content', { static: false }) es!: ElementRef;

  downloadPDF() {
    let pdf = new jspdf('p', 'px', [1500, 2000]);
    pdf.html(this.es.nativeElement,{
      callback: (pdf)=> {
        pdf.save("employees.pdf");
      }
    });
  }  
  
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  


  constructor(private datepipe: DatePipe, private noti: MatSnackBar, public lowercasepipe: LowerCasePipe, private data: DataService, private router: RouterModule) { }

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

  empInfoTable: empTable[] = [];
  dtrInfoTable: dtrTable[] = [];
  dtrJSONTable: dtrJSON[] = [];

  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  empInfo: any = {};
  dtrInfo: any = {};
  dtrJSONInfo: any = {};  
  jsonData: any;

  startDate = this.datepipe.transform(new Date(2021, 6, 26),'yyyy-MM-dd')

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

  getHours(emp_no: any, date: any) {
    /*console.log(emp_no)*/
    for (let dtrInfoTable of this.dtrInfoTable) {
        if (dtrInfoTable.emp_no == emp_no) {
          /*console.log('Match Found')*/
          
          var attendanceDate: Date;
          var attendanceHour: number;

          for (let dtrContent of dtrInfoTable.dtr_content) {
            attendanceDate = dtrContent.date
            attendanceHour = dtrContent.mhrs
            if (attendanceDate === date) {
              //console.log('Match Found--------------------------------')
              //console.log(attendanceDate)
              //console.log(attendanceHour)

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
    this.attendanceColumns = this.attendanceColumns.concat(this.dayArray);
    this.attendanceColumns.push("total");
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

  currentTotal: number = 0;

  addtoTotal(value: number) {

    if (value != value) {
      value = 0;
    }

    /*console.log(value);*/
    this.currentTotal = this.currentTotal + value;
    /*console.log(this.currentTotal);*/

  }

  total!: number  


  getTotal() {
    this.total = this.currentTotal;
    this.currentTotal = 0;
    if (this.total != this.total) {
      this.total = 0;
    }
    return(this.total)
  }







  //notify() {
  //  this.noti.open("hello", "ok");
  //  console.log("Index Running")
  //}






}
