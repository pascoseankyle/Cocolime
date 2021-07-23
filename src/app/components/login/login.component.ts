import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // registerForm : FormGroup;
  userInfo: any = {};
  inputVal: any;
  inputVal2: any;
  inputVal3: any;
  account: any = {};
  logUname: any;
  logPword: any;
  submitted = false;
  

  constructor(private ds: DataService, public route: Router) { }

  ngOnInit(): void {
  }

 
  // async registerUser(){
  //   this.submitted = true;
  //   this.userInfo.uname = this.inputVal;
  //   this.userInfo.pword = this.inputVal2;
  //   this.userInfo.fname = this.inputVal3;

  //   await this.ds.sendApiRequest("registerUser", this.userInfo).subscribe(res => {
  //     console.log(res);
  //   })
  // }

  async loginUser(){
    this.userInfo.uname = this.logUname;
    this.userInfo.pword = this.logPword;


    await this.ds.sendApiRequest("loginUser", this.userInfo).subscribe(res => {
      console.log(res);

      if (res.payload.length == 0) {
        alert("Incorrect Credentials");
      }
      else{
        localStorage.setItem("Fullname", res.payload.fname);
        this.route.navigate(['/main']);
      }
    });
  }
   
  
}
