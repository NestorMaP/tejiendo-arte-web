import { Component } from '@angular/core';
import { CustomerService } from '../../service/customer';

@Component({
  selector: 'app-view-wishlist',
  standalone: true,
  imports: [

  ],
  templateUrl: './view-wishlist.html',
  styleUrl: './view-wishlist.scss'
})
export class ViewWishlist {

  products: any[] = [];

  constructor(
    private customerService: CustomerService,
  ) { }

  ngOnInit() {
    this.getWishlistByUserId();
  }

  getWishlistByUserId() {
    this.customerService.getWishlistByUserId().subscribe(response => {
      response.forEach(element => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
    })
  }

}
