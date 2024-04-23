import React, { useState, useMemo, useEffect, useRef } from 'react';
import './style.scss';
import { getCurrencyPrices, getCurrencyPricesByFilter } from '@root/src/api/api.currency.price';
import { useDispatch, useSelector } from 'react-redux';
import { PercentSlider } from '../PercentSlider/PercentSlider';
import { AppState } from '@root/src/store/reducers';
import { setAlarmList } from '@root/src/store/actions';
import { clone } from '@root/src/shared/utils/shared';
import { CURRENCY } from '@root/src/store/types';

interface modalProps {
  show: boolean;
  onClose: () => void;
  selectedCurrency: CURRENCY;
  setAlarmValue: CallableFunction;
}
export const AlarmBox: React.FC<modalProps> = ({ show, onClose, selectedCurrency, setAlarmValue }) => {
  const [rateValue, setRateValue] = useState(0);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const alarm = useSelector((state: AppState) => state.alarmList);

  const getPriceForRate = rate => {
    return (1 + rate) * selectedCurrency?.usd_price;
  };

  const getPriceValue = rate => {
    return parseFloat(getPriceForRate(rate).toFixed(2));
  };

  const getRateForPrice = value => {
    return (value - selectedCurrency.usd_price) / selectedCurrency.usd_price;
  };

  const onPriceValueChange = value => {
    setRateValue(getRateForPrice(value));
  };

  const onRateChange = value => {
    setRateValue(value);
    inputRef.current.value = getPriceValue(value);
  };

  const removeAlarm = () => {
    const newAlarm = clone(alarm);
    delete newAlarm[selectedCurrency.name];
    dispatch(setAlarmList(newAlarm));
    onClose();
  };

  const getAlarmValue = () => {
    const name = selectedCurrency.name;
    return alarm[name] ? alarm[name]?.value : selectedCurrency?.usd_price;
  };

  const confirm = () => {
    if (rateValue > 0) setAlarmValue({ type: 'up', value: getPriceValue(rateValue) });
    else setAlarmValue({ type: 'down', value: getPriceValue(rateValue) });
  };

  useEffect(() => {
    setRateValue(getRateForPrice(getAlarmValue()));
    inputRef.current.value = getAlarmValue();
  }, []);

  return (
    <div id="addModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-box">
        <div className="modal-header">
          <p>Set Alarm</p>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        {selectedCurrency && (
          <div className="modal-content" style={{ textAlign: 'center' }}>
            <img src={selectedCurrency?.logo} style={{ marginBottom: 7, width: 50, height: 50 }}></img>
            <p style={{ margin: 0 }}>
              {selectedCurrency &&
                '1' + selectedCurrency.symbol?.toUpperCase() + '=' + selectedCurrency?.usd_price + 'USD'}
            </p>
            <div
              className={'input-alarm ' + (getPriceValue(rateValue) > selectedCurrency?.usd_price ? 'rise' : 'fall')}>
              <i
                className={
                  getPriceValue(rateValue) > selectedCurrency?.usd_price
                    ? 'fa-solid fa-chevron-up'
                    : 'fa-solid fa-chevron-down'
                }></i>
              <input
                ref={inputRef}
                defaultValue={selectedCurrency.usd_price}
                onChange={e => onPriceValueChange(e.target.value)}></input>
              <p>USD</p>
            </div>
            <div>
              <PercentSlider value={rateValue} onValueChange={rate => onRateChange(rate)} />
            </div>
            <div className="row-center" style={{ marginTop: 20, paddingInline: 20 }}>
              {
                <button className="solid normal" onClick={() => removeAlarm()}>
                  Remove
                </button>
              }
              <button className="solid primary" style={{ marginLeft: 20 }} onClick={() => confirm()}>
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
