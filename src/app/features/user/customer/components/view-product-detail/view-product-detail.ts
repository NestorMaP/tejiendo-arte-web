import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../service/customer';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-product-detail',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './view-product-detail.html',
  styleUrl: './view-product-detail.scss'
})
export class ViewProductDetail {

  productId: number;

  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["productId"];
    this.getProductDetailById();
  }

  getProductDetailById() {
    this.customerService.getProductDetailById(this.productId).subscribe(response => {
      this.product = response.productDto;
      this.product.processedImage = 'data:image/png;base64' + response.productDto.byteImage;

      this.FAQS = response.faqDtoList;

      response.reviewDtoList.forEach(element => {
        element.processedImage = 'data:image/jpeg;base64,' + element.byteImage;
        this.reviews.push(element);
      });
    });
  }

}
