import React, { useState, useMemo, useEffect, useRef } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@root/src/store/reducers';
import { setWalletList } from '@root/src/store/actions';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';

const projectId = '6fadb3cd60a1a14ff379f875a0f3e917';

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

// 3. Create a metadata object
const metadata = {
  name: 'CoinWatch',
  description: 'CryptoCurrency Wallet Tracker',
  url: 'https://coinwatch.com', // origin must match your domain & subdomain
  icons: ['https://avatars.coinwatch.com/'],
};

// 4. Create Ethers config
export const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  //defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

interface modalProps {
  show: boolean;
  onClose: () => void;
}
export const AddWalletBox: React.FC<modalProps> = ({ show, onClose }) => {
  const [name, setName] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const walletOwner = useSelector((state: AppState) => state.walletOwner);
  const walletList = useSelector((state: AppState) => state.walletList);
  const dispatch = useDispatch();
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  const checkDuplication = name => {
    return !walletList.find(wallet => wallet.name == name);
  };
  const addWallet = () => {
    if (checkDuplication(name))
      dispatch(setWalletList([...walletList, { name, address: inputAddress, owner: walletOwner }]));
    onClose();
  };

  useEffect(() => {
    setInputAddress(address);
  }, [address]);

  const { open } = useWeb3Modal();

  return (
    <div id="addModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-box">
        <div className="modal-header">
          <p>New Wallet</p>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal-content">
          <div className="row-center">
            <p>&nbsp;&nbsp;Name:</p>
            <input
              type="text"
              placeholder=""
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ marginLeft: 10 }}></input>
          </div>
          <div className="row-center" style={{ marginTop: 6 }}>
            <p>Address:</p>
            <input
              type="text"
              placeholder=""
              value={inputAddress}
              onChange={e => setInputAddress(e.target.value)}
              style={{ marginLeft: 10 }}></input>
          </div>
          <div className="row-center" style={{ marginTop: 20 }}>
            <button className="solid success" style={{ paddingInline: 20, paddingBlock: 6 }} onClick={() => open()}>
              Connect
            </button>
            <button
              className="solid primary"
              style={{ paddingInline: 20, paddingBlock: 6, marginLeft: 20 }}
              onClick={() => addWallet()}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
