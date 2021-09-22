import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../shared/request.service';
import { SharingService } from '../shared/sharing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../order';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private requestService: RequestService,
    private sharingService: SharingService, 
    private router: Router,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.pendingOrders();
  }

  token: string = this.sharingService.getToken();
  network: string = this.sharingService.getNetwork();
  ordersJson: string;
  confirmedOrders: string;
  orders: Order[] = this.sharingService.getOrders();
  
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  pendingOrders(){
    this.requestService.getPendingOrders(this.token, this.network).subscribe(
      data => {
        this.sharingService.setOrders(data);
        console.log(this.orders)
    })
  }

  nextStatus(id: string) {
    this.requestService.nextStatus(id).subscribe(
      data => {
        this.sharingService.attStatus(id)
        location.reload()
      })
  }

}
