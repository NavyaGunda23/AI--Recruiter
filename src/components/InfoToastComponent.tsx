// components/ErrorComponent.js
import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SuccessContext } from '@/context/InfoToastContext';

const SuccessToastComponent = () => {
  const { showSuccessToast, clearSuccess, successMessage } = useContext(SuccessContext);

  return (
    <Snackbar
      open={!!successMessage}
      autoHideDuration={6000}
      onClose={clearSuccess}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={clearSuccess}  variant="filled" sx={{
    backgroundColor: '#4DB0FB',      // custom background
    color: 'white',                 // border
    fontWeight: 500,
    borderRadius: 2,
    width:"100%"
  }}>
        {successMessage}
      </Alert>
    </Snackbar>
  );
};

export default SuccessToastComponent;


