import React, { useState, useMemo, useEffect } from 'react';
import './style.scss';
import { getCurrencyPrices, getCurrencyPricesByFilter } from '@root/src/api/api.currency.price';
import { useDispatch, useSelector } from 'react-redux';
import { PercentSlider } from '../PercentSlider/PercentSlider';

interface modalProps {
  show: boolean;
  onClose: () => void;
  message: string;
}
export const AlarmBox: React.FC<modalProps> = ({ show, onClose }) => {
  const [value, setValue] = useState(0);
  return (
    <div id="addModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-box">
        <div className="modal-header">
          <p></p>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal-content" style={{ textAlign: 'center' }}>
          <div className="message">
            <i className="fa-solid fa-circle-exclamation"></i>
            <p>{} </p>
          </div>
        </div>
      </div>
    </div>
  );
};
