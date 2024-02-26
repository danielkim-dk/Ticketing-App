'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import Link from 'next/link';

const links = [
  { name: 'Overview', href: '/admin' },
  { name: 'Current', href: '/admin/current' },
  { name: 'Resolved', href: '/admin/resolved' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className=" bg-gray-200 shadow-lg md:h-screen">
      <div className="flex sm:mt-0 md:flex-col md:mt-10 w-full">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`px-6 py-3 text-sm hover:bg-white w-full text-center font-bold ${
              pathname === link.href
                ? 'bg-white shadow-inner text-yellow-300'
                : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
