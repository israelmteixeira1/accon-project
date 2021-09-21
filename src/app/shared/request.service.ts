import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { Order } from '../order';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  loginUrl = 'https://api.accon.app/v1/auth/login';

  requestUrl = 'https://api.accon.app/v1/order/pending'

  token: string;

  network: string;

  constructor(private http: HttpClient) { }


  loginAuthentication(email: string, password: string): Observable<string>{
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    let body = `email=${email}&password=${password}&network=5f4fe34fa92184004ba03d50`;
    return this.http.post<string>(this.loginUrl, body, {'headers': headers})
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToRequest)
    )
  }

  getPendingOrders(token: string, network: string): Observable<Order[]>{
    let headers = new HttpHeaders()
    .set('Authorization',`Bearer ${token}`)
    .set('X-NETWORK-ID',network);

    this.token = token;
    this.network = network;

    return this.http.get(this.requestUrl, {'headers': headers})
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToRequests)
    )
  }

  nextStatus(id: string): Observable<any>{
    const urlStatusOrder = `https://api.accon.app/v1/order/${id}/next`;
    let headers = new HttpHeaders()
    .set('Authorization',`Bearer ${this.token}`)
    .set('X-NETWORK-ID',this.network);

    let body = '';

    return this.http.post(urlStatusOrder, body, {'headers': headers})
    .pipe(
      catchError(this.handleError),
      map(this.jsonDataToRequests)
    )
  }



  private handleError(error: any): Observable<any>{
    console.log("ERROR NA REQUISIÇÃO =>",error);
    return throwError(error);
  }

  private jsonDataToRequest(jsonData: any): any{
    return jsonData as string;
  }

  private jsonDataToRequests(jsonData: any[]): any{
    const orders:any = []
    
    return jsonData as string[];
  }
}
