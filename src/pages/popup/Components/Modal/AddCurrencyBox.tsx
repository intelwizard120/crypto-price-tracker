import React, { useState, useMemo, useEffect } from 'react';
import './style.scss';
import { getCurrencyPrices, getCurrencyPricesByFilter } from '@root/src/api/api.currency.price';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@root/src/store/reducers';
import debounce from 'lodash/debounce';
import { setFetchList } from '@root/src/store/actions';

interface modalProps {
  show: boolean;
  onClose: () => void;
}
export const AddCurrencyBox: React.FC<modalProps> = ({ show, onClose }) => {
  const [keyword, setKeyword] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const dispatch = useDispatch();
  const [popupSelected, setPopupSelected] = useState(false);
  const fetchList = useSelector((state: AppState) => state.fetchList);
  const [popupCurrencyList, setPopupCurrencyList] = useState([]);

  const onKeywordChange = value => {
    setPopupSelected(false);
    setKeyword(value);
    if (value) setPopupOpen(true);
    else setPopupOpen(false);
  };

  const updatePopupCurrencies = keyword => {
    getCurrencyPricesByFilter(keyword)
      .then(res => {
        setPopupCurrencyList(res);
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const debouncedUpdatePopup = useMemo(() => {
    return debounce(updatePopupCurrencies, 1000);
  }, []);

  const setPopupSelection = value => {
    setPopupSelected(true);
    setKeyword(value);
    setPopupOpen(false);
  };

  const checkDuplication = keyword => {
    return !fetchList.find(currency => currency == keyword);
  };
  const addFetchList = () => {
    if (popupSelected && checkDuplication(keyword)) {
      const newFetchList = [...fetchList, keyword];
      dispatch(setFetchList(newFetchList));
      onClose();
    }
  };

  useEffect(() => {
    if (!popupSelected) debouncedUpdatePopup(keyword);
  }, [keyword]);

  return (
    <div id="addModal" className="modal" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-box">
        <div className="modal-header">
          <p>New Currency</p>
          <span className="close" onClick={() => onClose()}>
            &times;
          </span>
        </div>
        <div className="modal-content">
          <div className="row-center">
            <div className="popup-currency" style={{ display: popupOpen ? 'block' : 'none' }}>
              {popupCurrencyList.map(currency => {
                return (
                  <div
                    key={currency.name}
                    className="popup-currency-item"
                    onClick={() => setPopupSelection(currency.name)}>
                    <img width={20} height={20} src={currency.logo}></img>
                    <p>{currency.name}</p>
                  </div>
                );
              })}
            </div>
            <p>Name:</p>
            <input
              type="text"
              placeholder=""
              value={keyword}
              onChange={e => onKeywordChange(e.target.value)}
              style={{ marginLeft: 10 }}></input>
          </div>
          <button className="solid primary" style={{ marginTop: 20, paddingInline: 20 }} onClick={() => addFetchList()}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
