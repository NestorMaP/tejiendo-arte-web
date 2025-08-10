import { Component } from '@angular/core';
import { AdminService } from '../../service/admin';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  products: any[] = [];

  constructor(private AdminService: AdminService) { }

  ngONINit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.products = [];
    this.AdminService.getAllProducts().subscribe(response => {
      response.forEach(element => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
    })
  }

}
