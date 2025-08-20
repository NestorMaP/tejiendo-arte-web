import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../service/admin';

@Component({
  selector: 'app-post-product-faq',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  templateUrl: './post-product-faq.html',
  styleUrl: './post-product-faq.scss'
})
export class PostProductFaq {

  productId: number;
  FAQForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.productId = Number(this.activatedRoute.snapshot.params["productId"]);
    this.FAQForm = this.formBuilder.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]],
    })
  }

  postFAQ() {
    this.adminService.postFAQ(this.productId, this.FAQForm.value).subscribe(response => {
      if (response.id != null) {
        this.snackBar.open('FAQ Posted Successfully!', 'Close', { duration: 5000 });
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.snackBar.open('Something went wrong', 'Close', 
          { duration: 5000, panelClass: 'error-snackbar'});
      }
    });
  } 
}
