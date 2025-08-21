import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-product',
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
  ],
  templateUrl: './update-product.html',
  styleUrl: './update-product.scss'
})
export class UpdateProduct {

  productId: number;

  productForm: FormGroup;
  listOfCategories: any = [];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  existingImage: string | null = null;
  imageChanged = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedroute: ActivatedRoute,
  ) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imageChanged = true;

    this.existingImage = null;
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    
    this.productId = this.activatedroute.snapshot.params['productId'];

    this.getAllCategories();
    this.getProductById();
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe(response => {
      this.listOfCategories = response;
    });
  }

  getProductById() {
    this.adminService.getProductById(this.productId).subscribe(response => {
      this.productForm.patchValue(response);
      this.existingImage = 'data:image/jpeg;base64,' + response.byteImage;
    });
  }

  updateProduct(): void {
    if(this.productForm.valid) {
      const formData: FormData = new FormData();

      if(this.imageChanged && this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      formData.append('categoryId', this.productForm.get('categoryId').value);
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this.adminService.updateProduct(this.productId, formData).subscribe((response) => {
        if (response.id != null) {
          this.snackBar.open('Product Updated Successfully!', 'Close', {
            duration:5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(response.error, 'Close', {
            duration:5000
          })
        }
      });
    } else {
      for (const control in this.productForm.controls) {
        this.productForm.controls[control].markAsDirty();
        this.productForm.controls[control].updateValueAndValidity();
      }
    }
  }

}
