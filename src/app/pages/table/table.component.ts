import {Component, OnInit} from '@angular/core';
import {TableService} from "../../core/services/table.service";
import {Table, TableHall} from "../../core/interfaces/table";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableData: Table[] = [];
  hallData: TableHall[] = [];
  selectedHall: { [key: number]: number } = {};  // Track sel

  constructor(
    private tableService: TableService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.getTables();
    this.getHall();
  }


  getHall() {
    this.tableService.getHall().subscribe((data) => {
      console.log(data);
      this.hallData = data;
    });
  }

  getTables() {
    this.tableService.getTables().subscribe((data: any) => {
      this.tableData = data.map((item: any) => {
        // Convert open_flot to an array of objects and sort by denomination
        const sortedOpenFlot = Object.entries(item.open_flot)
          .map(([denomination, quantity]) => ({
            denomination,
            quantity
          }))
          .sort((a, b) => parseFloat(a.denomination) - parseFloat(b.denomination));

        return {...item, open_flot: sortedOpenFlot}; // Return the item with sorted open_flot
      });
      console.log(this.tableData);
    });
  }


  delete(id: number) {
    this.tableService.deleteTable(id).subscribe((res) => {
      if (res && res.message) {
        this.notificationService.showSuccess(res.message);
        this.getTables();
      }
    });
  }

  assignHall(id: number, hallId: number) {
    this.tableService.addSTableToHall(id, hallId).subscribe(res => {
      if (res && res.message) {
        this.notificationService.showSuccess(res.message);
        this.getTables();
      }
    });
  }

  removeHall(id: number) {
    this.tableService.removeTableFromHall(id).subscribe(res => {
      if (res && res.message) {
        this.notificationService.showSuccess(res.message);
        this.getTables();
      }
    });
  }
}
