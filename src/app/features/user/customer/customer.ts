import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterOutlet,
  ],
  templateUrl: './customer.html',
  styleUrl: './customer.scss'
})
export class Customer {

}
