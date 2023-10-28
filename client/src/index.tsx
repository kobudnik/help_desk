import App from './components/App';
import './main.css';
import ReactDOM from 'react-dom/client';
import { Layout } from './components/Layout';
import { AdminCenter } from './components/AdminCenter';
import { Error } from './components/Error';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<App />} />
      <Route path="/admin" element={<AdminCenter />} />
    </Route>,
  ),
);
const container = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(container).render(<RouterProvider router={router} />);
