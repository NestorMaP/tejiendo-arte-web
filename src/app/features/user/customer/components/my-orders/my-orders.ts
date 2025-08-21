import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
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
