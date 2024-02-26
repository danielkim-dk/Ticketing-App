import { Manrope } from 'next/font/google';
import './globals.css';

const inter = Manrope({ subsets: ['latin'] });

export const metadata = {
  title: 'Zealthy Ticket Page',
  description: 'Submit Tickets Here',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
