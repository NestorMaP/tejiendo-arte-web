import { Component } from '@angular/core';
import { MaterialModules } from '../../../material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder, Form } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserStorageService } from '../../../services/storage/user-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [MaterialModules,
    CommonModule,
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
})
export class Login {

  loginForm: FormGroup;

  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(username,password).subscribe(
      (success) => {
        if (UserStorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl('admin/dashboard');
        }else if(UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('customer/dashboard')
        }
      },
      (error) => {
        this.snackBar.open('Bad credentials', 'Close', { duration: 5000 });
      }
    )
  }

}
