import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,

  ],
  templateUrl: './track-order.html',
  styleUrl: './track-order.scss'
})
export class TrackOrder {

  searchOrderForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.searchOrderForm = this.formBuilder.group({
      trackingId: [null, [Validators.required]]
    })
  }

  submitForm() {
    this.authService.getOrderByTrackingId(this.searchOrderForm.get('trackingId').value).subscribe(response => {
      console.log(response)
    })
  }


}
