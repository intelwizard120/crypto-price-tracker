import React, { useState } from 'react';
import { SettingMenuItem } from '../../Components/SettingMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setDominCurrency, setWalletTracker } from '@root/src/store/actions';
import { NUM_ABOUT_PAGE, NUM_HOME_PAGE, NUM_PAYMENT_PAGE, NUM_SETTING_PAGE, NUM_WALLET_PAGE } from '../consts';
import './style.scss';
import { WALLET_OWNER, WALLET_TRACKER_TYPE } from '@root/src/shared/utils/consts';
import { AppState } from '@root/src/store/reducers';

export const WalletTrackerPage = () => {
  const dispatch = useDispatch();
  const walletOwner = useSelector((state: AppState) => state.walletOwner);

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };
  const showWalletList = trackerType => {
    dispatch(setWalletTracker(trackerType));
    navigatePage(NUM_WALLET_PAGE);
  };

  return (
    <div id="setting-root">
      <div id="setting-header">
        <button className="btn-icon" onClick={() => navigatePage(NUM_SETTING_PAGE)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h2>{walletOwner == WALLET_OWNER.MIME ? 'Track Your Wallets' : 'Track Other Wallets'}</h2>
      </div>

      <div id="setting-content">
        <SettingMenuItem
          icon={'fa-dollar-sign'}
          label="Portfolio Tracker"
          action={() => showWalletList(WALLET_TRACKER_TYPE.BALANCE)}
        />
        <SettingMenuItem icon={'fa-coins'} label="NFT Tracker" action={() => showWalletList(WALLET_TRACKER_TYPE.NFT)} />
        <SettingMenuItem
          icon={'fa-money-bill-transfer'}
          label="Transaction Tracker"
          action={() => showWalletList(WALLET_TRACKER_TYPE.TRANSACTION)}
        />
      </div>
    </div>
  );
};
