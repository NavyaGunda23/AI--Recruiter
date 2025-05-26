import React, { useState } from 'react';
import axios from 'axios';

const UploadToFolder: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [folderId, setFolderId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  const handleUpload = async () => {
    if (!pdfFile || !folderId) {
      alert('Please provide both folder ID and a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('folderId', folderId);

    try {
      const response:any = await axios.post('http://localhost:5172/api/upload-to-created-folder', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage(`File uploaded: ${response?.data.uploadedFile.name}`);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      setMessage('Upload failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload PDF to SharePoint Folder</h2>
      <input
        type="text"
        placeholder="Enter SharePoint Folder ID"
        value={folderId}
        onChange={(e) => setFolderId(e.target.value)}
        style={{ marginBottom: 10, width: '100%' }}
      />
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: 10 }}>
        Upload
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadToFolder;
