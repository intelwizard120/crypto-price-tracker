import React, { useState } from 'react';
import { Header } from './Header';
import './style.scss';
import { Content } from './Content';
import { useSelector } from 'react-redux';
import { AppState } from '@root/src/store/reducers';

export const HomePage = () => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div id="home-container">
      <Header onEditToggle={() => setEditMode(!editMode)} />
      <Content editMode={editMode} onSave={() => setEditMode(false)} />
    </div>
  );
};
