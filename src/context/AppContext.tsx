import { createContext, useContext, useState } from 'react';

type AppContextType = {
  notificationCount: number;
  setNotificationCount: (count: number) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [notificationCount, setNotificationCount] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

  return (
    <AppContext.Provider value={{ 
      notificationCount, 
      setNotificationCount, 
      activeTab, 
      setActiveTab 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
