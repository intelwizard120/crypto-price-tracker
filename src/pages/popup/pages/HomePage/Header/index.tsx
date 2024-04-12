import React, { Component } from 'react';
import { useStorage } from '@src/shared/hooks/useStorage';
import { faSliders, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import banner from '@assets/img/banner.png';
import title from '@assets/img/title.png';
import './style.scss';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '@root/src/store/actions';
import { NUM_SETTING_PAGE } from '../../consts';

interface headerProps {
  onEditToggle: () => void;
}
export const Header: React.FC<headerProps> = ({ onEditToggle }) => {
  const [theme, setTheme] = useStorage('theme', 'light');
  const dispatch = useDispatch();

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };

  const toggleTheme = () => {
    setTheme(theme == 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <div id="header">
        <img width={180} height={32} src={title} />
        <div className="row">
          <button className="btn-icon" style={{ marginRight: 5 }} onClick={() => onEditToggle()}>
            <i className="fa-solid fa-pen-to-square "></i>
          </button>
          <button className="btn-icon" style={{ marginRight: 5 }} onClick={() => toggleTheme()}>
            <i className="fa-solid fa-circle-half-stroke"></i>
          </button>
          <button className="btn-icon" onClick={() => navigatePage(NUM_SETTING_PAGE)}>
            <i className="fa-solid fa-sliders"></i>
          </button>
        </div>
      </div>
      {/* <img src={banner} width="100%" height="100px"></img> */}
    </>
  );
};
