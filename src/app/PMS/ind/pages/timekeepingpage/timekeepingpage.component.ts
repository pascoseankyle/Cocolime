import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/DTR/service/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe, LowerCasePipe, Time } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
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
}

export interface dtrTable {
  dtr_no: any;
  dtr_id: any;
  emp_no: any;
  dtr_content: dtrJSON [];
  dtr_month_year: any;
}

export interface dtrJSON {
  date: any;
  am_time_in: any;
  am_time_out: any;
  pm_time_in: any;
  pm_time_out: any;
  ot_time_in: any;
  ot_time_out: any;
  mhrs: any;
  remarks: any;
}

@Component({
  selector: 'app-timekeepingpage',
  templateUrl: './timekeepingpage.component.html',
  styleUrls: ['./timekeepingpage.component.css']
})
export class TimekeepingpageComponent implements OnInit {

  //CONSTRUCTORS

  constructor(private data: DataService, public datepipe: DatePipe, public lowercasepipe: LowerCasePipe, public snackbar: MatSnackBar) { }

  //ViewChild

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //Pakirename to into something na may context



  @ViewChild('content', { static: false }) es!: ElementRef;

  downloadPDF() {
    let pdf = new jspdf('p', 'px', [1500, 2000]);
    pdf.html(this.es.nativeElement,{
      callback: (pdf)=> {
        pdf.save("employees.pdf");
      }
    });
  }  
  //ngLifeCycle Goes Here

  ngOnInit(): void {
    this.loadDate();
    this.pullAllEmp();
    this.pullAllDTR();
    this.dateIndex = this.monthinNum;

  }

  ngAfterViewInit() {
    this.empInfoTableDataSource.paginator = this.paginator;
    this.empInfoTableDataSource.sort = this.sort;
  }

  //ngOnInit Functions

