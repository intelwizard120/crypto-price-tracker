import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '@root/src/store/actions';
import './style.scss';
import title from '@src/assets/img/title.png';
import { NUM_LOGIN_PAGE } from '../consts';
import { useStorage } from '@root/src/shared/hooks/useStorage';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useStorage('auth', {});

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };

  const handleSignUp = () => {
    setAuth({ email, password });
  };

  return (
    <div id="register-content">
      <img width={160} height={30} src={title} />
      <h2>Welcome to CoinWatch</h2>
      <div id="register-form">
        <div className="input-div">
          <p>Email:</p>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
        </div>

        <div className="input-div" style={{ marginTop: 10 }}>
          <p>Password:</p>
          <input type="text" value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>

        <div className="input-div" style={{ marginTop: 10 }}>
          <p>Confirm Password:</p>
          <input type="text" value={password} onChange={e => setPassword(e.target.value)}></input>
        </div>

        <button className="solid primary" style={{ marginTop: 30 }} onClick={handleSignUp}>
          SIGN UP
        </button>
      </div>
      <div>
        <a onClick={() => navigatePage(NUM_LOGIN_PAGE)}>Already have an account?</a>
      </div>
    </div>
  );
};
