import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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


  role: any;
  name: any;
  async loginUser(){
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


    this.userInfo.uname = this.logUname;
    this.userInfo.pword = this.logPword;


    await this.ds.sendApiRequest("loginUser", this.userInfo).subscribe(res => {
      console.log(res);

    
      localStorage.setItem("ROLE", res.payload.role);
      this.role = res.payload.role;
      this.name = res.payload.fname;



      if (this.logPword == null || this.logUname == null)
      {
      
        Toast.fire({
          icon: 'error',
          title: 'There is an  empty field'
        }) 
      }   
   
      else  if (this.role == null)
      {
      
        Toast.fire({
          icon: 'error',
          title: 'Wrong Username or Password'
        }) 
      }   
  
  
      else
      {
  
        Toast.fire({
          icon: 'success',
          title: 'Welcome ' + this.name + '!'
        }) 
   
          if(this.role == 1)
          {
            // username: ToCRM password: 1234
            console.log("TO CRM");
            this.route.navigate(['crm']);
          }
          else if(this.role == 2)
          {
            // username: ToMenu password: 123
            console.log("TO MENU");
            this.route.navigate(['menu']);
          }
          else if(this.role == 3)
          {
            // username: ToInventory password: asdasdasd
            console.log("TO Inventory");
            this.route.navigate(['stocks']);
          }
          else if(this.role == 4)
          {
            // username: ToPOS password: 123
            console.log("TO POS"); 
            this.route.navigate(['pos'])
    
          }
  
          else if(this.role == 5)
          {
            // username: ToPOS password: 123
            console.log("TO POS"); 
            this.route.navigate(['DTR'])
    
          }
  
          else if(this.role == 6)
          {
            // username: ToPOS password: 123
            console.log("TO POS"); 
            this.route.navigate(['PMS'])
    
          }
    
    
  
      }
  
  
  
  
    



    });

  
    
  }
  
}
