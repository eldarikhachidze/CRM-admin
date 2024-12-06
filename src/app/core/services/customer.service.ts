import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService{

  getCustomers(): Observable<any> {
    return this.get<any>('customers/create/');
  }

  createCustomer(data: any): Observable<any> {
    return this.post('customers/create/', data);
  }

}
