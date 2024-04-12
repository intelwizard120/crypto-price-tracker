import {Action, ActionType} from './actions';
import { NUM_HOME_PAGE } from '../pages/popup/pages/consts';
import { getStorage, setStorage } from '../shared/hooks/useStorage';
import { DOMIN_CURRENCY } from '../shared/utils/currency';
import { PLAN_TYPE, WALLET_OWNER, WALLET_TRACKER_TYPE } from '../shared/utils/consts';
import { formatDate } from '../shared/utils';
import { Wallet, FETCH_HISTORY, CURRENCY} from './types';

export interface AppState {
  currencyList: CURRENCY[];
  fetchList: string[];
  currentPage: number;
  moraliLoaded: boolean;
  alarmList: {};
  account: any;
  dominCurrency: DOMIN_CURRENCY;
  walletList: Wallet[];
  walletTracker: WALLET_TRACKER_TYPE;
  walletOwner: WALLET_OWNER;
  fetchHistory: FETCH_HISTORY;
  currentPlan: string;
}

const initialState : AppState = {
  fetchList: getStorage('fetchList') || ['Bitcoin', 'Ethereum', 'Tether'],
  alarmList: getStorage('alarm') || {},
  currencyList: [],
  currentPage: getStorage('currentPage') || NUM_HOME_PAGE,
  moraliLoaded: false,
  account: getStorage('account') || null,
  dominCurrency: getStorage('dominCurrency') || DOMIN_CURRENCY.USD,
  walletList: getStorage('walletList') || [],
  walletTracker: getStorage('walletTracker') || WALLET_TRACKER_TYPE.BALANCE,
  walletOwner: getStorage('walletOwner') || WALLET_OWNER.MIME,
  fetchHistory: getStorage('fetchHistory') || {lastDate:formatDate(new Date()), todayCall:0},
  currentPlan: getStorage('currentPlan') || PLAN_TYPE.FREE
};

const rootReducer = (state: AppState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_CURRENCY_LIST:
      return {
        ...state,
        currencyList: action.payload,
      };
    case ActionType.SET_FETCH_LIST:
      setStorage('fetchList', action.payload);
      return {
        ...state,
        fetchList: action.payload,
      };
    case ActionType.SET_ALARM_LIST:
      setStorage('alarm', action.payload);
      return {
        ...state,
        alarmList: action.payload,
      };
    case ActionType.SET_CURRENT_PAGE:
      setStorage('currentPage', action.payload);
      return {
        ...state,
        currentPage: action.payload,
      };
    case ActionType.SET_MORALI_LOADED:
      return {
        ...state,
        moraliLoaded: action.payload,
      };
    case ActionType.SET_ACCOUNT:
      setStorage('account', action.payload);
      return {
        ...state,
        account: action.payload,
      };
    case ActionType.SET_DOMIN_CURRENCY:
      setStorage('dominCurrency', action.payload);
      return {
        ...state,
        dominCurrency: action.payload,
      };
    case ActionType.SET_WALLET_LIST:
      setStorage('walletList', action.payload);
      return {
        ...state,
        walletList: action.payload,
      };
    case ActionType.SET_WALLET_TRACKER:
      setStorage('walletTracker', action.payload);
      return {
        ...state,
        walletTracker: action.payload,
      };
    case ActionType.SET_WALLET_OWNER:
      setStorage('walletOwner', action.payload);
      return {
        ...state,
        walletOwner: action.payload,
      };
    case ActionType.SET_FETCH_HISTORY:
      setStorage('fetchHistory', action.payload);
      return {
        ...state,
        fetchHistory: action.payload,
      };
    case ActionType.SET_CURRENT_PLAN:
      setStorage('currentPlan', action.payload);
      return {
        ...state,
        currentPlan: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
