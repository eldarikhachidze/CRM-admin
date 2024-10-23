export interface Table {
  id: number;
  name: string;
  open_flot_total: number;
  result: number;
  date_created: string;
  date_edited?: any;
  date_deleted?: any;
  open_flot: OpenFlot[]
  hall?: any;

}

export interface OpenFlot {
  [denomination: string]: number; // This allows string keys for denominations
  quantity: number;
}

export interface TableHall {
  id: number;
  name: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
}
