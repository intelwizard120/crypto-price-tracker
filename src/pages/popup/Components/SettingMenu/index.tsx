import React, { Component } from 'react';
import './style.scss';

interface settingMenuProps {
  icon: string;
  label: string;
  pro?: boolean;
  action: () => void;
}
export const SettingMenuItem: React.FC<settingMenuProps> = ({ icon, label, pro = false, action }) => {
  return (
    <div className="menu-item" onClick={action}>
      {pro && <div className="badge-pro">Pro</div>}
      <i className={`fa-solid ${icon}`} style={{ marginRight: 20, fontSize: 24 }} />
      <p>{label}</p>
    </div>
  );
};
