import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/DTR/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-inde',
  templateUrl: './inde.component.html',
  styleUrls: ['./inde.component.css']
})
export class IndeComponent implements OnInit {

  constructor(public router: Router, public data: DataService, public snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.getUser();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000 ,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  //GET USER START SESSION

  user:any

  getUser() {
    this.user = localStorage.getItem('Name')
  }
  

  logout()
  {
    localStorage.clear();
  this.router.navigate(['']);
  }

 

}
