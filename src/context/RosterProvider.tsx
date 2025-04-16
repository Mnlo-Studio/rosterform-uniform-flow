
import React, { ReactNode } from 'react';
import { RosterContext } from './RosterContext';
import { useRosterState } from './roster/RosterProviderImplementation';

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
