import {Component, OnInit} from '@angular/core';
import {SlotService} from "../../core/services/slot.service";
import {PitService} from "../../core/services/pit.service";

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
    private pitService: PitService
  ) {
  }

  ngOnInit() {
    this.loadSlots();
    this.loadHalls();
  }

  loadSlots() {
    this.slotService.getSlotMachines().subscribe(data => {
      this.slotData = data;
      console.log('slotData', this.slotData);
    });
  }

  loadHalls() {
    this.pitService.getPits().subscribe(data => {
      this.halls = data;
      console.log('halls', this.halls);
    });
  }

  remove(slotId: number) {
    this.slotService.removeSlotMachine(slotId).subscribe(response => {
      console.log('response', response);
      this.loadSlots();
    });
  }

  assignHall(slotId: number, hallId: number) {
    if (!hallId) return;
    this.slotService.addSlotMachineToHall(slotId, hallId).subscribe(response => {
      console.log('response', response);
      this.loadSlots();
    });
  }

  removeHall(slotId: number) {
    this.slotService.removeSlotMachineToHall(slotId).subscribe(response => {
      this.loadSlots();  // Reload the slot data to reflect the changes
    });
  }
}
