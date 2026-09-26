export type RollStatus = 'in_stock' | 'depleted' | 'remnant_discounted';

export interface InventoryRoll {
  id: string; // UUID
  variant_id: string; // UUID
  roll_code: string;
  dye_lot: string | null;
  initial_length_meters: number;
  available_meters: number;
  remnant_threshold: number;
  status: RollStatus;
  created_at: string;
  updated_at: string;
}

export interface SwatchCredit {
  id: string; // UUID
  user_id: string; // UUID
  order_item_id: string; // UUID
  credit_amount: number;
  is_redeemed: boolean;
  redeemed_at: string | null;
  redeemed_in_order_id: string | null;
  expires_at: string | null;
  created_at: string;
}

export interface AllocateContinuousFabricCutResponse {
  roll_id: string;
  roll_code: string;
  dye_lot: string | null;
}
