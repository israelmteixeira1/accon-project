import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from 'protractor';
import { concat } from 'rxjs';
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
  private oldOrders: Order[];
  private index: string[] = []
  private newOrders: Order[]

  setData(token:string, network:string){
    this.network = network;
    this.token = token;
    
    this.tokenJson = JSON.stringify(this.token)
    localStorage.setItem('token', this.tokenJson)

    this.networkJson = JSON.stringify(this.network)
    localStorage.setItem('network', this.networkJson)
  }

  setOrders(orders: Order[]){
    if(orders.length == 0){// sem novos pedidos pendentes
      console.log('sem pedidos pendentes!')
    }else{
      this.oldOrders = this.getOrders();
      if(this.oldOrders.length == 0){//caso de não ter pedidos armazenados
        this.newOrders = orders;
        this.orders = JSON.stringify(this.newOrders)
        localStorage.setItem('orders',this.orders)
      }else{//caso já tenha pedidos armazenados no storage anteriormente
        this.newOrders = orders.filter(e => this.oldOrders.every(element => element._id != e._id))
        this.newOrders = this.oldOrders.concat(this.newOrders);
        this.orders = JSON.stringify(this.newOrders)
        localStorage.setItem('orders',this.orders)
      }
    }
  }

  attStatus(id: string){
    let actualOrders: Order[] = this.getOrders();
    actualOrders.forEach(e => {
      if( e._id == id){
        if(e.delivery == false){//pedido de retirada
          if(e.status[0].name == 'Pronto'){
            e.status[0].name = 'Finalizado';
          }
          else if(e.status[0].name == 'Confirmado'){
            e.status[0].name = 'Pronto';
          }
          else if(e.status[0].name == 'Realizado'){
            e.status[0].name = 'Confirmado';
          }

        }
        else{//pedido de delivery
          if(e.status[0].name == 'Saiu para Entrega'){
            e.status[0].name = 'Finalizado';
          }
          else if(e.status[0].name == 'Confirmado'){
            e.status[0].name = 'Saiu para Entrega';
          }
          else if(e.status[0].name == 'Realizado'){
            e.status[0].name = 'Confirmado';
          }
        }
      }
    })
    this.orders = JSON.stringify(actualOrders);
    localStorage.setItem('orders',this.orders);
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