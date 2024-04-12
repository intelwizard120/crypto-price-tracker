import React, { useState } from 'react';
import { SettingMenuItem } from '../../Components/SettingMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '@root/src/store/actions';
import { NUM_ABOUT_PAGE, NUM_SETTING_PAGE } from '../consts';
import './style.scss';
import title from '@src/assets/img/title.png';

export const RatingPage = () => {
  const [star, setStar] = useState(0);
  const [stars, setStars] = useState(new Array(5).fill(false));
  const dispatch = useDispatch();

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };

  const setRate = pos => {
    setStar(pos + 1);
    setStars([...new Array(pos + 1).fill(true), ...new Array(5 - pos - 1).fill(false)]);
  };

  return (
    <div id="rating-root">
      <div id="rating-header">
        <button className="btn-icon" onClick={() => navigatePage(NUM_ABOUT_PAGE)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h2>Go Back</h2>
      </div>

      <div id="rating-content">
        <img src={title} width={160} height={30}></img>
        <h2>How would you rate this extension?</h2>
        {stars.map((star, index) => {
          return star ? (
            <i className="fa-solid fa-star" onClick={() => setRate(index)}></i>
          ) : (
            <i className="fa-regular fa-star" onClick={() => setRate(index)}></i>
          );
        })}
      </div>
    </div>
  );
};
