import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {catchError, Observable, throwError} from "rxjs";
import {Table} from "../interfaces/table";

@Injectable({
  providedIn: 'root'
})
export class TableService extends BaseService {

  getTables(): Observable<Table> {
    return this.get<Table>('table/create/')
      .pipe(
        catchError(error => {
          return throwError(error)
        })
      )
  }

  createTable(data: any): Observable<any> {
    return this.post<any>('table/create/', data)
  }

  deleteTable(id: number): Observable<Table> {
    return this.delete<Table>(`table/delete/${id}/`)
  }
}
