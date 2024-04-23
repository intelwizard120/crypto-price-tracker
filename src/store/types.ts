import { WALLET_OWNER } from "../shared/utils/consts";

export interface Wallet{
  name: string;
  address: string;
  owner: WALLET_OWNER;
};
export interface FETCH_HISTORY{
  lastDate: string;
  todayCall: number;
}

export interface CURRENCY{
  name: string;
  symbol: string;
  logo: string;
  usd_price: number;
}

export interface TRANSACTION{
  from_address: string;
  to_address: string;
  value: string;
  block_timestamp: string;
}
export interface ALARM {
  type: string;
  value: number;
}