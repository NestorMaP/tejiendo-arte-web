import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../service/customer';

@Component({
  selector: 'app-view-ordered-products',
  standalone: true,
  imports: [

  ],
  templateUrl: './view-ordered-products.html',
  styleUrl: './view-ordered-products.scss'
})
export class ViewOrderedProducts {

  orderId: any;
  orderedProductDetailsList = [];
  totalAmount: any;

  constructor(
    private activatedroute: ActivatedRoute,
    private customerService: CustomerService,
  ) { }

  ntOnInit() {
    this.orderId = this.activatedroute.snapshot.params['orderId'];
    this.getOrderedProductsDetailsByOrderId();
  }

  getOrderedProductsDetailsByOrderId() {
    this.customerService.getOrderedProducts(this.orderId).subscribe(response => {
      response.productDtoList.forEach(element => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImage;
        this.orderedProductDetailsList.push(element);
      });
      this.totalAmount = response.orderAmount;
    });
  }
}
