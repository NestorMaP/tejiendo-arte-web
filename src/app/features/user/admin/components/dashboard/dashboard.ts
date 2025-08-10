import { Component } from '@angular/core';
import { AdminService } from '../../service/admin';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  products: any[] = [];
  searchProductForm!: FormGroup

  constructor(
    private AdminService: AdminService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.formBuilder.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts() {
    this.products = [];
    this.AdminService.getAllProducts().subscribe(response => {
      response.forEach(element => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
    })
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value
    this.AdminService.getAllProductsByName(title).subscribe(response => {
      response.forEach(element => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
    })
  }

}
