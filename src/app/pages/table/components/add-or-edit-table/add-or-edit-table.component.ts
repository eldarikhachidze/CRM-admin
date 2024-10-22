import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Chip} from "../../../../core/interfaces/chip";
import {TableService} from "../../../../core/services/table.service";
import {NotificationService} from "../../../../core/services/notification.service";
import {ChipService} from "../../../../core/services/chip.service";
import {OpenFlot} from "../../../../core/interfaces/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-or-edit-table',
  templateUrl: './add-or-edit-table.component.html',
  styleUrls: ['./add-or-edit-table.component.scss']
})
export class AddOrEditTableComponent implements OnInit {
  form: FormGroup;
  chipData: Chip[] = [];

  constructor(
    private fb: FormBuilder,
    private tableService: TableService,
    private notificationService: NotificationService,
    private chipService: ChipService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      open_flot: this.fb.array([]) // Initialize as a FormArray
    });
  }

  ngOnInit(): void {
    this.getChips();
  }

  getChips(): void {
    this.chipService.getChips().subscribe(data => {
      this.chipData = data;
      this.setUpOpenFlotArray(); // Set up FormArray based on chipData
    });
  }

  setUpOpenFlotArray(): void {
    const openFlotArray = this.form.get('open_flot') as FormArray;
    this.chipData.forEach(() => {
      openFlotArray.push(this.fb.control(0, Validators.required)); // Initialize with zero
    });
  }

  createTable(): void {
    if (this.form.invalid) {
      this.notificationService.showError('Please fill in all required fields.');
      return;
    }

    const openFlot: number[] = this.form.get('open_flot')?.value; // Get quantities
    const openFlotObj: OpenFlot = this.chipData.reduce((acc: OpenFlot, chip, index) => {
      acc[chip.denomination.toString()] = openFlot[index]; // Ensure denomination is a string
      return acc;
    }, {} as OpenFlot); // Cast the initial value to OpenFlot

    const dataToSend = {
      name: this.form.value.name,
      open_flot: openFlotObj // Pass the formatted object to the backend
    };

    this.tableService.createTable(dataToSend).subscribe({
      next: (res) => {
        this.notificationService.showSuccess('Table created successfully!');
        this.router.navigate(['/table']);
      },
      error: (error) => {
        this.notificationService.showError('Error: ' + error.error.name[0]);
      }
    });
  }


}
