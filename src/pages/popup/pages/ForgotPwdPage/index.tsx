import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '@root/src/store/actions';
import './style.scss';
import title from '@src/assets/img/title.png';

export const ForgotPwdPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };
  return (
    <div id="login-content">
      <img width={180} height={32} src={title} />
      <div id="login-form" style={{ marginTop: 100 }}>
        <div className="row-center">
          <p>Username:</p>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ marginLeft: 10 }}></input>
        </div>

        <div className="row-center">
          <p>Password:</p>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ marginLeft: 10 }}></input>
        </div>

        <button className="solid primary">Sign in</button>
      </div>
    </div>
  );
};
