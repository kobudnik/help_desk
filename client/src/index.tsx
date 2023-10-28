import App from './components/App';
import './main.css';
import ReactDOM from 'react-dom/client';
import { Navbar } from './components/Navbar';

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom';

const Layout = () => (
  <div className=" h-screen overflow-hidden">
    <Navbar />
    <Outlet />
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<App />} />
    </Route>,
  ),
);
const container = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(container).render(<RouterProvider router={router} />);
// const container = document.getElementById('root') as HTMLDivElement;
// const root = createRoot(container);
