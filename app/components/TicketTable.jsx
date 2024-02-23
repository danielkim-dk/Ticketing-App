'use client';
import React, { useState } from 'react';
import TicketModal from './TicketModal';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function TicketTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ticket Number</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date Submitted</TableHead>
            <TableHead>Days Pending</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>New</TableCell>
            <TableCell>Feb 22, 2024</TableCell>
            <TableCell>1</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
