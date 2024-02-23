import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });


export default function AdminLayout({ children }) {
  return (
    <div className="grid grid-cols-12 gap-4 h-screen w-screen">
      <Navbar />
      <div className="col-span-10">
        <section>{children}</section>
      </div>
    </div>
  );
}
