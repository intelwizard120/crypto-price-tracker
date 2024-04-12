import React, { useState } from 'react';
import { SettingMenuItem } from '../../Components/SettingMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '@root/src/store/actions';
import { NUM_RATING_PAGE, NUM_SETTING_PAGE } from '../consts';
import './style.scss';
import title from '@src/assets/img/title.png';

export const AboutPage = () => {
  const dispatch = useDispatch();

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };

  const openDiscord = () => {
    chrome.tabs.create({ url: 'https://discord.gg/vUsBvdmk' }, function (tab) {
      // Tab opened.
    });
  };

  const openTwitter = () => {
    chrome.tabs.create({ url: 'https://twitter.com/CoinWatch_HQ' }, function (tab) {
      // Tab opened.
    });
  };

  return (
    <div id="about-root">
      <div id="about-header">
        <button className="btn-icon" onClick={() => navigatePage(NUM_SETTING_PAGE)}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h2>Go Back</h2>
      </div>

      <div id="about-content">
        <img src={title} width={160} height={30}></img>
        <h2>Need support or have a suggestion? Join our Discord server</h2>
        <SettingMenuItem icon={'fa-brands fa-discord'} label="Join Discord" action={() => openDiscord()} />

        <SettingMenuItem icon={'fa-brands fa-twitter'} label="Visit Twitter" action={() => openTwitter()} />

        <div className="link" onClick={() => navigatePage(NUM_RATING_PAGE)}>
          Rate this extension
        </div>
      </div>
    </div>
  );
};
