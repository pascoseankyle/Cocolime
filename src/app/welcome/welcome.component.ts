import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

toMenu():void {
  this.router.navigate(['menu']);
}
toInventory():void {
  this.router.navigate(['stocks']);
}
toCRM():void {
  this.router.navigate(['crm']);
}

toPOS():void
{
  this.router.navigate(['pos'])
}

}
