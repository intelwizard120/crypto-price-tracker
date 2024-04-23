import React, { useState, useMemo, useEffect } from 'react';
import './style.scss';
import { getCurrencyPrices, getCurrencyPricesByFilter } from '@root/src/api/api.currency.price';
import { useDispatch, useSelector } from 'react-redux';
import { PercentSlider } from '../PercentSlider/PercentSlider';

interface modalProps {
  show: boolean;
  onClose: () => void;
  onSetCode: (v: any) => void;
}
export const PromoCodeBox: React.FC<modalProps> = ({ show, onClose, onSetCode }) => {
  const [code, setCode] = useState('');

  const confirm = () => {
    onSetCode(code);
    onClose();
  };

  return (
    <div id="promoModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-box">
        <div className="modal-header">
          <p>Enter Your Code</p>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal-content" style={{ textAlign: 'center' }}>
          <div className="row-center">
            <p>Code:</p>
            <input
              type="text"
              placeholder=""
              value={code}
              onChange={e => setCode(e.target.value)}
              style={{ marginLeft: 10 }}></input>
          </div>
          <button className="solid primary" style={{ marginTop: 20, paddingInline: 20 }} onClick={() => confirm()}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
