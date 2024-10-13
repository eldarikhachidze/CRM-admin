import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChipService} from "../../../core/services/chip.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NotificationService} from "../../../core/services/notification.service";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-add-or-edit-chip',
  templateUrl: './add-or-edit-chip.component.html',
  styleUrls: ['./add-or-edit-chip.component.scss']
})
export class AddOrEditChipComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl<string | null>(null),
    denomination: new FormControl<string>(''),
  });


  constructor(
    private chipService: ChipService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: any) => {
        if (params['id']) {
          return this.chipService.getChip(params['id'])
        }
        return of(null)
      })
    ).subscribe(res => {
      if (res) {
        console.log(res)
        this.form.patchValue({
          ...res,
        })
      }
    })
  }


  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.id) {
      this.chipService.updateChip(this.form.value.id, this.form.value).subscribe({
        next: (res) => {
          if (res && res) {
            this.notificationService.showSuccess('Chip updated successfully');
            this.router.navigate(['/chip']);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.notificationService.showError(error.error.denomination[0]);
        }
      });
    }
    else {
      this.chipService.createChip(this.form.value).subscribe({
        next: (res) => {
          if (res && res.message) {
            this.notificationService.showSuccess(res.message);
            this.router.navigate(['/chip']);
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.notificationService.showError(error.error.denomination[0]);
        }
      });
    }
  }
}
