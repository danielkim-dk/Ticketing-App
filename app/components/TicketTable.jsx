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

export default function TicketTable({ tickets }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const calculateDaysPending = (ticketDate) => {
    const submittedDate = new Date(ticketDate);
    const currentDate = new Date();
    // Set the time part to 00:00:00 for both dates
    submittedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    const timeDifference = currentDate - submittedDate;
    const daysPending = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysPending;
  };

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

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
            <TableHead className="text-right">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets &&
            tickets.map((ticket) => (
              <TableRow
                key={ticket.ticketid}
                onClick={() => handleRowClick(ticket)}
              >
                <TableCell className="font-medium">{ticket.ticketid}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>
                  {new Date(ticket.ticketdate).toLocaleDateString()}
                </TableCell>
                <TableCell>{calculateDaysPending(ticket.ticketdate)}</TableCell>
                <TableCell className="text-right">{ticket.message}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={selectedTicket}
      />
    </>
  );
}
