import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatIconModule, MatIcon,
    MatInputModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {

  cartItems: any[] = [];
  order: any;

  couponForm!: FormGroup

  constructor(
    private customerService: CustomerService,
    private snackbar: MatSnackBar,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

    ngOnInit():void {
      this.couponForm = this.formbuilder.group({
        code: [null, [Validators.required]]
      })
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

    applyCoupon() {
      this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(response => {
        this.snackbar.open("Coupon Applied Successfully", 'Close', {
          duration: 5000
        });
        this.getCart();
      }, error => {
        this.snackbar.open(error.error, 'Close', {
          duration: 5000
        });
      })
    }

    modifyProductQuantity(productId: any, delta: number) {
      this.customerService.modifyProductQuantity(productId, delta).subscribe(response => {
        if (delta > 0) this.snackbar.open('Product quantity increased','Close', { duration: 5000 });
        if (delta < 0) this.snackbar.open('Product quantity descreaed','Close', { duration: 5000 });
        this.getCart();
      })
    }
}
