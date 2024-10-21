import {Component, OnInit} from '@angular/core';
import {TableService} from "../../core/services/table.service";
import {Table} from "../../core/interfaces/table";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tableData: Table[] = [];

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.getTables();
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
    this.tableService.deleteTable(id).subscribe(() => {
      this.getTables();
    });
  }
}
