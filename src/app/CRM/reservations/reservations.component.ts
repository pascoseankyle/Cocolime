import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';


const moment = _rollupMoment || _moment;


// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM/YYYY',
  },
  display: {
    dateInput: 'MMMM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export interface reservations {
  res_id: any;
  table_name: any;
  first_name: any;
  last_name: any;
  reservation_date: any;
  reservation_time: any;
  phone_no: any;
  status_id: any;
  
}


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  providers: [ {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})
export class ReservationsComponent implements OnInit, AfterViewInit {

  reservations: any;
  action: any={};
  reservationInfo: any={};
  reservedTables:any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  displayedColumns: any[] = [


    "Column1",
    "Column2",
    "Column3",
    "Column4",
    "Column5",
    "Column6",
    "Column7",
    "Column8",
    "Column9",


   
  
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator;
  }

  resInfoTable: reservations[]  = [];
  dataSource = new MatTableDataSource(this.resInfoTable);

    //Modals
    viewReservation(contentViewReservation) {
    
      this.dialog.open(contentViewReservation);
  
    }

  constructor(private ds: DataService, public router: Router, private modalService: NgbModal, public dialog: MatDialog) { }

  ngOnInit(){

    this.monthSelected();

  }


  monthYear: any;


  inputDisable = true;

  selectedMonth: string = 'All';
  selectedYear: any = [];

  selectedFilter: any = {};
  selected: any;
  selectedMY: any;

  initYear: any;
  initMonth: any;

  selectedMYBool = false;


  datePicker = new FormGroup({
    date1: new FormControl('', { validators: [Validators.required] }),
    date2: new FormControl('', { validators: [Validators.required] })
 });


 date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    this.selectedFilter.selectedYear = normalizedYear.year();
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

   
    
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.selectedFilter.selectedMonth= normalizedMonth.month() + 1;
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();

  }



  clearDate(){
    this.datePicker.value['date1'] = null;
    this.datePicker.reset();
    this.selectedFilter={};
    
  }

  monthSelected(){
    var count = Object.keys(this.selectedFilter).length;
    var  months1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    this.inputDisable = false;

    if(count < 2){
     
        this.monthYear = "All inventory stocks";

        this.ds.sendApiRequest("reservations", null).subscribe(data => {
      
          this.resInfoTable = data.payload;
          this.dataSource.data = this.resInfoTable;
     
        });
    }
      else if(count == 2){
        this.monthYear =  months1[this.selectedFilter.selectedMonth - 1 ] + "-" + JSON.stringify(this.selectedFilter.selectedYear) + "-Stocks";
        this.ds.sendApiRequest("selectMYcrm", this.selectedFilter).subscribe(data => {
          this.resInfoTable = data.payload;
          this.dataSource.data = this.resInfoTable; 
      });
    }   
  }

  pullReservations() {
    this.ds.sendApiRequest("reservations", null).subscribe(data => {
      this.reservations = data.data;
      this.resInfoTable = data.payload;
      this.dataSource.data = this.resInfoTable;
 
    })
  }


    acceptAction: any = {};

    async acceptReservation(e) {

      this.action.res_id = e.res_id;
      this.action.status_id = 2;
      console.log(this.action);
      await this.ds.sendApiRequest("actionReservation", this.action).subscribe((res:any) => {
        this.pullReservations();

        if(res.status.remarks == "success!")
        {
          console.log("status functioin tables");
          this.acceptAction.table_name = e.table_name;
          this.acceptAction.status_id = 4;

          console.log(this.acceptAction);
          this.ds.sendApiRequest("acceptAction", this.acceptAction).subscribe((res:any) => {
         
          });

        }


      });
    }



    rejectAction: any = {};
    async rejectReservation(e) {

      this.action.res_id = e.res_id;
      this.action.status_id = 1;
  
      await this.ds.sendApiRequest("actionReservation", this.action).subscribe((res:any) => {
        this.pullReservations();

        if(res.status.remarks == "success!")
        {
        
          this.rejectAction.table_name = e.table_name;
          this.rejectAction.status_id = 1;

          console.log(this.rejectAction);
          this.ds.sendApiRequest("rejectAction", this.rejectAction).subscribe((res:any) => {
         
          });

        }


      });
    }

    async cancelReservation(e) {

      this.action.res_id = e.res_id;
      this.action.status_id = 4;
      console.log(this.action);
      await this.ds.sendApiRequest("actionReservation", this.action).subscribe((res:any) => {
        this.pullReservations();
      });
    }



    getReservationInfo = (reservations) => {
 
      this.reservationInfo.id = reservations.res_id;
      this.reservationInfo.table_name    = reservations.table_name;
      this.reservationInfo.firstname    = reservations.first_name;
      this.reservationInfo.lastname = reservations.last_name;   
      this.reservationInfo.reservation_date    = reservations.reservation_date;
      this.reservationInfo.reservation_time    = reservations.reservation_time;
      this.reservationInfo.phone_no = reservations.phone_no;   
      this.reservationInfo.status_id = reservations.status_id;  
      
      
      console.log(this.reservationInfo);
    }
  

  logoutFunction(){
    localStorage.clear();
    this.router.navigate(['']);
  }

  voidInfo: any = {};
  voidReservation(reservations){
 this.voidInfo.res_id = reservations.res_id;
 this.ds.apiReqPos("voidRes", this.voidInfo).subscribe((res:any) => {
  this.pullReservations();
});
  }

}
