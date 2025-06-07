import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContainerProvider } from './infra/di/ContainerContext';
import { AppRoutes } from './presentation/routes';

function App() {
  return (
    <BrowserRouter>
      <ContainerProvider>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ContainerProvider>
    </BrowserRouter>
  );
}

export default App;
