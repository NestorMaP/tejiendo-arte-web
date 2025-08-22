import { Component } from '@angular/core';
import { AdminService } from '../../service/admin';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [

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
