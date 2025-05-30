// // src/components/AirtableListener.tsx
// import React, { useEffect } from 'react';
// import { useAirtableContext } from '../context/AirtableContext';

// const AirtableListener: React.FC = () => {
//   const { dispatch } = useAirtableContext();

//   useEffect(() => {
//     const socket = new WebSocket('ws://localhost:5174');

//     socket.onopen = () => {
//       console.log('✅ WebSocket connected');
//     };

//     socket.onmessage = (event) => {
//       try {
//         const data = JSON.parse(event.data);
//         console.log('📨 WebSocket data:', data);

//         if (data.type == 'INIT') {
//             dispatch({ type: 'SET_RECORDS', payload: data.records });
//           } else if (data.type == 'update') {
//             dispatch({ type: 'UPDATE_RECORD', payload: data.all});
//           }
//       } catch (error) {
//         console.error('❌ WebSocket error:', error);
//       }
//     };

//     socket.onclose = () => {
//       console.log('🔌 WebSocket disconnected');
//     };

//     return () => socket.close();
//   }, [dispatch]);

//   return null; // Background process only
// };

// export default AirtableListener;


// src/components/AirtableListener.tsx
import { useEffect } from 'react';
import { useAirtableContext } from '@/context/AirtableContext';

const AirtableListener: React.FC = () => {
  const {
    setPhoneCallRecords,
    setScreeningRecords,
  } = useAirtableContext();

  useEffect(() => {
    const socket = new WebSocket(

        // 'ws://innovasense-recruiter-ws.darkube.app:80'
        // 'wss://innovasense-recruiter-ws.darkube.app:80' 
       
        window.location.protocol === 'https:'
          ?  'wss://innovasense-ai-ws.50000words.com'
        //   'wss://27f52920-f391-4c9e-89c7-063ea0de6069.hsvc.ir:31853'
          :  'wss://innovasense-ai-ws.50000words.com'
      );

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'INIT' || data.type === 'update') {
          switch (data.tableName) {
            case 'Phone_call':
              setPhoneCallRecords(data.records || data.all || []);
              break;
            case 'Screening':
              setScreeningRecords(data.records || data.all || []);
              break;
            default:
              console.warn('⚠️ Unknown table name:', data.tableName);
          }
        }
      } catch (err) {
        console.error('❌ Failed to parse WebSocket message:', err);
      }
    };

    socket.onclose = () => {
      console.log('🔌 WebSocket disconnected');
    };

    return () => {
      socket.close();
    };
  }, [setPhoneCallRecords, setScreeningRecords]);

  return null;
};

export default AirtableListener;
