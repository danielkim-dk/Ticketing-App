'use client';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

const links = [
  { name: 'Overview', href: '/admin' },
  { name: 'Current', href: '/admin/current' },
  { name: 'Resolved', href: '/admin/resolved' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="col-span-2 bg-gray-200 h-full flex flex-col">
      <div className="flex flex-col mt-36">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`p-6 text-xl hover:bg-white w-full text-center ${
              pathname === link.href ? 'bg-white' : ''
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
