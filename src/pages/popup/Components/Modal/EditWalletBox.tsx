import React, { useState, useMemo, useEffect, useRef } from 'react';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@root/src/store/reducers';
import { setWalletList } from '@root/src/store/actions';
import { shorten } from '@root/src/shared/utils';
import { handleCopy } from '@root/src/shared/utils/clipboard';

interface modalProps {
  show: boolean;
  defaultName: string;
  address: string;
  onSetData: (v: any) => void;
  onClose: () => void;
}
export const EditWalletBox: React.FC<modalProps> = ({ show, defaultName, address, onSetData, onClose }) => {
  const [name, setName] = useState(defaultName);

  const setWallet = () => {
    onSetData({ name, address });
    onClose();
  };

  const copyAddress = () => {
    handleCopy(address);
  };

  return (
    <div id="editModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-box">
        <div className="modal-header">
          <p>Wallet Info</p>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal-content">
          <div className="row-center">
            <p>&nbsp;&nbsp;Name:</p>
            <input
              type="text"
              placeholder=""
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ marginLeft: 10 }}></input>
          </div>
          <div className="row-center" style={{ marginTop: 6 }}>
            <p>{shorten(address)}</p>
            <button className="btn-icon" onClick={() => copyAddress()}>
              <i className="fa-solid fa-clipboard"></i>
            </button>
          </div>
          <button className="solid primary" style={{ marginTop: 20, paddingInline: 20 }} onClick={() => setWallet()}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
