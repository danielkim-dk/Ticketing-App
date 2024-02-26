'use client';
import React, { useState } from 'react';
import TicketModal from './TicketModal';
import {
  Table,
  TableBody,
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
    const timeDifference = currentDate - submittedDate;
    const daysPending = Math.abs(
      Math.floor(timeDifference / (1000 * 60 * 60 * 24))
    );
    return daysPending;
  };

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold min-w-[60px] pl-2 max-w-[60px]">
              Ticket Number
            </TableHead>
            <TableHead className="text-center font-bold">Status</TableHead>
            <TableHead className="text-center font-bold">
              Date Submitted
            </TableHead>
            <TableHead className="text-center font-bold">
              Days Pending
            </TableHead>
            <TableHead className="text-center font-bold min-w-[300px]">
              Message
            </TableHead>
            <TableHead className="text-center font-bold">
              Response Date
            </TableHead>
            <TableHead className="text-center font-bold min-w-[300px]">
              Response Message
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets &&
            tickets.map((ticket) => (
              <TableRow
                key={ticket.ticketid}
                onClick={() => handleRowClick(ticket)}
              >
                <TableCell className="text-center font-medium">
                  {ticket.ticketid}
                </TableCell>
                <TableCell className="text-center">{ticket.status}</TableCell>
                <TableCell className="text-center">
                  {new Date(ticket.ticketdate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {calculateDaysPending(ticket.ticketdate)}
                </TableCell>
                <TableCell className="text-center w-[400px] overflow-hidden whitespace-nowrap text-overflow:ellipsis;">
                  {ticket.message}
                </TableCell>
                <TableCell className="text-center">
                  {ticket.responsedate
                    ? new Date(ticket.responsedate).toLocaleDateString()
                    : 'N/A'}
                </TableCell>
                <TableCell className="text-center w-[400px] overflow-hidden whitespace-nowrap text-overflow:ellipsis; ">
                  {ticket.response || 'N/A'}
                </TableCell>
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
