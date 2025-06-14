import { useState } from 'react';

export const useAuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setActiveTab(newValue);
  };

  return {
    activeTab,
    handleTabChange,
    setActiveTab,
  };
};
