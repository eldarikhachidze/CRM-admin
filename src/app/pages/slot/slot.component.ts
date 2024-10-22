import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../core/services/slot.service";
import {PitService} from "../../core/services/pit.service";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})
export class SlotComponent implements OnInit {
  slotData: any
  halls: any
  selectedHall: { [key: number]: number } = {};  // Track sel
  constructor(
    private slotService: SlotService,
    private pitService: PitService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.loadSlots();
    this.loadHalls();
  }

  loadSlots() {
    this.slotService.getSlotMachines().subscribe(data => {
      this.slotData = data;
    });
  }

  loadHalls() {
    this.pitService.getPits().subscribe(data => {
      this.halls = data;
    });
  }

  remove(slotId: number) {
    this.slotService.removeSlotMachine(slotId).subscribe(res => {
      if (res && res.message) {
        this.notificationService.showSuccess(res.message);
        this.loadSlots();
      }
    })
  }

  assignHall(slotId: number, hallId: number) {
    if (!hallId) return;
    this.slotService.addSlotMachineToHall(slotId, hallId).subscribe(response => {
      this.loadSlots();
    });
  }

  removeHall(slotId: number) {
    this.slotService.removeSlotMachineToHall(slotId).subscribe(response => {
      this.loadSlots();
    });
  }
}
