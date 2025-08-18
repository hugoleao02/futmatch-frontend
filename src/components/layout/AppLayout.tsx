import type { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TOAST_CONFIG } from '../../constants';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="App">
    {children}
    <ToastContainer {...TOAST_CONFIG} />
  </div>
);
