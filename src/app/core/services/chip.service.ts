import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {catchError, Observable, throwError} from "rxjs";
import {Chip, ChipCreateResponse} from "../interfaces/chip";

@Injectable({
  providedIn: 'root'
})
export class ChipService extends BaseService {


  getChips(): Observable<Chip[]> {
    return this.get<Chip[]>('chip/');
  }

  getChip(id: number): Observable<Chip> {
    return this.get<Chip>(`chip/${id}/`);
  }

  createChip(data: any): Observable<any> {
    return this.post<any>('chip/', data)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  updateChip(id: string, data: any) {
    return this.put(`chip/${id}/`, data)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  deleteChip(id: number): Observable<any> {
    return this.delete(`chip/${id}/`)
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }
}
