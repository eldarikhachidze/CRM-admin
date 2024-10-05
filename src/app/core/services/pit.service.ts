import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class PitService extends BaseService {

  getPits() {
    return this.get('slot/halls/');
  }
}
