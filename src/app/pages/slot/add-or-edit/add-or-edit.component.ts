import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SlotService} from "../../../core/services/slot.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl<number | null>(null),
    name: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
  });
  slots: any;

  constructor(
    private slotService: SlotService,
    private router: Router,
    private rout: ActivatedRoute,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.rout.params.subscribe((params) => {
      if (params['id']) {
        this.slotService.getSlotMachine(params['id']).subscribe((res) => {
          this.slots = res;
          this.form.patchValue(this.slots);
        })
      }
    })
  }


  createSlot() {
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.id) {
      this.slotService.updateSlotMachine(this.form.value.id, this.form.value).subscribe({
        next: (res) => {
          if (res && res.message) {
            console.log(res);
            this.notificationService.showSuccess(res.message);
            this.router.navigate(['/slot']);
          }
        },
        error: (error) => {
          this.notificationService.showError(error.error);
        }
      });
    } else {
      this.slotService.createSlotMachine(this.form.value).subscribe({
        next: (res) => {
          if (res && res.message) {
            this.notificationService.showSuccess(res.message);
            this.router.navigate(['/slot']);
          }
        },
        error: (error) => {
          this.notificationService.showError(error.error.denomination[0]);
        }
      });
    }
  }
}
