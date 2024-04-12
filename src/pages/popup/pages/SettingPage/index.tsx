import React, { useState } from 'react';
import { SettingMenuItem } from '../../Components/SettingMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage, setDominCurrency, setWalletOwner, setWalletTracker } from '@root/src/store/actions';
import { NUM_ABOUT_PAGE, NUM_HOME_PAGE, NUM_PAYMENT_PAGE, NUM_WALLET_PAGE, NUM_WALLET_TRACKER_PAGE } from '../consts';
import './style.scss';
import { AppState } from '@root/src/store/reducers';
import { DOMIN_CURRENCY, DOMIN_CURRENCY_INFO, getCurrencyUnit } from '@root/src/shared/utils/currency';
import { getCurrencyStr } from '@root/src/shared/utils/currency';
import { PLAN_TYPE, WALLET_OWNER, WALLET_TRACKER_TYPE } from '@root/src/shared/utils/consts';
import { message } from 'react-message-popup';

export const SettingPage = () => {
  const dispatch = useDispatch();
  const currentPlan = useSelector((state: AppState) => state.currentPlan);
  const dominCurrency = useSelector((state: AppState) => state.dominCurrency);
  const [domiCurrencyOpen, setDomiCurencyOpen] = useState(false);
  const [dominCurrencies, setDomainCurrencies] = useState(Object.keys(DOMIN_CURRENCY_INFO));

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };

  const updateCurDominCurrency = currency => {
    dispatch(setDominCurrency(currency));
  };

  const toggleDominCurrencyPopup = () => {
    setDomiCurencyOpen(!domiCurrencyOpen);
  };

  const upgradeProVersion = () => {
    navigatePage(NUM_PAYMENT_PAGE);
  };

  const gotoTrackWallet = ownerType => {
    if (currentPlan != PLAN_TYPE.PRO) {
      message.warning('Please upgrade your version', 4000);
      return;
    }
    dispatch(setWalletOwner(ownerType));
    navigatePage(NUM_WALLET_TRACKER_PAGE);
  };

  const getSelectedCurrencySign = () => {
    if (getCurrencyUnit(dominCurrency) == '$') return 'fa-dollar-sign';
    if (getCurrencyUnit(dominCurrency) == '¥') return 'fa-yen-sign';
    if (getCurrencyUnit(dominCurrency) == '€') return 'fa-euro-sign';
    if (getCurrencyUnit(dominCurrency) == '₹') return 'fa-indian-rupee-sign';
  };

  return (
    <div id="setting-root">
      <div id="setting-header">
        <button className="btn-icon" onClick={() => navigatePage(NUM_HOME_PAGE)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h2>Settings</h2>
      </div>

      <div id="setting-content">
        <SettingMenuItem
          icon={'fa-wallet'}
          pro={true}
          label="Track Your Wallets"
          action={() => gotoTrackWallet(WALLET_OWNER.MIME)}
        />
        <SettingMenuItem
          icon={'fa-diagram-project'}
          pro={true}
          label="Track Other Wallets"
          action={() => gotoTrackWallet(WALLET_OWNER.OTHER)}
        />
        <SettingMenuItem
          icon={getSelectedCurrencySign()}
          label="Currency Preference"
          action={() => toggleDominCurrencyPopup()}
        />
        <div className="div-domin-currency">
          {domiCurrencyOpen &&
            dominCurrencies.map(currency => {
              return (
                <div className="radio-bar" key={currency} onClick={() => updateCurDominCurrency(currency)}>
                  {currency == dominCurrency ? (
                    <i className="fa-solid fa-circle-check"></i>
                  ) : (
                    <i className="fa-solid fa-circle"></i>
                  )}
                  <p>{currency}</p>
                </div>
              );
            })}
        </div>
        <SettingMenuItem icon={'fa-circle-up'} label="Upgrade PRO Version" action={() => upgradeProVersion()} />

        <SettingMenuItem icon={'fa-circle-question'} label="About" action={() => navigatePage(NUM_ABOUT_PAGE)} />
      </div>
    </div>
  );
};
