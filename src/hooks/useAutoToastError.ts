import {useEffect} from 'react';
import ToastService from '@/services/ToastService';

export const useAutoToastError = (
  error: Error | undefined,
  defaultMessage?: string,
) => {
  useEffect(() => {
    if (!error) {
      return;
    }
    ToastService.showError(error.message);

    if (error && error.message === 'User not found') {
    }
  }, [error, defaultMessage]);
};

export default useAutoToastError;
