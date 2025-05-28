import React, { useState } from 'react';
import axios from 'axios';

export default function CreateFolder() {
  const [folderName, setFolderName] = useState("");

  const handleCreate = async () => {
    if (!folderName) return alert("Enter a folder name");

    try {
      const res = await axios.post("https://innova-recruiter-candidate.darkube.app/api/api/create-folder", {
        folderName,
      });
      alert(`✅ Folder created:`);
    } catch (err) {
      console.error(err);
      alert("❌ Error creating folder");
    }
  };

  return (
    <ul>
      <li>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
        />
        <button onClick={handleCreate}>Create Folder</button>
      </li>
    </ul>
  );
}
