import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { DataService } from '../services/data.service';


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
    private ds: DataService
  ) { }

  tblInfo: any= {};
  tables: any;

  table_id: any;
  table_name: any;
  table_capacity: any;
  status_id: any;

  ngOnInit(): void {
    this.pullTables();
  }
  public onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
}

pullTables() {
  this.ds.sendApiRequest("tables", null).subscribe(data => {
    this.tables = data.data;
  })
}

}
