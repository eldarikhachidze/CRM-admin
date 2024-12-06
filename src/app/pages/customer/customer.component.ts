import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../core/services/customer.service";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  form: FormGroup;
  customers: any;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private notificationService: NotificationService,
  ) {
    this.form = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(data => {
      console.log(data);
      this.customers = data || [];
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);

    this.customerService.createCustomer(this.form.value).subscribe((res) => {
      this.notificationService.showSuccess(res.message);
      this.getCustomers();
    }, (error) => {
      this.notificationService.showError(error.error.message);
    });

  }


}
