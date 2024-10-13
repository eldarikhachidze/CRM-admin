export interface Chip {
  id: string;
  denomination: string;
  date_created: string;
  date_edited?: any;
  date_deleted?: any;
}

export interface ChipCreateResponse {
  message: string;
}
