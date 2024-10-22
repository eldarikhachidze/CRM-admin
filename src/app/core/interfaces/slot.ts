export interface Dailyamount {
  id: number;
  amount: string;
  slot_machine: number;
  game_day: number;
}
export interface SlotMachine {
  id: number;
  daily_amounts: Dailyamount[];
  name: string;
  brand: string;
  created_at: string;
  updated_at?: any;
  deleted_at?: any;
  hall?: number;
}
