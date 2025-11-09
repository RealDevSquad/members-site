import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  return <ToastContainer />;
}

const notifyBase = (text: string, type: 'success' | 'error' | 'info') => {
  toast[type](text, { position: 'top-right', autoClose: 2000 } as ToastOptions); // Here, we use `ToastOptions` to provide type information for the options object.
};

export const notifySuccess = (text: string) => notifyBase(text, 'success');
export const notifyError = (text: string) => notifyBase(text, 'error');
export const notifyInfo = (text: string) => notifyBase(text, 'info');
