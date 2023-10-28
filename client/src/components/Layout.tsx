import { Navbar } from './Navbar';
import { Outlet } from 'react-router';
function Layout() {
  return (
    <div className=" h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
export { Layout };
