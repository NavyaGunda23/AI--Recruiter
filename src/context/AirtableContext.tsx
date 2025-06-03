
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type AirtableRecord = {
  id: string;
  fields: Record<string, any>;
};

type AirtableContextType = {
  phoneCallRecords: AirtableRecord[];
  setPhoneCallRecords: React.Dispatch<React.SetStateAction<AirtableRecord[]>>;
  screeningRecords: AirtableRecord[];
  setScreeningRecords: React.Dispatch<React.SetStateAction<AirtableRecord[]>>;
  createPosition: AirtableRecord[];
  setCreatePosition: React.Dispatch<React.SetStateAction<AirtableRecord[]>>;
};

const AirtableContext = createContext<AirtableContextType | undefined>(undefined);

export const AirtableProvider = ({ children }: { children: ReactNode }) => {
  const [phoneCallRecords, setPhoneCallRecords] = useState<AirtableRecord[]>([]);
  const [screeningRecords, setScreeningRecords] = useState<AirtableRecord[]>([]);

  const [createPosition, setCreatePosition] = useState<AirtableRecord[]>([]);

  return (
    <AirtableContext.Provider
      value={{
        phoneCallRecords,
        setPhoneCallRecords,
        screeningRecords,
        setScreeningRecords,
        createPosition,
        setCreatePosition
      }}
    >
      {children}
    </AirtableContext.Provider>
  );
};

export const useAirtableContext = () => {
  const context = useContext(AirtableContext);
  if (!context) {
    throw new Error('useAirtable must be used within an AirtableProvider');
  }
  return context;
};
