import Moralis from 'moralis';
import { MORALIS_API_KEY } from './config';
import store from '@root/src/store/store';
import { setMoraliLoaded } from '@root/src/store/actions';
import { FAKE_PRICE_DATA } from './fake/fake_price_data';
import { FAKE_WALLET_BALANCE_DATA } from './fake/fake_wallet_balance';


export const getWalletBalance = async (chain, walletList: any[]): Promise<any> => {
  try {
    if(!store.getState().moraliLoaded) {
      await Moralis.start({
        apiKey:
            MORALIS_API_KEY   
      });
    }
    store.dispatch(setMoraliLoaded(true));
    //const response = await Moralis.EvmApi.marketData.getTopCryptoCurrenciesByMarketCap();
    //const response = FAKE_WALLET_BALANCE_DATA;
    if(!walletList.length) return [];

     const response = await Moralis.EvmApi.balance.getNativeBalancesForAddresses({
    "chain": chain,
    "walletAddresses": walletList
  });

    return Promise.resolve(response.raw[0].wallet_balances.map(value => value.balance_formatted));

  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}


export const getWalletBalance2 = async (walletList: any[]): Promise<any> => {
  try {
    if(!store.getState().moraliLoaded) {
      await Moralis.start({
        apiKey:
            MORALIS_API_KEY   
      });
    }
    store.dispatch(setMoraliLoaded(true));
    //const response = await Moralis.EvmApi.marketData.getTopCryptoCurrenciesByMarketCap();
    //const response = FAKE_WALLET_BALANCE_DATA;
    if(!walletList.length) return [];

     const response = await Moralis.EvmApi.balance.getNativeBalancesForAddresses({
    "chain": chain,
    "walletAddresses": walletList
  });

    return Promise.resolve(response.raw[0].wallet_balances.map(value => value.balance_formatted));

  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}
