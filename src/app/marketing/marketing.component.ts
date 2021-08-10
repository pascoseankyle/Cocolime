import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { DataService } from '../services/data.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css',
              './css/style.css',
              './css/nivo-lightbox/nivo-lightbox.css',
              './css/nivo-lightbox/default.css',
              // './css/bootstrap.css',
              // './fonts/font-awesome/css/font-awesome.css'
             ]
})
export class MarketingComponent implements OnInit {

  constructor(
    private viewportScroller: ViewportScroller,
    private ds: DataService ,
    private modalService: NgbModal, 
    public dialog: MatDialog
  ) { }

  tblInfo: any= {};
  reserveInfo: any= {};
  tables: any;

  table_id: any;
  table_name: any;
  table_capacity: any;
  status_id: any;

  // Reservation Infos
  first_name: any;
  last_name: any;
  phone_no: any;


    //Modals
    reserveModal(contentReserve) {
    
      this.dialog.open(contentReserve);
  
      
    }

  ngOnInit(): void {
    this.pullTables();
  }
  public onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
}

reserveForm = (tables) => {
 

  this.reserveInfo.table_id = tables.table_id;
  this.tblInfo.table_name1    = tables.table_name;
  this.tblInfo.table_capacity1    = tables.table_capacity;
  this.tblInfo.status_id1 = tables.status_id;   
}


time: any;
date: any;
addReservation(){

  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 1000,
    backdrop:  `
    rgba(0,0,123,0.4)
  
  `,
  width: '100%',

    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  if(this.time == null || this.time == "" || this.date == null || this.date == "" || this.first_name == null || this.first_name == "" || this.last_name == "" || this.last_name == null || this.phone_no == "" || this.phone_no == null )
  
  {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'There is an Empty Field',
      showConfirmButton: false,
      timer: 980
    })
  }

  else
  {
    var timeSplit = this.time.split(':'),
    hours,
    minutes,
    meridian;
  hours = timeSplit[0];
  minutes = timeSplit[1];
  if (hours > 12) {
    meridian = 'PM';
    hours -= 12;
  } else if (hours < 12) {
    meridian = 'AM';
    if (hours == 0) {
      hours = 12;
    }
  } else {
    meridian = 'PM';
  }
  
  
    this.reserveInfo.first_name = this.first_name;
    this.reserveInfo.last_name   = this.last_name;
    this.reserveInfo.phone_no    = this.phone_no;
    this.reserveInfo.reservation_date = this.date;
    this.reserveInfo.reservation_time = hours + ':' + minutes + ' ' + meridian;
    this.reserveInfo.status_id = "3"; 
  
    this.ds.apiReqPos("addReservation", this.reserveInfo).subscribe(data => {
   
      console.log(data);
      if(data.remarks != "success")
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Phone Number Already Reserved a table',
          showConfirmButton: false,
          timer: 980
        })
      }
  
      if(data.code == 200)
      {
        
        this.confirmModal();
      }
    })
  }
  
console.log(this.reserveInfo);
 


}


pullTables() {
  this.ds.sendApiRequest("tables", null).subscribe(data => {
    this.tables = data.data;
  })
}


codE: any;

timeLeft: number = 60;
  interval;

timerOn = false;

startTimer() {

    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.dialog.closeAll();
        clearInterval(this.interval);
        console.log(this.reserveInfo);
    

      }
    },1000)
  }

  @ViewChild('confirmation', { static: true }) confirmation: TemplateRef<any>;

  confirmModal() {
    this.startTimer();
    this.dialog.open(this.confirmation);

    
  }

  resCode: any;
  confirmationInfo: any = {};

  confirmRes(){

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })


    if(this.resCode == "" || this.resCode == null){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Wrong CODE',
        showConfirmButton: false,
        timer: 980
      })
    }

    else{
      
      this.confirmationInfo.status_id = this.reserveInfo.status_id;
      this.confirmationInfo.table_id = this.reserveInfo.table_id;
      this.confirmationInfo.otp = this.resCode.toUpperCase();
      this.timeLeft = 60;
     
      console.log(this.confirmationInfo);
      this.ds.apiReqPos("confirmReservation", this.confirmationInfo).subscribe(data => {



        if(data.status.remarks == "success"){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Reservation Success You will be contacted by our management',
            showConfirmButton: false,
            timer: 980
          })
          clearInterval(this.interval);
          this.pullTables();
          this.dialog.closeAll();
        }

        else{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Wrong CODE',
            showConfirmButton: false,
            timer: 980
          })
        }



      })
     
    }
  }


}
