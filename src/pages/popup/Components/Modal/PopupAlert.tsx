import React, { useState, useMemo, useEffect } from 'react';
import './style.scss';
import './popup.alert.scss';
import { formatNumber } from '@root/src/shared/utils';

interface modalProps {
  show: boolean;
  onClose: () => void;
  notifyList: any;
}
export const PopupAlert: React.FC<modalProps> = ({ show, onClose, notifyList }) => {
  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-box">
        <div className="modal-header">
          <p>Price Alert!</p>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal-content">
          {notifyList.map(currency => {
            return (
              <div className="list-item">
                <img src={currency.logo} style={{ marginRight: 6 }}></img>
                <h3 style={{ width: 70 }}>{`${currency.name}(${currency.symbol.toUpperCase()})`}</h3>
                <p>
                  {'$'}
                  {formatNumber(currency.usd_price)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
