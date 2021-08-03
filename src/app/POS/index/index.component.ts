import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private data: DataService) {}

  ngOnInit(): void {
   
  }
  
}
