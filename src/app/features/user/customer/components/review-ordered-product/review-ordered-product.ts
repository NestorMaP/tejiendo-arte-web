import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review-ordered-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,

  ],
  templateUrl: './review-ordered-product.html',
  styleUrl: './review-ordered-product.scss'
})
export class ReviewOrderedProduct {

  productId: number;
  reviewForm!: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;


  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.reviewForm = this.formBuilder.group({
      rating: [null,[Validators.required]],
      description: [null,[Validators.required]],
    });
  }

  onFileSelected(event:any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm() {
    
  }

}
