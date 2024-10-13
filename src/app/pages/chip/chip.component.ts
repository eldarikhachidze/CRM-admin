import {Component, OnInit} from '@angular/core';
import {ChipService} from "../../core/services/chip.service";
import {Chip} from "../../core/interfaces/chip";
import {NotificationService} from "../../core/services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent implements OnInit {


  chipData: Chip[] = [];

  constructor(
    private chipService: ChipService,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.getChips();
  }

  getChips(): void {
    this.chipService.getChips().subscribe(data => {
      this.chipData = data;
      console.log(this.chipData);
    });
  }

  remove(id: number): void {
    this.chipService.deleteChip(id).subscribe({
      next: (res) => {
        if (res && res.message) {
          this.notificationService.showSuccess(res.message);
          this.getChips();
        }
      },
      error: (error) => {
        console.error('Error:', error.error.denomination[0]);
        this.notificationService.showError(error.error.message || 'An error occurred');
      }
    });
  }




}
