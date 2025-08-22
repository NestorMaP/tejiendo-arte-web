import { Component } from '@angular/core';
import { AdminService } from '../../service/admin';
import { OrderByStatus } from './order-by-status/order-by-status';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    OrderByStatus,
    MatCardModule,
    
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss'
})
export class Analytics {

  data: any;

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.adminService.getAnalytics().subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
}
