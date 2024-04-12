import Moralis from 'moralis';
import { FAKE_PRICE_DATA } from './fake/fake_price_data';
import { FAKE_WALLET_TRANSACTION_DATA } from './fake/fake_wallet_transaction';
import store from '../store/store';
import { MORALIS_API_KEY } from './config';
import { setMoraliLoaded } from '../store/actions';

export const getWalletTransactions = async (chain, address): Promise<any> => {
  try {
    if(!store.getState().moraliLoaded) {
      await Moralis.start({
        apiKey:
            MORALIS_API_KEY   
      });
    }
    store.dispatch(setMoraliLoaded(true));
    //const response = FAKE_WALLET_TRANSACTION_DATA;
    const response = await Moralis.EvmApi.transaction.getWalletTransactions({
    "chain": "0x1",
    "order": "DESC",
    "address": address
  });
    return Promise.resolve(response.raw.result);

  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}
