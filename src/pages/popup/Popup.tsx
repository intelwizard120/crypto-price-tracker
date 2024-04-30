import React, { useState, useEffect } from 'react';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { HomePage } from './pages/HomePage';
import { SettingPage } from './pages/SettingPage';
import { useDispatch, useSelector } from 'react-redux';
import { useStorage } from '@root/src/shared/hooks/useStorage';
import {
  NUM_ABOUT_PAGE,
  NUM_FORGOT_PWD_PAGE,
  NUM_HOME_PAGE,
  NUM_LOGIN_PAGE,
  NUM_PAYMENT_PAGE,
  NUM_RATING_PAGE,
  NUM_REGISTER_PAGE,
  NUM_SETTING_PAGE,
  NUM_WALLET_PAGE,
  NUM_WALLET_TRACKER_PAGE,
} from './pages/consts';
import { AppState } from '@root/src/store/reducers';
import { LoginPage } from './pages/LoginPage';
import { setCurrentPage } from '@root/src/store/actions';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPwdPage } from './pages/ForgotPwdPage';
import { WalletPage } from './pages/WalletPage';
import { PaymentPage } from './pages/PaymentPage';
import { WalletTrackerPage } from './pages/WalletTrackerPage';
import { RatingPage } from './pages/RatingPage';
import { AboutPage } from './pages/AboutPage';

const MainPages = [
  {
    index: NUM_HOME_PAGE,
    Component: <HomePage />,
  },
  {
    index: NUM_SETTING_PAGE,
    Component: <SettingPage />,
  },
  {
    index: NUM_WALLET_PAGE,
    Component: <WalletPage />,
  },
  {
    index: NUM_PAYMENT_PAGE,
    Component: <PaymentPage />,
  },
  {
    index: NUM_WALLET_TRACKER_PAGE,
    Component: <WalletTrackerPage />,
  },
  {
    index: NUM_ABOUT_PAGE,
    Component: <AboutPage />,
  },
  {
    index: NUM_RATING_PAGE,
    Component: <RatingPage />,
  },
];

const AuthPages = [
  {
    index: NUM_LOGIN_PAGE,
    Component: <LoginPage />,
  },
  {
    index: NUM_REGISTER_PAGE,
    Component: <RegisterPage />,
  },
  {
    index: NUM_FORGOT_PWD_PAGE,
    Component: <ForgotPwdPage />,
  },
];

const Popup = () => {
  const [theme, setTheme] = useStorage('theme', 'light');
  const account = useSelector((state: AppState) => state.account);
  const dispatch = useDispatch();
  const currentPage = useSelector((state: AppState) => state.currentPage);

  useEffect(() => {
    if (!account) dispatch(setCurrentPage(NUM_LOGIN_PAGE));
  }, []);
  return (
    <div id="root" className={theme == 'dark' ? 'dark' : ''}>
      {account
        ? MainPages.map(page => page.index == currentPage && page.Component)
        : AuthPages.map(page => page.index == currentPage && page.Component)}
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error </div>);
