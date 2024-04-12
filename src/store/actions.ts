import { UnknownAction } from "redux";

export enum ActionType {
  SET_CURRENCY_LIST = 'SET_CURRENCY_LIST',
  SET_FETCH_LIST = 'SET_FETCH_LIST',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_MORALI_LOADED = 'SET_MORALI_LOAD',
  SET_ALARM_LIST = 'SET_ALARM_LIST',
  SET_DOMIN_CURRENCY = 'SET_DOMIN_CURRENCY',
  SET_ACCOUNT = 'SET_ACCOUNT',
  SET_WALLET_LIST = 'SET_WALLET_LIST',
  SET_WALLET_OWNER = 'SET_WALLET_OWNWER',
  SET_WALLET_TRACKER = 'SET_WALLET_TRACKER',
  
  SET_FETCH_HISTORY = 'SET_FETCH_HISTORY',
  SET_CURRENT_PLAN = 'SET_CURRENT_PLAN',
}

export interface Action extends UnknownAction {
  type: ActionType;
  payload: any;
};


export const setCurrencyList = (data: object[]) : Action => ({
  type: ActionType.SET_CURRENCY_LIST,
  payload: data,
});

export const setFetchList = (data: string[]) : Action => ({
  type: ActionType.SET_FETCH_LIST,
  payload: data,
});

export const setAlarmList = (data: string[]) : Action => ({
  type: ActionType.SET_ALARM_LIST,
  payload: data,
});

export const setMoraliLoaded = (data: boolean) : Action => ({
  type: ActionType.SET_MORALI_LOADED,
  payload: data,
});

export const setCurrentPage = (data: number) : Action => ({
  type: ActionType.SET_CURRENT_PAGE,
  payload: data,
});
export const setDominCurrency = (data: number) : Action => ({
  type: ActionType.SET_DOMIN_CURRENCY,
  payload: data,
});

export const setAccount = (data: any) : Action => ({
  type: ActionType.SET_ACCOUNT,
  payload: data,
});

export const setWalletList = (data: any) : Action => ({
  type: ActionType.SET_WALLET_LIST,
  payload: data,
});

export const setWalletTracker = (data: any) : Action => ({
  type: ActionType.SET_WALLET_TRACKER,
  payload: data,
});

export const setWalletOwner = (data: any) : Action => ({
  type: ActionType.SET_WALLET_OWNER,
  payload: data,
});

export const setFetchHistory = (data: any) : Action => ({
  type: ActionType.SET_FETCH_HISTORY,
  payload: data,
});

export const setCurrentPlan = (data: any) : Action => ({
  type: ActionType.SET_CURRENT_PLAN,
  payload: data,
});
