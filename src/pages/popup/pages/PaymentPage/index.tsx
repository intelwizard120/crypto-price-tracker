import React, { useState } from 'react';
import { NUM_SETTING_PAGE } from '../consts';
import { PaymentElement, Elements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { setCurrentPage, setCurrentPlan } from '@root/src/store/actions';
import ExtPay from 'extpay';
import './style.scss';
import { PLAN_TYPE } from '@root/src/shared/utils/consts';

const extpay = ExtPay('coinwatch---crypto-price-tracker');
extpay.startBackground();

extpay
  .getUser()
  .then(user => {
    if (user.paid) {
      //alert('paid');
    }
  })
  .catch(err => {
    alert(err.message);
  });

export const PaymentPage = () => {
  const dispatch = useDispatch();
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };

  const payForUpgrade = () => {
    extpay.openPaymentPage();
    dispatch(setCurrentPlan(PLAN_TYPE.PRO));
  };

  return (
    <div id="payment-root">
      <div id="payment-header">
        <button className="btn-icon" onClick={() => navigatePage(NUM_SETTING_PAGE)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h2>Upgrade using Payment </h2>
      </div>

      <div id="payment-content">
        <div className="pro-banner">
          <h2>Pro</h2>
          <div className="row-base">
            <h3>$9.99</h3>
            <h6>/per month</h6>
          </div>
          <p className="stmt">For professionals working in blockchain</p>
          <p>
            <i className="fa-solid fa-circle-check success"></i>No daily limit to price tracker
          </p>
          <p>
            <i className="fa-solid fa-circle-check success"></i>Allow alerts for prices
          </p>
          <p>
            <i className="fa-solid fa-circle-check success"></i>Access to NFT tracker
          </p>
          <p>
            <i className="fa-solid fa-circle-check success"></i>Access to Transaction tracker
          </p>
          <button className="solid btn-upgrade" onClick={payForUpgrade}>
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

const CheckoutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button className="solid primary" style={{ marginTop: 30 }}>
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
