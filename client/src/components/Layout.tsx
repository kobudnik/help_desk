import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet } from 'react-router';
function Layout() {
  return (
    <div className=" h-screen overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
export { Layout };
