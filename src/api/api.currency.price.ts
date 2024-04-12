import Moralis from 'moralis';
import { MORALIS_API_KEY } from './config';
import store from '@root/src/store/store';
import { setMoraliLoaded } from '@root/src/store/actions';
import { FAKE_PRICE_DATA } from './fake/fake_price_data';

export const getCurrencyPrices = async (fetchList: string[]): Promise<any> => {
  try {
    if(!store.getState().moraliLoaded) {
      await Moralis.start({
        apiKey:
            MORALIS_API_KEY   
      });
    }
    store.dispatch(setMoraliLoaded(true));
    const response = await Moralis.EvmApi.marketData.getTopCryptoCurrenciesByMarketCap();
    //const response = FAKE_PRICE_DATA;
    return Promise.resolve(fetchList.filter(name => {
      return response.raw.filter(currency => currency.name == name).length;
    }).map(name => response.raw.find(currency => currency.name == name)));

  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}


export const getCurrencyPricesByFilter = async (keyword: string): Promise<any> => {
  try {
    const response = await Moralis.EvmApi.marketData.getTopCryptoCurrenciesByMarketCap();
    //const response = FAKE_PRICE_DATA;
    const filtered = response.raw.filter(currency => currency.name.includes(keyword));
    return Promise.resolve(filtered);

  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}
