import { Component } from '@angular/core';
import { AdminService } from '../../service/admin';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule, MatIcon,
    MatInput,
    MatSuffix,
  ],
  templateUrl: './coupons.html',
  styleUrl: './coupons.scss'
})
export class Coupons {

  coupons: any;

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getCoupons();
  }

  getCoupons() {
    this.adminService.getCoupons().subscribe(response => {
      this.coupons = response;
    });
  }

}
