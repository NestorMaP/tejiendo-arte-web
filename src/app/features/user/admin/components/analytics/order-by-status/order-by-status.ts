import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-by-status',
  standalone: true,
  imports: [
    MatCardModule,
  ],
  templateUrl: './order-by-status.html',
  styleUrl: './order-by-status.scss'
})
export class OrderByStatus {

  @Input() data:any;

}
