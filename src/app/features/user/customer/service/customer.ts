import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStorageService } from '../../../../services/storage/user-storage.service';

const BASIC_URL = "http://localhost:8080/"

@Injectable({
  providedIn: 'root'
})
export class Customer {


  constructor(private http: HttpClient) {}

      getAllProducts(): Observable<any> {
        return this.http.get(BASIC_URL + 'api/customer/products', {
          headers: this.createAuthorizationHeader()
        })
      }
  
      getAllProductsByName(productName): Observable<any> {
        return this.http.get(BASIC_URL + `api/customer/search/${productName}`, {
          headers: this.createAuthorizationHeader()
        })
      }

      private createAuthorizationHeader(): HttpHeaders {
        return new HttpHeaders().set(
          'Authorization', 'Bearer ' + UserStorageService.getToken()
        )
      }
}
