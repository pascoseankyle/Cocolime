import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) {}

  // apiURL = "http://localhost:8080/COCOLIME1/api/";
  // URL = 'http://localhost:8080/COCOLIME1/api/';
  apiURL = "http://localhost/COCOLIME/api/";
  URL = 'http://localhost/COCOLIME/api/';


  apiPos = "http://localhost/COCOLIME/apiPos/";


  apiReqPos(method, data)
  {
    return <any>(
      this.http.post(this.apiPos + method, btoa(JSON.stringify(data)))
    );
  }


  sendApiRequest(method, data) {
    return <any>(
      this.http.post(this.apiURL + method, btoa(JSON.stringify(data)))
    );
  }

  public getData(endpoint: any, results: any) {
    return  <any>( 
      this.http.post(this.URL + endpoint, btoa(JSON.stringify(results)))
    );
  }
}
