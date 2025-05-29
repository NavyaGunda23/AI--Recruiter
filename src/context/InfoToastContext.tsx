import React, { useState, useCallback, useContext, createContext } from 'react';
import type { ReactNode } from 'react';

type SuccessContextType = {
  successMessage: string | null;
  showSuccessToast: (message: string) => void;
  clearSuccess: () => void;
};

// Provide a default empty value with correct shape
export const SuccessContext = createContext<SuccessContextType>({
  successMessage: null,
  showSuccessToast: () => {},
  clearSuccess: () => {},
});

export const useSuccess = () => useContext(SuccessContext);

type Props = {
  children: ReactNode;
};

export const SuccessProvider = ({ children }: Props) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showSuccessToast = useCallback((message: string) => {
    setSuccessMessage(message);
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  return (
    <SuccessContext.Provider value={{ showSuccessToast, clearSuccess, successMessage }}>
      {children}
    </SuccessContext.Provider>
  );
};
