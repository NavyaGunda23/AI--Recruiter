// components/ErrorComponent.js
import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SuccessContext } from '@/context/SuccessToastContext';

const SuccessToastComponent = () => {
  const { showSuccessToast, cleatSuccess, successMessage } = useContext(SuccessContext);

  return (
    <Snackbar
      open={!!successMessage}
      autoHideDuration={6000}
      onClose={cleatSuccess}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={cleatSuccess}  variant="filled" sx={{
    backgroundColor: '#17B309',      // custom background
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


