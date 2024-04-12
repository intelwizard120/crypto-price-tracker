import React, { Component, useState } from 'react';
import './style.scss';
import { formatNumber } from '@root/src/shared/utils';
import { convertToCurrency, getCurrencyUnit } from '@root/src/shared/utils/currency';
import { useSelector } from 'react-redux';
import { AppState } from '@root/src/store/reducers';

interface currencyItemProps {
  name: string;
  address: string;
  chain: string;
  balance: number;
  editMode: boolean;
  onClick: () => void;
  onRemove: () => void;
}
const colors = ['#87CEEB', '#FF7F50', '#50C878', '#E6E6FA', '#008080', '#DAA520', '#708090', '#E0115F'];
export const CryptoWalletItem: React.FC<currencyItemProps> = ({
  name,
  address,
  chain = '0x1',
  balance,
  editMode,
  onClick,
  onRemove,
}) => {
  const dominCurrency = useSelector((state: AppState) => state.dominCurrency);

  const getColorByName = () => {
    if (!name) name = '';
    const index = name.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    return colors[index % 8];
  };
  return (
    <div className="list-item" style={{ cursor: 'pointer' }} onClick={onClick}>
      <div className="row-center">
        <div className="solid-logo" style={{ backgroundColor: getColorByName() }}>
          {name?.toUpperCase()[0]}
        </div>
        <h3 style={{ width: 100 }}>{name}</h3>
      </div>
      {!editMode ? (
        <>
          <p>{'$' + formatNumber(balance)}</p>
        </>
      ) : (
        <div>
          <button className="btn-icon" onClick={() => onRemove()}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      )}
    </div>
  );
};
