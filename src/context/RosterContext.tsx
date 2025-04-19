
import React, { createContext, useContext, ReactNode } from 'react';
import { RosterContextType } from './RosterContextTypes';
import { useRosterState } from './roster/RosterProviderImplementation';

export const RosterContext = createContext<RosterContextType | undefined>(undefined);

export const useRoster = (): RosterContextType => {
  const context = useContext(RosterContext);
  if (context === undefined) {
    throw new Error('useRoster must be used within a RosterProvider');
  }
  return context;
};

interface RosterProviderProps {
  children: ReactNode;
}

export const RosterProvider: React.FC<RosterProviderProps> = ({ children }) => {
  const rosterState = useRosterState();
  
  return (
    <RosterContext.Provider value={rosterState}>
      {children}
    </RosterContext.Provider>
  );
};