  //Set Date Functions

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
    //changes active month
    this.monthinNum = event.index
    console.log(this.monthinNum + " From DTR Page: Method hightabClick");
    this.monthintText = this.lowercasepipe.transform(this.month);
    console.log(this.monthintText + " From DTR Page: Method hightabClick");
    this.month_year = this.monthintText + '_' + this.year;
    console.log(this.month_year + " From DTR Page: Method hightabClick +++++++++++++++++++++++++");
    //change date index
    this.dateIndex = this.monthinNum
    //reload arrays of Days
    this.getDaysArray(this.monthinNum);
    //pull dtr not sure why
    this.pullAllDTR();
  }

  tabClick(event: any) {

    //Small Buttons Sa taas
    var string = event.tab.textLabel;
    string = string.split(':');
    var emp_no = string[0].replace(/^\s+|\s+$/g, "");
    console.log(emp_no + 'From DTR Page: Method tabClick');
    this.activeEmp = emp_no;
    this.pullAllDTR();
  }

  empInfoTable: empTable[] = [];
  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);
  dtrInfoTable: dtrTable[] = [];
  dtrJSONTable: dtrJSON[] = [];

  empInfo: any = {};
  dtrInfo: any = {};
  dtrJSONInfo: any = {};

  //Pull Employees

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      console.log("PULLING DATA");
      this.empInfoTable = data.payload;
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource.data);
      console.log("DATA PULLED")
    });
  }


  pullAllDTR() {
    this.data.sendApiRequest("pullAllDTR", null).subscribe((data: any) => {
      this.dtrInfoTable = data.payload;
      console.log(this.dtrInfoTable + ' From DTR Page: Method pullAllDTR');
      this.pullDTR(this.activeEmp)
      console.log(this.activeEmp + ' From DTR Page: Method pullAllDTR');
    });
  }

  //Pull DTR Contents
  jsonData: any;
  activeEmp: any;
  hasDTRbool: any;

  pullDTR(emp_no: string) {
    this.activeEmp = emp_no;
    console.log(emp_no + ' From DTR Page: Method pullDTRContents');
    this.dtrJSONTable = [];
    this.hasDTRbool = false;

    for (let dtrInfoTable of this.dtrInfoTable) {
      console.log(emp_no + '_' + this.month_year);
      if (dtrInfoTable.dtr_id === emp_no + '_' + this.month_year) {
        console.log('MAAAAAAAAATCH   ' + dtrInfoTable.dtr_id)
        this.hasDTRbool = true;
        this.jsonData = dtrInfoTable.dtr_content;
        this.dtrJSONTable = JSON.parse(this.jsonData);
        console.log(this.dtrJSONTable + ' From DTR Page: Method pullDTRContents');
        break;
      } else {
        console.log('NO MAAAAAAAAATCH   ' + dtrInfoTable.dtr_id)
      }
    }
  }  

  generateDTR(emp_no: string) {
    this.addemptyDTR();
  }  

  async addemptyDTR() {
    console.log(this.activeEmp + '_' + this.month_year)
    //DTR INFO
    this.dtrJSONTable = [];
    this.dtrInfo = {};
    this.dtrInfo.emp_no = this.activeEmp;
    this.dtrInfo.dtr_month_year = this.month_year;
    this.dtrInfo.dtr_id = this.activeEmp + '_' + this.month_year;
    for (let dayArray of this.dayArray) {
      this.dtrJSONInfo = {
        date: dayArray,
        am_time_in: '',
        am_time_out: '',
        pm_time_in: '',
        pm_time_out: '',
        ot_time_in: '',
        ot_time_out: '',
        mhrs: 0,
        remarks: 'none',
      };
      this.dtrJSONTable.push(this.dtrJSONInfo)
      console.log(JSON.stringify(this.dtrJSONInfo + ' From DTR Page: Method addemptyDTR'));
    }
    console.log(this.dtrJSONTable);
    this.dtrInfo.dtr_content = JSON.stringify(this.dtrJSONTable);
    console.log(this.dtrInfo + ' From DTR Page: Method addEmp');
    this.data.sendApiRequest("addDTR", this.dtrInfo).subscribe((data: any) => {
      this.ngOnInit();
    });    

  }

  //Edit DTR
  async editDTR(dtrJSON: any, dtr_id: any) {

    this.dtrInfo.dtr_id = dtr_id;
    this.dtrInfo.dtr_content = JSON.stringify(dtrJSON)
    this.data.sendApiRequest("editDTR", this.dtrInfo).subscribe((data: any) => {
    });
  }

  updateList(dtr_id: any, event: any, argument: string, date: any) {
    console.log(event +  'From DTR Page: Method updateList');
    for (let dtrJSONTable of this.dtrJSONTable) {
      if (dtrJSONTable.date == date) {
        console.log('Date Matched');
        switch (argument) {
          case "am_time_in": {
            dtrJSONTable.am_time_in = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "am_time_out": {
            dtrJSONTable.am_time_out = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "pm_time_in": {
            dtrJSONTable.pm_time_in = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "pm_time_out": {
            dtrJSONTable.pm_time_out = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "ot_time_in": {
            dtrJSONTable.ot_time_in = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "ot_time_out": {
            dtrJSONTable.ot_time_out = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "mhrs": {
            dtrJSONTable.mhrs = event.target.value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "remarks": {
            dtrJSONTable.remarks = event.target.value;
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
  dtrJSONTableCopy: any;

  updateRemark(dtr_id: any, value: any, argument: string, date: any) {
    this.dtrJSONTableCopy = this.dtrJSONTable
    for (let dtrJSONTableCopy of this.dtrJSONTableCopy) {
      if (dtrJSONTableCopy.date == date) {
        console.log('Date Matched');
        switch (argument) {
          
          case "ot_time_in": {
            dtrJSONTableCopy.ot_time_in = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "ot_time_out": {
            dtrJSONTableCopy.ot_time_out = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "mhrs": {
            dtrJSONTableCopy.mhrs = value;
            console.log(argument + ': Argumments From DTR Page: Method updateList');
            break;
          }
          case "remarks": {
            dtrJSONTableCopy.remarks = value;
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
    this.editDTR(this.dtrJSONTableCopy, dtr_id);
  }

  am_time_in: any;
  am_time_out: any;
  pm_time_in: any;
  pm_time_out: any;
  ot_time_in: any;
  ot_time_out: any;

  setam_time_in(time: any) {
    if (time == '') {
      time = '0';
    }
    this.am_time_in = time;
  }
  setam_time_out(time: any) {
    if (time == '') {
      time = '0';
    }
    this.am_time_out = time;
  }
  setpm_time_in(time: any) {
    if (time == '') {
      time = '1';
    }
    this.pm_time_in = time;
  }
  setpm_time_out(time: any) {
    if (time == '') {
      time = '1';
    }
    this.pm_time_out = time;
  }


  setot_time_in(time: any) {
    if (time == '') {
      time = '0';
    }
    this.ot_time_in = time;
  }
  setot_time_out(time: any) {
    if (time == '') {
      time = '0';
    }
    this.ot_time_out = time;
  }

  //Implement Round Up Policy Here
  gethour(time: string, is_am: any) {
    var hour_minute = time.split(':');

    var hour = parseInt(hour_minute[0]);
    var minute = parseInt(hour_minute[1]) / 60;

    if (minute != minute) {
      minute = 0;
    }

    hour = hour + minute;
    return (hour);
  }

  computehrs(dtr_id: any, date: any, mhrs: any) {

    var am_total = this.gethour(this.am_time_out, 'am') - this.gethour(this.am_time_in, 'am'); 
    this.am_time_in = 0;
    this.am_time_out = 0;

    var pm_total = this.gethour(this.pm_time_out, 'pm') - this.gethour(this.pm_time_in, 'pm');
    this.pm_time_in = 0;
    this.pm_time_out = 0;

    if (am_total != am_total) {
      am_total = 0;
    }

    if (pm_total != pm_total) {
      pm_total = 0;
    }

    //if (ot_total != ot_total) {
    //  ot_total = 0;
    //}

    /*console.log(mhrs+'xxxxxxxxxxxxxxxxxxxx')*/

    var total = am_total + pm_total

    total = Math.floor(total);


    if (total == -1) {
      total = total + 1;
    }

    if (mhrs != total) {
      console.log('no matched ---------- xxxxxxxxxxxxxxxxxxxx');
      this.updateRemark(dtr_id, total, 'mhrs', date);
    }

    /*this.updateRemark(dtr_id, total, 'mhrs', date);*/

    return (total);
  }

  //Filter Employees

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;   

    if ((event.target as HTMLInputElement).value === "") {
      console.log("No Filter")
      this.ngOnInit();
    }

    this.empInfoTableDataSource.filter = filterValue;
    this.empInfoTableDataSource.data = this.empInfoTableDataSource.filteredData
  }

  //SnackBar

  notify(message: string, action: string) {
    this.snackbar.open(message, action, { duration: 3000 });
  }






















  

}
