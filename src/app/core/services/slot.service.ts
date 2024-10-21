import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SlotService extends BaseService {

  createSlotMachine(data: any): Observable<any> {
    return this.post<any>('slot/slot-machines/', data);
  }

  getSlotMachines() {
    return this.get('slot/slot-machines/');
  }

  removeSlotMachineToHall(slotId: number) {
    return this.put(`slot/remove-slot-from-hall/${slotId}/`);
  }

  addSlotMachineToHall(slotId: number, hallId: number) {
    return this.put(`slot/add-slot-to-hall/${slotId}/${hallId}/`);
  }

  removeSlotMachine(slotId: number) {
    return this.delete(`slot/delete-slot-machine/${slotId}/`);
  }
}
