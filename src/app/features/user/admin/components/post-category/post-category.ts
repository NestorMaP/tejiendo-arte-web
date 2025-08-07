import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/input';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-category',
  standalone:true,
  imports: [
    MatFormField,
    MatLabel,
    MatError,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './post-category.html',
  styleUrl: './post-category.scss'
})
export class PostCategory {

  categoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  addCategory(): void {
    if(this.categoryForm.valid) {
      this.adminService.addCategory(this.categoryForm.value).subscribe((result) => {
        if (result.id != null) {
          this.snackBar.open('Category Posted Successfully!', 'Close', {
            duration: 5000
          });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.snackBar.open(result.message, 'Close', {
            duration: 5000,
            panelClass: 'error-snackbar'
          });
        }
      })
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

}
