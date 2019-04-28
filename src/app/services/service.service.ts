import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  public getAllCoins() {
    return this.httpClient.get('https://cryptocurrency-analysis.herokuapp.com/all');
  }

  public filterCoins(data) {
    return this.httpClient.post('https://cryptocurrency-analysis.herokuapp.com/filter/advanced', data, httpOptions);
  }

}
