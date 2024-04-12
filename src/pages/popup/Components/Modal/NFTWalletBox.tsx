import React, { useState, useMemo, useEffect, useRef } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@root/src/store/reducers';
import { setWalletList } from '@root/src/store/actions';
import { handleDownload } from '@root/src/shared/utils/download';
import { obj2csv } from '@root/src/shared/utils/csv';

interface modalProps {
  show: boolean;
  name: string;
  data: any[];
  onClose: () => void;
}
export const NFTWalletBox: React.FC<modalProps> = ({ show, name, data, onClose }) => {
  const downloadData = () => {
    handleDownload(obj2csv(data), 'nft.csv');
  };

  return (
    <div id="nftModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
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
                <div className="list-item" style={{ cursor: 'pointer' }}>
                  <img src={item.collection_logo} style={{ marginRight: 6 }}></img>
                  <h3 style={{ width: 140 }}>{item.name}</h3>
                  <p>{item.token_id}</p>
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
