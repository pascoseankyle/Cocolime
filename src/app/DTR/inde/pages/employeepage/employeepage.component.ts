import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit, TemplateRef } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';

//INTERFACE


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
  emp_rate: any;
  emp_position: any;
  emp_start_date: any;
  emp_status: any;
  emp_last_mod_date: any;
  emp_last_mod_by: any;
}

export interface empTableColumnProp {
  columnName: any;
  columnPrettyName: any;
  columnisSticky: boolean;
}

@Component({
  selector: 'app-employeepage',
  templateUrl: './employeepage.component.html',
  styleUrls: ['./employeepage.component.css']
})

export class EmployeepageComponent implements OnInit {

  showMe: boolean = true

  toogleTag() {
    this.showMe = !this.showMe
  }
  //Constructors Here

  constructor(private data: DataService, private datepipe: DatePipe, private snackbar: MatSnackBar, public dialog: MatDialog) { }

  //View Child Goes Here

  @ViewChild('content', { static: false }) es!: ElementRef;

  downloadPDF() {
    let pdf = new jspdf('p', 'px', [1500, 2000]);
    pdf.html(this.es.nativeElement, {
      callback: (pdf) => {
        pdf.save("listofemployees.pdf");
      }
    });
  }


  @ViewChild('modalcontent', { static: false }) as!: ElementRef;

  download() {
    let pdf = new jspdf('p', 'mm', [2000, 1500]);
    pdf.html(this.as.nativeElement, {
      callback: (pdf) => {
        pdf.save("individualemployee.pdf");
      }
    });
  }

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //ngLifeCycle Goes Here

  ngOnInit(): void {
    this.getUser();
    this.pullAllEmp();
  }

  ngAfterViewInit() {
    this.empInfoTableDataSource.paginator = this.paginator;
    this.empInfoTableDataSource.sort = this.sort;
  }

  //ngOnInitFunctions

  //Get User Credentials

  user: any;

  getUser() {
    this.user = localStorage.getItem('Name');
  }

  //Pull Employees

  empInfoTable: empTable[] = [];
  empInfoTableDataSource = new MatTableDataSource(this.empInfoTable);

  pullAllEmp() {
    this.data.sendApiRequest("pullAllEmp", null).subscribe((data: any) => {
      console.log("PULLING DATA");
      this.empInfoTable = data.payload;
      this.empInfoTableDataSource.data = this.empInfoTable;
      console.log(this.empInfoTableDataSource.data);
      console.log("DATA PULLED")
    });
  }

  //Main Table Functions

  //Table Columns Properties

  empInfoTableColumnsJSON: empTableColumnProp[] = [
    { "columnName": "emp_name", "columnPrettyName": "Employee Name", "columnisSticky": true, },
    { "columnName": "emp_firstname", "columnPrettyName": "FIRST NAME", "columnisSticky": true, },
    { "columnName": "emp_lastname", "columnPrettyName": "LAST NAME", "columnisSticky": true, },
    { "columnName": "emp_no", "columnPrettyName": "EMP NO", "columnisSticky": false, },
    { "columnName": "emp_id", "columnPrettyName": "EMP ID", "columnisSticky": false, },
    { "columnName": "emp_middle", "columnPrettyName": "MIDDLE", "columnisSticky": false, },
    { "columnName": "emp_address", "columnPrettyName": "ADDRESS", "columnisSticky": false, },
    { "columnName": "emp_sex", "columnPrettyName": "SEX", "columnisSticky": false, },
    { "columnName": "emp_datebirth", "columnPrettyName": "DATE OF BIRTH", "columnisSticky": false, },
    { "columnName": "emp_contact", "columnPrettyName": "CONTACT INFO", "columnisSticky": false, },
    { "columnName": "emp_time_in", "columnPrettyName": "TIME-IN", "columnisSticky": false, },
    { "columnName": "emp_time_out", "columnPrettyName": "TIME-OUT", "columnisSticky": false, },
    { "columnName": "emp_department", "columnPrettyName": "DEPARTMENT", "columnisSticky": false, },
    { "columnName": "emp_rate", "columnPrettyName": "RATE", "columnisSticky": false, },
    { "columnName": "emp_start_date", "columnPrettyName": "DATE STARTED", "columnisSticky": false, },
    { "columnName": "emp_status", "columnPrettyName": "STATUS", "columnisSticky": false, },
    { "columnName": "emp_position", "columnPrettyName": "POSITION", "columnisSticky": false, },
    { "columnName": "emp_last_mod_date", "columnPrettyName": "DATE LAST MODIFIED", "columnisSticky": false, },
    { "columnName": "emp_last_mod_by", "columnPrettyName": "LAST MODIFIED BY", "columnisSticky": false, },
    { "columnName": "emp_is_archived", "columnPrettyName": "ARCHIVE STATUS", "columnisSticky": false, },
  ]

