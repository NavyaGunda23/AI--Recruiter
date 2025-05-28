// // src/context/AirtableContext.tsx
// import React, { createContext, useContext, useReducer } from 'react';
// import type { ReactNode } from 'react';

// type AirtableRecord = {
//   id: string;
//   fields: Record<string, any>;
// };

// type State = {
//   records: AirtableRecord[];
// };

// type Action =
//   | { type: 'SET_RECORDS'; payload: AirtableRecord[] }
//   | { type: 'UPDATE_RECORD'; payload: AirtableRecord[] };

// const initialState: State = {
//   records: [],
// };

// const AirtableContext = createContext<{
//   state: State;
//   dispatch: React.Dispatch<Action>;
// }>({
//   state: initialState,
//   dispatch: () => undefined,
// });

// const airtableReducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case 'SET_RECORDS':
//       return { ...state, records: action.payload };
//       case 'UPDATE_RECORD':
//       return { ...state, records: action.payload };
      
  
      
//     default:
//       return state;
//   }
// };

// export const AirtableProvider = ({ children }: { children: ReactNode }) => {
//   const [state, dispatch] = useReducer(airtableReducer, initialState);

//   return (
//     <AirtableContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AirtableContext.Provider>
//   );
// };

// export const useAirtableContext = () => useContext(AirtableContext);

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
};

const AirtableContext = createContext<AirtableContextType | undefined>(undefined);

export const AirtableProvider = ({ children }: { children: ReactNode }) => {
  const [phoneCallRecords, setPhoneCallRecords] = useState<AirtableRecord[]>([]);
  const [screeningRecords, setScreeningRecords] = useState<AirtableRecord[]>([]);

  return (
    <AirtableContext.Provider
      value={{
        phoneCallRecords,
        setPhoneCallRecords,
        screeningRecords,
        setScreeningRecords,
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
