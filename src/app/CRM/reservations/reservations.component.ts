import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: any;
  action: any={};
  reservationInfo: any={};
  reservedTables:any;


    //Modals
    viewReservation(contentViewReservation) {
    
      this.dialog.open(contentViewReservation);
  
    }

  constructor(private ds: DataService, public router: Router, private modalService: NgbModal, public dialog: MatDialog) { }

  ngOnInit(){

    this.pullReservations();

  }

  pullReservations() {
    this.ds.sendApiRequest("reservations", null).subscribe(data => {
      this.reservations = data.data;
      console.log(this.reservations);
    })
  }


    async acceptReservation(e) {

      this.action.res_id = e;
      this.action.status_id = 1;
      console.log(this.action);
      await this.ds.sendApiRequest("actionReservation", this.action).subscribe((res:any) => {
        this.pullReservations();
      });
    }
    async rejectReservation(e) {

      this.action.res_id = e;
      this.action.status_id = 3;
      console.log(this.action);
      await this.ds.sendApiRequest("actionReservation", this.action).subscribe((res:any) => {
        this.pullReservations();
      });
    }


    getReservationInfo = (reservations) => {
 
      this.reservationInfo.id = reservations.id;
      this.reservationInfo.reservation_no    = reservations.reservation_no;
      this.reservationInfo.table_name    = reservations.table_name;
      this.reservationInfo.firstname    = reservations.firstname;
      this.reservationInfo.lastname = reservations.lastname;   
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
}