  //Table Columns

  empInfoTableColumns: string[] = [
    "emp_firstname",
    "emp_lastname",
    "emp_id",
    "emp_status",
    "emp_address",
    "emp_sex",
    "emp_datebirth",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_start_date",
    "emp_time_in",
    "emp_time_out",
    "actions"
  ]

  //Maximized Table Columns

  maxTableSize: string[] = [
    "emp_firstname",
    "emp_lastname",
    "emp_no",
    "emp_id",
    "emp_status",
    "emp_address",
    "emp_sex",
    "emp_datebirth",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_start_date",
    "emp_time_in",
    "emp_time_out",
    "emp_last_mod_date",
    "emp_last_mod_by",
    "actions"
  ]

  //Minimized Table Columns
  minTableSize: string[] = [
    "emp_firstname",
    "emp_lastname",
    "emp_id",
    "emp_status",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_time_in",
    "emp_time_out",
    "actions"
  ]


  //Default Table Columns
  defaultTableSize: string[] = [
    "emp_firstname",
    "emp_lastname",
    "emp_id",
    "emp_status",
    "emp_address",
    "emp_sex",
    "emp_datebirth",
    "emp_contact",
    "emp_position",
    "emp_department",
    "emp_rate",
    "emp_start_date",
    "emp_time_in",
    "emp_time_out",
    "actions"
  ]

  //Table Functions

  empInfo: any = {};
  startDate = new Date(1995, 8, 27);
  tabIndex = 0;


  //EMPLOYEE OPERATION

  //////////////////////////////////// DO NOT COPY ////////////////////////////////////////////////
  //////////////////////////////////// DO NOT COPY ////////////////////////////////////////////////
  //////////////////////////////////// DO NOT COPY ////////////////////////////////////////////////

  //Add Employees

  async addEmp() {
    var last_emp_no = this.empInfoTable[this.empInfoTable.length - 1].emp_no + 1;
    this.empInfo = {}
    this.empInfo.emp_start_date = this.startDate;
    this.empInfo.emp_datebirth = this.startDate;
    this.empInfo.emp_id = (this.data.genID(last_emp_no));
    this.empInfo.emp_last_mod_by = this.user;
    this.empInfo.emp_time_in = '00:00'
    this.empInfo.emp_time_out = '00:00'
    console.log(this.empInfo + ' From Employee Page: Method addEmp');
    this.data.sendApiRequest("addEmp", this.empInfo).subscribe((data: any) => {
      this.ngOnInit();
      this.notify('BLANK ENTRY ADDED', 'OK')
    });
  }


