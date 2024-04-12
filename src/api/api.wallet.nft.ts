import Moralis from 'moralis';
import { MORALIS_API_KEY } from './config';
import store from '@root/src/store/store';
import { setMoraliLoaded } from '@root/src/store/actions';
import { FAKE_WALLET_NFT_DATA } from './fake/fake_wallet_nft';

export const getWalletNFTs = async (chain, address): Promise<any> => {
  try {
    if(!store.getState().moraliLoaded) {
      await Moralis.start({
        apiKey:
            MORALIS_API_KEY   
      });
    }
    store.dispatch(setMoraliLoaded(true));
    //const response = FAKE_WALLET_NFT_DATA;
    const response = await Moralis.EvmApi.nft.getWalletNFTs({
    "chain": "0x1",
    "format": "decimal",
    "mediaItems": false,
    "address": address
  });
    return Promise.resolve(response.raw.result);

  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}
