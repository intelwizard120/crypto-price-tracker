import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import './style.scss';
import { ConnectProps, useDispatch, useSelector } from 'react-redux';
import { CryptoCurrencyItem } from '../../../Components/CryptoCurrencyItem';
import { getCurrencyPrices } from '@root/src/api/api.currency.price';
import 'react-loading-skeleton/dist/skeleton.css';
import { ClipLoader } from 'react-spinners';
import { CSSProperties } from 'react';
import { AddCurrencyBox } from '../../../Components/Modal/AddCurrencyBox';
import { useStorage } from '@root/src/shared/hooks/useStorage';
import { AppState } from '@root/src/store/reducers';
import { AlarmBox } from '../../../Components/Modal/AlarmBox';
import { DraggableItem } from '../../../Components/DraggableItem';
import { usePositionReorder } from '@src/shared/hooks/use-position-reorder';
import { PopupAlert } from '../../../Components/Modal/PopupAlert';
import { setAlarmList, setCurrencyList, setFetchHistory, setFetchList } from '@root/src/store/actions';
import { formatDate } from '@root/src/shared/utils';
import Skeleton from 'react-loading-skeleton';

interface contentProps {
  editMode: boolean;
  onSave: () => void;
}
const override: CSSProperties = {
  marginBlock: '100px',
};

export const Content: React.FC<contentProps> = ({ editMode, onSave }) => {
  const [theme, setTheme] = useStorage('theme', 'light');
  const alarm = useSelector((state: AppState) => state.alarmList);
  const currencyList = useSelector((state: AppState) => state.currencyList);
  const fetchList = useSelector((state: AppState) => state.fetchList);
  const [order, setOrder, updatePosition, updateOrder] = usePositionReorder([]);
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);
  const fetchHistory = useSelector((state: AppState) => state.fetchHistory);
  const [addModal, setAddModal] = useState(false);
  const [alertModal, setAlertModal] = useState(false);
  const [alarmModal, setAlarmModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!editMode) fetchPriceData();
  }, [fetchList, tick]);

  const updateFetchHistory = () => {
    const today = new Date();
    if (formatDate(today) != fetchHistory.lastDate) {
      dispatch(setFetchHistory({ lastDate: formatDate(today), todayCall: 1 }));
    } else {
      dispatch(setFetchHistory({ lastDate: fetchHistory.lastDate, todayCall: fetchHistory.todayCall + 1 }));
    }
  };

  const restricted = useMemo(() => {
    return false;
  }, [fetchHistory]);

  const fetchPriceData = () => {
    setLoading(true);
    getCurrencyPrices(fetchList)
      .then(res => {
        //updateFetchHistory();
        dispatch(setCurrencyList(res));

        setOrder(res);
        setLoading(false);
      })
      .catch(err => {
        alert(err.messge);
      });
  };

  const priceNotifys = useMemo(() => {
    // const notifies = currencyList.filter(currency => {
    //   const threshold = alarm[currency.name];
    //   if (currency.usd_price > 100) return currency;
    // });
    // if (notifies.length) setAlertModal(true);
    // return [];
    return [];
  }, [currencyList]);

  useEffect(() => {
    const tId = setInterval(() => {
      setTick(tick => tick + 1);
    }, 5000);
    return () => {
      clearInterval(tId);
    };
  }, []);

  const handleSave = () => {
    dispatch(setFetchList(order.map(currency => currency.name)));
    onSave();
  };

  const handleAdd = () => {
    setAddModal(true);
  };

  const handleBtnClick = () => {
    if (editMode) handleSave();
    else handleAdd();
  };

  const showAlarmBox = index => {
    setSelectedIndex(index);
    setSelectedCurrency(order[index]);
    setAlarmModal(true);
  };

  const removeItem = index => {
    setOrder(order.filter((_, i) => i != index));
  };

  useEffect(() => {
    // alert(JSON.stringify(order.map(order => order.name)));
  }, [order]);

  const setAlarmValue = value => {
    let newAlarm = JSON.parse(JSON.stringify(alarm));
    if (!(newAlarm instanceof Object)) newAlarm = {};
    newAlarm[currencyList[selectedIndex].name] = value;
    dispatch(setAlarmList(newAlarm));

    setAlarmModal(false);
  };

  return (
    <div>
      <div id="content" style={{ overflow: restricted ? 'hidden' : 'none' }}>
        {loading ? (
          // ? order.map(() => <Skeleton style={{ height: 50, marginBottom: 10 }} />)
          <ClipLoader color="#0099ff" loading={loading} cssOverride={override} size={100} data-testid="loader" />
        ) : (
          order.map((currency, i) =>
            !editMode ? (
              <CryptoCurrencyItem {...currency} editMode={editMode} onAlarm={() => showAlarmBox(i)} />
            ) : (
              <DraggableItem
                key={currency.name}
                height={50}
                i={i}
                updatePosition={updatePosition}
                updateOrder={updateOrder}>
                <CryptoCurrencyItem
                  {...currency}
                  editMode={editMode}
                  onAlarm={() => showAlarmBox(i)}
                  onRemove={() => removeItem(i)}
                />
              </DraggableItem>
            ),
          )
        )}
        {restricted && (
          <div className="banner-restrict">
            <p>You have to upgrade to PRO for more use</p>
          </div>
        )}
      </div>
      <button id="btn-refresh" className="solid primary" style={{ marginTop: 20 }} onClick={() => handleBtnClick()}>
        {editMode ? 'Save' : 'Add'}
      </button>

      <AddCurrencyBox show={addModal} onClose={() => setAddModal(false)} />
      {alarmModal && (
        <AlarmBox
          show={alarmModal}
          selectedCurrency={selectedCurrency}
          onClose={() => setAlarmModal(false)}
          setAlarmValue={setAlarmValue}
        />
      )}

      <PopupAlert show={alertModal} onClose={() => setAlertModal(false)} notifyList={priceNotifys} />
    </div>
  );
};
