import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {



  constructor(private ds: DataService, public router: Router) { }


ngOnInit(): any{}

logoutFunction(){
  localStorage.clear();
  this.router.navigate(['/welcome']);
  }
}
