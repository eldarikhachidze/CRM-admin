import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {catchError, Observable} from "rxjs";
import {SlotMachine} from "../interfaces/slot";

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

  getSlotMachine(id: number): Observable<SlotMachine> {
    return this.get<SlotMachine>(`slot/slot-machine/${id}/`);
  }

  updateSlotMachine(id: number, data: any): Observable<any> {
    return this.put<any>(`slot/slot-machine/${id}/`, data)
      .pipe(
        catchError(error => {
            return error
          }
        )
      )
  }

  removeSlotMachineToHall(id: number) {
    return this.put(`slot/remove-slot-from-hall/${id}/`);
  }

  addSlotMachineToHall(slotId: number, hallId: number) {
    return this.put(`slot/add-slot-to-hall/${slotId}/${hallId}/`);
  }

  removeSlotMachine(id: number): Observable<any> {
    return this.delete<any>(`slot/slot-machine/${id}/`)
  }
}
