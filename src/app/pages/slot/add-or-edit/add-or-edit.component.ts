import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SlotService} from "../../../core/services/slot.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
  });
  slots: any;

  constructor(
    private slotService: SlotService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }



  createSlot() {
    if (this.form.invalid) {
      return;
    }
    this.slotService.createSlotMachine(this.form.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/slot']);
    })
  }
}
