import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './place-order.html',
  styleUrl: './place-order.scss'
})
export class PlaceOrder {

  orderForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
    })
  }

  placeOrder() {
    this.customerService.placeOrder(this.orderForm.value).subscribe(response => {
      if (response.id != null) {
        this.snackBar.open("Order placed successfully", "Close", {duration: 5000});
        this.router.navigateByUrl("/customer/my-orders");
        this.closeForm();
      } else {
        this.snackBar.open("Something went wrong", "Close", {duration: 5000});
      }
    })
  }

  closeForm() {
    this.dialog.closeAll();
  }

}
