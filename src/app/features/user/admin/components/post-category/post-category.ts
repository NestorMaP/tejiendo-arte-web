import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';

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
    RouterOutlet,
  ],
  templateUrl: './post-category.html',
  styleUrl: './post-category.scss'
})
export class PostCategory {

}
