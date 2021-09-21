import { Injectable } from '@angular/core';
import { Order } from '../order';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }

  private token: string;
  private network: string;
  private tokenJson: string;
  private networkJson: string;
  private orders: string

  setData(token:string, network:string){
    this.network = network;
    this.token = token;
    
    this.tokenJson = JSON.stringify(this.token)
    localStorage.setItem('token', this.tokenJson)

    this.networkJson = JSON.stringify(this.network)
    localStorage.setItem('network', this.networkJson)
  }

  setOrders(orders: Order[]){
    if(orders.length == 0){
      console.log('sem pedidos pendentes!')
    }else{
    this.orders = JSON.stringify(orders);
    localStorage.setItem('orders',this.orders)
    }
  }

  getOrders(): Order[]{
    return JSON.parse(localStorage.getItem('orders'))
  }

  getToken(){
    this.token = JSON.parse(localStorage.getItem('token'))
    return this.token;
  }

  getNetwork(){
    this.network = JSON.parse(localStorage.getItem('network'))
    return this.network;
  }
}
