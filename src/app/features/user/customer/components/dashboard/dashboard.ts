import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule, MatSuffix } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
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
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  products: any[] = [];
  searchProductForm!: FormGroup

  constructor(
    private CustomerService: CustomerService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getAllProducts();
    this.searchProductForm = this.formBuilder.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts() {
    this.products = [];
    this.CustomerService.getAllProducts().subscribe(response => {
      response.forEach(element => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
    })
  }

  submitForm() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value
    this.CustomerService.getAllProductsByName(title).subscribe(response => {
      response.forEach(element => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
      console.log(this.products);
    })
  }

  addToCart(id:any) {
    this.CustomerService.addToCart(id).subscribe(response => {
      this.snackBar.open("Product added to cart successfully", "Close", {duration: 5000});
    })
  }
}
