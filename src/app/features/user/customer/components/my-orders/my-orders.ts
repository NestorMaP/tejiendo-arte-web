import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [

  ],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss'
})
export class MyOrders {

  myOrders: any;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.getMyOrders();
  }

  getMyOrders() {
    this.customerService.getOrdersByUserId().subscribe(response => {
      this.myOrders = response;
    })
  }

}
