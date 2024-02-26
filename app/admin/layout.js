import { Manrope } from 'next/font/google';
import '../globals.css';
import Navbar from '../components/Navbar';

const inter = Manrope({ subsets: ['latin'] });

export const metadata = {
  title: 'Zealthy Admin Page',
  description: 'Review Tickets Here',
};
export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row h-screen min-h-screen w-screen">
      <div className=" bg-gray-200 md:h-screen shadow-xl">
        <Navbar />
      </div>

      <div className="md:w-full flex justify-center">
        <div className="w-11/12">
          <section className="md:p-0">{children}</section>
        </div>
      </div>
    </div>
  );
}
