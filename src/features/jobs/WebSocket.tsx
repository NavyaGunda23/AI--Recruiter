import React, { useEffect, useState } from 'react';

type AirtableRecord = {
  id: string;
  fields: Record<string, any>;
};

const AirtableListener: React.FC = () => {
  const [records, setRecords] = useState<AirtableRecord[]>([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5174'); // Make sure this matches your BE port

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("socket.onmessage",data)
        if (Array.isArray(data)) {
          setRecords(data); // full records
        } else if (data && data.id && data.fields) {
          // if you receive single object or partial delta
          setRecords((prev) => {
            const updated = prev.map((r) =>
              r.id === data.id ? { ...r, fields: { ...r.fields, ...data.fields } } : r
            );
            const isNew = !prev.find((r) => r.id === data.id);
            return isNew ? [...prev, data] : updated;
          });
        }
      } catch (err) {
        console.error('❌ Failed to parse WebSocket message:', err);
      }
    };

    socket.onclose = () => {
      console.log('🔌 WebSocket disconnected');
    };

    return () => socket.close();
  }, []);

  return (
    <div>
    <></>
    </div>
  );
};

export default AirtableListener;
