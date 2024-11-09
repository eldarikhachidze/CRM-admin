import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chip} from "../../../../core/interfaces/chip";
import {TableService} from "../../../../core/services/table.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {ChipService} from "../../../../core/services/chip.service";
import {ActivatedRoute, Router} from "@angular/router";
import {of, switchMap} from "rxjs";

@Component({
  selector: 'app-add-or-edit-table',
  templateUrl: './add-or-edit-table.component.html',
  styleUrls: ['./add-or-edit-table.component.scss']
})
export class AddOrEditTableComponent implements OnInit {
  form: FormGroup;
  chipData: Chip[] = [];
  denominations: number[] = [0.5, 1, 2.5, 5, 25, 100, 500, 1000, 5000, 10000, 100000];

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private notificationService: NotificationService,
    private chipService: ChipService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      id: <number | null>(null),
      name: ['', Validators.required],
      open_flot: this.fb.array([]) // Initialize as FormArray
    });
  }

  ngOnInit(): void {
    this.getChips(); // Assuming this is where you fetch the chips data
    this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          return this.tableService.getOne(params['id']);
        }
        return of(null);
      })
    ).subscribe(res => {
      if (res) {
        this.form.patchValue({
          id: res.id,
          name: res.name
        });

        const openFlotArray = this.form.get('open_flot') as FormArray;
        openFlotArray.clear(); // Clear existing entries

        // Populate the FormArray based on fixed denominations
        this.denominations.forEach(denomination => {
          const quantity = res.open_flot[denomination] || 0; // Default to 0 if no quantity found
          openFlotArray.push(this.fb.group({
            denomination: [{value: denomination, disabled: true}], // Readonly
            quantity: [quantity, Validators.required]
          }));
        });
      }
    });
  }

  get openFlot(): FormArray {
    return this.form.get('open_flot') as FormArray;
  }

  getChips(): void {
    this.chipService.getChips().subscribe(data => {
      this.chipData = data;
      this.setUpOpenFlotArray(); // Initialize FormArray based on chipData
    });
  }

  setUpOpenFlotArray(): void {
    const openFlotArray = this.form.get('open_flot') as FormArray;
    openFlotArray.clear(); // Clear existing controls to avoid duplicates
    this.chipData.forEach(chip => {
      openFlotArray.push(this.fb.group({
        denomination: [{value: chip.denomination, disabled: true}], // Readonly
        quantity: [0, Validators.required] // Initialize quantity
      }));
    });
  }

  createTable(): void {
    if (this.form.invalid) {
      this.notificationService.showError('Please fill in all required fields.');
      return;
    }

    // Cast to FormArray
    const openFlotArray = this.form.get('open_flot') as FormArray;

    // Build the open_flot object with quantities directly
    const openFlotObj = this.chipData.reduce((acc: { [key: string]: number }, chip, index) => {
      const quantityControl = openFlotArray.at(index).get('quantity'); // Get the quantity control

      // Check if quantityControl is not null and get the value
      const quantity = quantityControl ? quantityControl.value : 0; // Default to 0 if null

      acc[chip.denomination.toString()] = quantity; // Store quantity directly
      return acc;
    }, {});

    const dataToSend = {
      name: this.form.value.name,
      open_flot: openFlotObj // Pass the formatted object to the backend
    };
    console.log(this.form.value.id);
    if (this.form.value.id) {
      this.tableService.updateTable(this.form.value.id, dataToSend).subscribe({
        next: (res) => {
          this.notificationService.showSuccess(res.message);
          this.router.navigate(['/table']);
        },
        error: (error) => {
          this.notificationService.showError(error.error);
        }
      });
      return;
    } else {
      this.tableService.createTable(dataToSend).subscribe({
        next: (res) => {
          this.notificationService.showSuccess(res.message);
          this.router.navigate(['/table']);
        },
        error: (error) => {
          this.notificationService.showError(error.error.name[0]);
        }
      });
    }
  }


}
