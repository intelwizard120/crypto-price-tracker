import React, { Component, useState } from 'react';
import './style.scss';
import { formatNumber } from '@root/src/shared/utils';
import { convertToCurrency, getCurrencyUnit } from '@root/src/shared/utils/currency';
import { useSelector } from 'react-redux';
import { AppState } from '@root/src/store/reducers';

interface currencyItemProps {
  logo: string;
  name: string;
  symbol: string;
  usd_price: number;
  usd_price_1hr_percent_change: number;
  editMode: boolean;
  onAlarm: () => void;
  onRemove: () => void;
}
export const CryptoCurrencyItem: React.FC<currencyItemProps> = ({
  logo,
  name,
  symbol,
  usd_price,
  usd_price_1hr_percent_change,
  editMode,
  onAlarm,
  onRemove,
}) => {
  const dominCurrency = useSelector((state: AppState) => state.dominCurrency);
  const getDisplayedPrice = price => {
    return formatNumber(convertToCurrency(price, dominCurrency));
  };

  return (
    <div className="list-item">
      <img src={logo} style={{ marginRight: 6 }}></img>
      <h3 style={{ width: 100 }}>{`${name}(${symbol.toUpperCase()})`}</h3>
      {!editMode ? (
        <>
          <p>
            {getCurrencyUnit(dominCurrency)}
            {getDisplayedPrice(usd_price)}
          </p>
          <p className={usd_price_1hr_percent_change > 0 ? 'rise' : 'fall'}>
            {(usd_price_1hr_percent_change > 0 ? '+' : '') + (usd_price_1hr_percent_change * 1).toFixed(2) + '%'}
          </p>
        </>
      ) : (
        <div>
          <button className="btn-icon" onClick={() => onAlarm()}>
            <i className="fa-solid fa-bell"></i>
          </button>
          <button className="btn-icon" onClick={() => onRemove()} style={{ marginLeft: 8 }}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};
