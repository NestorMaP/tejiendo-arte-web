import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-post-coupon',  
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './post-coupon.html',
  styleUrl: './post-coupon.scss'
})
export class PostCoupon {
  couponForm!: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.couponForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    });
  }

  addCoupon() {
    if(this.couponForm.valid) {
      this.adminService.addCoupon(this.couponForm.value).subscribe(response => {
        if(response.id != null) {
          this.snackBar.open('Coupon Posted Successfully!', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(response.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }

}
