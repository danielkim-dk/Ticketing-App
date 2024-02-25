import { Inter } from 'next/font/google';
import '../globals.css';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Zealthy Admin Page',
  description: 'Review Tickets Here',
};
export default function AdminLayout({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 min-h-screen">
      <Navbar />
      <div className="col-span-1 md:col-span-10">
        <section className="p-4 md:p-0">{children}</section>
      </div>
    </div>
  );
}
