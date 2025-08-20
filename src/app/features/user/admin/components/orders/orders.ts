import { Component } from '@angular/core';
import { AdminService } from '../../service/admin';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders {

  orders: any;

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getPlacedOrders();
  }

  getPlacedOrders() {
    this.adminService.getPlacedOrders().subscribe(response => {
      this.orders = response;
    });
  }

}
