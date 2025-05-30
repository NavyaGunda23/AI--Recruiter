// components/ErrorComponent.js
import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { InfoContext } from '@/context/InfoToastContext';

const InfoToastComponent = () => {
  const { showInfoToast, clearInfo, infoMessage } = useContext(InfoContext);

  return (
    <Snackbar
      open={!!infoMessage}
      autoHideDuration={6000}
      onClose={clearInfo}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={clearInfo}  variant="filled" sx={{
    backgroundColor: '#4DB0FB',      // custom background
    color: 'white',                 // border
    fontWeight: 500,
    borderRadius: 2,
    width:"100%"
  }}>
        {infoMessage}
      </Alert>
    </Snackbar>
  );
};

export default InfoToastComponent;


