

// src/components/AirtableListener.tsx
import { useEffect } from 'react';
import { useAirtableContext } from '@/context/AirtableContext';

const AirtableListener: React.FC = () => {
  const {
    setPhoneCallRecords,
    setScreeningRecords,
    setCreatePosition
  } = useAirtableContext();

  useEffect(() => {
    const socket = new WebSocket(

        // 'ws://innovasense-recruiter-ws.darkube.app:80'
        // 'wss://innovasense-recruiter-ws.darkube.app:80' 
        // 'wss://innovasense-ai-ws.50000words.com' wokring one
       
        window.location.protocol === 'https:'
          ?  "wss://ai-recruiter-websocket.uaenorth.azurecontainer.io:5174"
        //   'wss://27f52920-f391-4c9e-89c7-063ea0de6069.hsvc.ir:31853'
          :  'ws://localhost:5174'
      );

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("data",data)
        if (data.type === 'INIT' || data.type === 'update') {
          switch (data.tableName) {
            case 'Phone_call':
              setPhoneCallRecords(data.records || data.all || []);
              break;
            case 'Screening':
              setScreeningRecords(data.records || data.all || []);
              break;
              case 'Create Position':
                setCreatePosition(data.records || data.all || []);
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
