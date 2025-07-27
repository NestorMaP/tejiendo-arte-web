import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card class="home-card">
      <h1>Bienvenido a Tejiendo Arte Web</h1>
      <p>Este es el componente de inicio.</p>
      <button mat-raised-button color="primary">Explorar</button>
    </mat-card>
  `,
  styles: [`
    .home-card {
      max-width: 500px;
      margin: 2rem auto;
      padding: 1rem;
      text-align: center;
    }
  `]
})
export class HomeComponent {}
