import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userInfo: any = {};
  account: any = {};
  user_name: any;
  user_password: any;

  /*submitted = false;*/

  constructor(private ds: DataService, public route: Router) { }

  ngOnInit(): void {
  }

  //One Time Create PW

  async regUser(){
  
     this.userInfo.user_name = "Password";
     this.userInfo.user_password = "Password";

     await this.ds.sendApiRequest("regUser", this.userInfo).subscribe((res : any) => {
       console.log(res);
     })
   }

  async loginUser() {
    this.userInfo.user_name = this.user_name;
    this.userInfo.user_password = this.user_password;

    await this.ds.sendApiRequest("loginUser", this.userInfo).subscribe((res : any) => {
      console.log(res);

      if (res.payload.length == 0) {
        alert("Incorrect Credentials");
      }
      else {
        localStorage.setItem("Name", res.payload.user_name);
        this.route.navigate(['/home']);
      }
    });
  }


}
