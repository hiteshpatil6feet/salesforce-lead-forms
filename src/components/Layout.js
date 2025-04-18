import React from 'react';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="site-header">
        <div className="main-title-container">
          <h1 className="main-title">MY UML PROJECT</h1>
        </div>
      </div>
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

export default Layout;