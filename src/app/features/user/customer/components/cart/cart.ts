import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule, MatIcon,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  cartItems: any[] = [];
  order: any;

  constructor(
    private customerService: CustomerService,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

    ngOnInit():void {
      this.getCart();
    }

    getCart() {
      this.cartItems = [];
      this.customerService.getCartByUserId().subscribe(response => {
        this.order = response;
        response.cartItems.forEach(element => {
          element.processedImage = 'data:image/jpeg;base64,' + element.returnedImg;
          this.cartItems.push(element);
        });
      });
    }
}
