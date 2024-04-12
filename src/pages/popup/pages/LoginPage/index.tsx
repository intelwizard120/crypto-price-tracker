import React, { useState } from 'react';
import { SettingMenuItem } from '../../Components/SettingMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setAccount, setCurrentPage } from '@root/src/store/actions';
import { NUM_ABOUT_PAGE, NUM_EDIT_LIST_PAGE, NUM_HOME_PAGE, NUM_REGISTER_PAGE, NUM_UPGRADE_PAGE } from '../consts';
import './style.scss';
import title from '@src/assets/img/title.png';
import { useStorage } from '@root/src/shared/hooks/useStorage';
import { AppState } from '@root/src/store/reducers';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [auth, setAuth] = useStorage('auth', {});
  const account = useSelector((state: AppState) => state.account);

  const navigatePage = page => {
    dispatch(setCurrentPage(page));
  };

  const validators = [() => email.length > 0, () => password.length > 0];
  const handleAuth = () => {
    dispatch(setAccount({ email, password }));
    navigatePage(NUM_HOME_PAGE);
    return;
    if (validators.every(validator => validator())) {
      if (auth.email == email && auth.password == password) {
        navigatePage(NUM_HOME_PAGE);
      } else if (auth.email != email) {
        setError({ email: 'Email does not exist!' });
      } else if (auth.password != password) {
        setError({ password: 'Password incorrect!' });
      }
    }
  };

  return (
    <div id="login-content">
      <img width={160} height={30} src={title} />
      <h2>Sign in to CoinWatch</h2>
      <div className="login-form">
        <div className="input-div">
          <p>Email:</p>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} required></input>
          {error?.email && <p className="warning">{error.email}</p>}
        </div>

        <div className="input-div" style={{ marginTop: 10 }}>
          <p>Password:</p>
          <input type="text" value={password} onChange={e => setPassword(e.target.value)} required></input>
          {error?.password && <p className="warning">{error.password}</p>}
        </div>

        <button className="solid primary" style={{ marginTop: 30 }} onClick={handleAuth}>
          SIGN IN
        </button>
      </div>
      <div>
        <a onClick={() => navigatePage(NUM_REGISTER_PAGE)}>You don't have an account?</a>
      </div>
    </div>
  );
};