  //Rapid Edit Logic
  updateList(no: string, property: string, event: any) {

    console.log(event + 'From Employees Page: Method updateList');
    console.log(event.target.value, property, no + 'From Employees Page: Method updateList');

    //Improve Null Value Check
    if (event.target.value != "") {
      for (let empInfoTable of this.empInfoTable) {
        if (empInfoTable.emp_no == no) {
          console.log(empInfoTable.emp_no + ' From Employees Page: Method updateList');
          switch (property) {
            case "emp_id": {
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_id = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_firstname": {
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_firstname = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_lastname": {
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_lastname = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_address": {
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_address = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_sex": {
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_sex = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_datebirth": {
              console.log(event.target.value + ' ------------From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_datebirth = this.datepipe.transform(event.target.value, 'yyyy-M-d');
              console.log('Date:' + this.empInfo.emp_datebirth + 'From Employees Page: Method updateList');
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_contact": {
              console.log(event.target.value + ' ------------From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_contact = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_department": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_department = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_position": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_position = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_start_date": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_start_date = this.datepipe.transform(event.target.value, 'yyyy-M-d');
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_status": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_status = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_time_in": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_time_in = event.target.value + ':00';
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_time_out": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_time_out = event.target.value + ':00';
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            case "emp_rate": {
              console.log(event.target.value + 'From Employees Page: Method updateList');
              console.log('Arguments:' + property + 'From Employees Page: Method updateList');
              this.empInfo = {};
              this.empInfo.emp_no = no;
              this.empInfo.emp_rate = event.target.value;
              console.log(this.empInfo + 'From Employees Page: Method updateList');
              this.editEmp(this.empInfo);
              break;
            }
            default: {
              console.log(property + ': No Argumments From Employees Page: Method updateList');
              break;
            }
          }
        }
      }
    }
  }

  //Edit Employees

  async editEmp(editEmpInfo: any) {
    this.empInfo.emp_last_mod_by = this.user
    console.log(editEmpInfo + ' From Emp Page: Method editEmp');
    this.data.sendApiRequest("editEmp", editEmpInfo).subscribe((data: any) => {
      //this.empInfoTable = data.payload;
      //console.log(this.empInfoTable);
      //this.empInfoTableDataSource.data = this.empInfoTable;
      //console.log(this.empInfoTableDataSource + ' From Emp Page: Method editEmdddddddddddddddddp');
    });
  }

  //Del Employees

  async delEmp(emp_no: any) {

    this.empInfo = {};
    this.empInfo.emp_no = emp_no;
    this.data.sendApiRequest("delEmp", this.empInfo).subscribe((data: any) => {
      this.ngOnInit();
      this.notify('DELETED EMPLOYEE:' + emp_no, 'OK')
    });
  }

  //Filter Employees

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.empInfoTableDataSource.filter = filterValue;
  }

  //Set Table Size

  isMin: boolean = false
  isMax: boolean = false

  tableMaxWidth = 150;
  tableWidth = 150;

  minTable() {
    if (this.isMin == false) {
      this.empInfoTableColumns = this.minTableSize;
      this.tableMaxWidth = 100;
      this.isMin = true;
    }
    else {
      this.empInfoTableColumns = this.defaultTableSize;
      this.tableMaxWidth = 150;
      this.tableWidth = 150;
      this.isMin = false;
    }
  }

  maxTable() {
    if (this.isMax == false) {
      this.empInfoTableColumns = this.maxTableSize;
      this.tableWidth = 200;
      this.tableMaxWidth = 200;
      this.isMax = true;
    }
    else {
      this.empInfoTableColumns = this.defaultTableSize;
      this.tableMaxWidth = 150;
      this.tableWidth = 150;
      this.isMax = false;
    }
  }

  //TabIndex FunctionS

  tabIndexStart() {
    this.tabIndex = 0;
    return <number>this.tabIndex;
  }

  tabIndexInc(index: number) {
    if (this.tabIndex == 0) {
      this.tabIndex = 1
    }
    else {
      this.tabIndex = this.tabIndex + 1;
    }
    return <number>this.tabIndex;
  }

  //SnackBar

  notify(message: string, action: string) {
    this.snackbar.open(message, action, { duration: 3000 });
  }


  // modal

  fname: any;
  lname: any;
  empId: any;
  status: any;
  address: any;
  sex: any;
  dob: any;
  contact: any;
  position: any;
  department: any;
  rate: any;
  datestarted: any;
  timeIn: any;
  timeOut: any;



  @ViewChild('ViewDialog', { static: true }) ViewDialog!: TemplateRef<any>;

  viewModal = (i: any) => {

    this.dialog.open(this.ViewDialog);
    this.fname = i.emp_firstname;
    this.lname = i.emp_lastname;
    this.empId = i.emp_id;
    this.status = i.emp_status;
    this.address = i.emp_address;
    this.sex = i.emp_sex;
    this.dob = i.emp_datebirth;
    this.contact = i.emp_contact;
    this.position = i.emp_position;
    this.department = i.emp_department;
    this.rate = i.emp_rate;
    this.datestarted = i.emp_start_date;
    this.timeIn = i.emp_time_in;
    this.timeOut = i.emp_time_out

    console.log(this.fname + "\n" + this.lname + "\n" + this.empId + "\n" + this.status + "\n" + this.address + "\n" + this.sex + "\n" + this.dob + "\n" + this.contact + "\n" + this.position + "\n" + this.department + "\n" + this.rate + "\n" + this.datestarted + "\n" + this.timeIn + "\n" + this.timeOut);


    // this.productForm.patchValue({
    //   item_id: i.item_id,
    //   item_name: i.item_name,
    //   item_desc: i.item_desc,
    //   item_quant: i.item_quant,
    //   item_price: i.item_price,
    //   item_minimum: i.item_minimum,
    //   remarks: i.remarks,
    //   date_expiry: i.date_expiry,
    //   measurementType: i.measurementType
    // })
  }


}





