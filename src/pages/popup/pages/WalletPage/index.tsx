import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import './style.scss';
import { ConnectProps, useDispatch, useSelector } from 'react-redux';
import 'react-loading-skeleton/dist/skeleton.css';
import { setCurrentPage, setWalletList } from '@root/src/store/actions';
import { AppState } from '@root/src/store/reducers';
import { Wallet } from '@root/src/store/types';
import { usePositionReorder } from '@src/shared/hooks/use-position-reorder';
import { DraggableItem } from '../../Components/DraggableItem';
import { CHAINS, WALLET_TRACKER_TYPE } from '@root/src/shared/utils/consts';
import { NUM_SETTING_PAGE, NUM_WALLET_TRACKER_PAGE } from '../consts';
import { CryptoWalletItem } from '../../Components/CryptoWalletItem';
import { AddWalletBox } from '../../Components/Modal/AddWalletBox';
import { getWalletBalance } from '@root/src/api/api.wallet.balance';
import { getWalletNFTs } from '@root/src/api/api.wallet.nft';
import { EditWalletBox } from '../../Components/Modal/EditWalletBox';
import { NFTWalletBox } from '../../Components/Modal/NFTWalletBox';
import { TransactionWalletBox } from '../../Components/Modal/TransactionWalletBox';
import { getWalletTransactions } from '@root/src/api/api.wallet.transaction';

let tId: number = 0;

export const WalletPage: React.FC = () => {
  const walletOwner = useSelector((state: AppState) => state.walletOwner);
  const walletTracker = useSelector((state: AppState) => state.walletTracker);
  const walletList = useSelector((state: AppState) => state.walletList);
  const [balanceData, setBalanceData] = useState([]);
  const [order, setOrder, updatePosition, updateOrder] = usePositionReorder([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [chain, setChain] = useState(CHAINS.ether);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [selectedWalletData, setSelectedWalletData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [nftModal, setNFTModal] = useState(false);
  const [transactionModal, setTransactionModal] = useState(false);
  const dispatch = useDispatch();

  const getMyWalletList = () => {
    return walletList.filter(wallet => wallet.owner == walletOwner);
  };

  const fetchWalletBalance = () => {
    getWalletBalance(
      chain.id,
      getMyWalletList().map(item => item.address),
    )
      .then(res => {
        setBalanceData(res);
      })
      .catch(err => {
        alert(err);
      });
  };

  const fetchWalletNFT = address => {
    getWalletNFTs(chain.id, address)
      .then(res => {
        setSelectedWalletData(res);
      })
      .catch(err => {
        alert(err);
      });
  };

  const fetchWalletTransactions = address => {
    getWalletTransactions(chain.id, address)
      .then(res => {
        setSelectedWalletData(res);
      })
      .catch(err => {
        alert(err);
      });
  };

  useEffect(() => {
    fetchWalletBalance();
    //setInterval(() => fetchPriceData, 2000);
    return () => {
      //clearInterval(tId);
    };
  }, [walletList, chain]);

  useEffect(() => {
    setOrder(walletList.filter(wallet => wallet.owner && wallet.owner == walletOwner));
  }, [walletList]);

  const handleSave = () => {
    const otherOwnerWallets: Wallet[] = walletList.filter(wallet => {
      return wallet.owner && wallet.owner != walletOwner;
    });
    dispatch(setWalletList([...otherOwnerWallets, ...order]));
    setEditMode(false);
  };

  const handleAdd = () => {
    setAddModal(true);
  };

  const handleBtnClick = () => {
    if (editMode) handleSave();
    else handleAdd();
  };
  const removeItem = index => {
    setOrder(order.filter((_, i) => i != index));
  };

  useEffect(() => {}, [order]);

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };

  const getTrackerStr = () => {
    if (walletTracker == WALLET_TRACKER_TYPE.BALANCE) return 'Balance';
    if (walletTracker == WALLET_TRACKER_TYPE.NFT) return 'NFT';
    if (walletTracker == WALLET_TRACKER_TYPE.TRANSACTION) return 'Transaction';
  };

  const selectWallet = index => {
    setSelectedIndex(index);
    const curWallet = getMyWalletList()[index];
    setSelectedWallet(curWallet);
    if (walletTracker == WALLET_TRACKER_TYPE.BALANCE) {
      setEditModal(true);
    }
    if (walletTracker == WALLET_TRACKER_TYPE.NFT) {
      setNFTModal(true);
      fetchWalletNFT(curWallet.address);
    }
    if (walletTracker == WALLET_TRACKER_TYPE.TRANSACTION) {
      fetchWalletTransactions(curWallet.address);
      setTransactionModal(true);
    }
  };

  const updateWalletData = data => {
    dispatch(setWalletList(walletList.map((item, index) => (index == selectedIndex ? data : item))));
  };

  return (
    <div className="wallet-list-root">
      <div className="wallet-list-header">
        <div>
          <button className="btn-icon" onClick={() => navigatePage(NUM_WALLET_TRACKER_PAGE)}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <h2>{getTrackerStr() + ' Tracker'}</h2>
        </div>

        <div>
          <select onChange={e => setChain(CHAINS[e.target.value])}>
            {Object.keys(CHAINS).map(name => {
              return (
                <option value={name} selected={chain.name == name}>
                  {name}
                </option>
              );
            })}
          </select>
          <button className="btn-icon" style={{ marginInline: 10 }} onClick={() => setEditMode(!editMode)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      </div>
      <div className="wallet-list-content">
        <div className="wallet-listbox">
          {!order || order.length == 0 ? (
            <div className="banner-no-wallet">
              <i className="fa-solid fa-wallet"></i>
              <p>&nbsp;&nbsp;No wallets</p>
            </div>
          ) : (
            order.map((item, i) =>
              !editMode ? (
                <CryptoWalletItem
                  {...item}
                  balance={i < balanceData.length ? balanceData[i] : ''}
                  editMode={editMode}
                  onClick={() => selectWallet(i)}
                />
              ) : (
                <DraggableItem
                  key={item.name}
                  height={50}
                  i={i}
                  updatePosition={updatePosition}
                  updateOrder={updateOrder}>
                  <CryptoWalletItem
                    {...item}
                    editMode={editMode}
                    balance={balanceData[i]}
                    onRemove={() => removeItem(i)}
                  />
                </DraggableItem>
              ),
            )
          )}
        </div>
      </div>
      <button id="btn-add" className="solid primary" style={{ marginTop: 20 }} onClick={() => handleBtnClick()}>
        {editMode ? 'Save' : 'Add'}
      </button>

      {addModal && <AddWalletBox show={addModal} onClose={() => setAddModal(false)} />}
      {editModal && (
        <EditWalletBox
          show={editModal}
          onClose={() => setEditModal(false)}
          defaultName={selectedWallet.name}
          address={selectedWallet.address}
          onSetData={updateWalletData}
        />
      )}
      {nftModal && (
        <NFTWalletBox
          show={nftModal}
          name={selectedWallet.name}
          data={selectedWalletData}
          onClose={() => setNFTModal(false)}
        />
      )}
      {transactionModal && (
        <TransactionWalletBox
          show={transactionModal}
          chain={chain.name}
          address={selectedWallet.address}
          name={selectedWallet.name}
          data={selectedWalletData}
          onClose={() => setTransactionModal(false)}
        />
      )}
    </div>
  );
};
