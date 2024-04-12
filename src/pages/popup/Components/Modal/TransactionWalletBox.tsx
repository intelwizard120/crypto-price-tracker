import React, { useState, useMemo, useEffect, useRef } from 'react';
import './style.scss';
import { shorten } from '@root/src/shared/utils';
import { handleDownload } from '@root/src/shared/utils/download';
import { obj2csv } from '@root/src/shared/utils/csv';

interface modalProps {
  show: boolean;
  name: string;
  data: any[];
  onClose: () => void;
}
export const TransactionWalletBox: React.FC<modalProps> = ({ show, name, data, onClose }) => {
  const downloadData = () => {
    handleDownload(obj2csv(data), 'transactions.csv');
  };
  return (
    <div id="transactionModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-box">
        <div className="modal-header">
          <p>{name}</p>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal-content" style={{ height: 270, overflow: 'auto' }}>
          <div className="list-container">
            {data.slice(0, 10).map(item => {
              return (
                <div className="list-item" style={{ cursor: 'pointer', fontSize: 12, lineHeight: 14 }}>
                  <p>
                    {shorten(item.from_address)}&rarr;{shorten(item.from_address)}
                  </p>
                  <p>{item.transaction_index}</p>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="solid primary"
          style={{ marginTop: 20, paddingInline: 30, paddingBlock: 10 }}
          onClick={() => downloadData()}>
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};
