
import React, { createContext, useContext } from 'react';
import { RosterContextType } from './RosterContextTypes';

export const RosterContext = createContext<RosterContextType | undefined>(undefined);

export const useRoster = (): RosterContextType => {
  const context = useContext(RosterContext);
  if (context === undefined) {
    throw new Error('useRoster must be used within a RosterProvider');
  }
  return context;
};

// Remove circular import
// export { RosterProvider } from './RosterProvider';
