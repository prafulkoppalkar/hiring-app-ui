import '../styles/components.css';
import React, { useState } from 'react';
import { TABS } from '../constants/generalConstants';
import { renderTabContent } from '../helpers/tabsHelper';
import Icon from './Icon';

const Tabs = ({ candidate }) => {
  const [activeTab, setActiveTab] = useState('Experience');

  return (
    <div className="tabs">
      <div className="tab-list">
        {TABS.map(tab => (
          <div
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            <Icon name={tab}/>&nbsp;
            {tab}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {renderTabContent(activeTab, candidate)}
      </div>
    </div>
  );
};

export default Tabs;
