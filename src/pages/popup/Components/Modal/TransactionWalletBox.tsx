import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import { formatDateFromStr, formatDateTime, formatNumber, shorten } from '@root/src/shared/utils';
import { handleDownload } from '@root/src/shared/utils/download';
import { obj2csv } from '@root/src/shared/utils/csv';
import { TRANSACTION } from '@root/src/store/types';
import { getOneCurrencyPrice } from '@root/src/api/api.currency.price';
import { AppState } from '@root/src/store/reducers';
import { convertToCurrency, getCurrencyUnit } from '@root/src/shared/utils/currency';

interface modalProps {
  show: boolean;
  name: string;
  address: string;
  chain: string;
  data: TRANSACTION[];
  onClose: () => void;
}
export const TransactionWalletBox: React.FC<modalProps> = ({ show, name, chain, address, data, onClose }) => {
  const [currencyUsdPrice, setCurrencyUsdPrice] = useState(0);
  const dominCurrency = useSelector((state: AppState) => state.dominCurrency);

  const downloadData = () => {
    handleDownload(obj2csv(data), 'transactions.csv');
  };
  const rate = 1000000000000000000;

  useEffect(() => {
    //if (address && data.length)
    //console.log(address, data[0].to_address, address.toUpperCase() == data[0].to_address.toUpperCase());
  });

  const getCurrencyForChain = chain => {
    if (chain == 'bsc') return 'Bitcoin';
    if (chain == 'gnosis') return 'GNO';
    return 'Ethereum';
  };

  useEffect(() => {
    getOneCurrencyPrice(getCurrencyForChain(chain))
      .then(res => {
        console.log(res.usd_price);
        setCurrencyUsdPrice(res.usd_price);
      })
      .catch(err => {
        console.log(err);
      });
  }, [data]);

  const getDisplayedPrice = balance => {
    return formatNumber(convertToCurrency(balance * currencyUsdPrice, dominCurrency));
  };

  const isSameAddress = (addressA, addressB) => {
    return addressA.toUpperCase() == addressB.toUpperCase();
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
                <div className="list-item transaction-item">
                  <p style={{ position: 'absolute', left: '10px', top: '10px' }}>
                    {formatDateTime(item.block_timestamp)}
                  </p>
                  <div>
                    <p>
                      <b>From:</b>
                      {shorten(item.from_address, 3)}
                    </p>
                    <p>
                      <b>To:</b>
                      {shorten(item.to_address, 3)}
                    </p>
                  </div>

                  <p className={isSameAddress(item.to_address, address) ? 'rise' : 'fall'}>
                    <i
                      className={
                        isSameAddress(item.to_address, address)
                          ? 'fa-solid fa-circle-arrow-up'
                          : 'fa-solid fa-circle-arrow-down'
                      }></i>
                    &nbsp;{getCurrencyUnit(dominCurrency)}
                    {getDisplayedPrice(parseFloat(item.value) / rate)}
                  </p>
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
