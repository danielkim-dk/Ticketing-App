'use client';
import React, { useState, useEffect } from 'react';
import TicketTable from '@/app/components/TicketTable';
import { getResolvedTickets } from '@/app/actions';
export const dynamic = "force-dynamic"
const CurrentPage = () => {
  const [tickets, setTickets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      const fetchedTickets = await getResolvedTickets();
      setTickets(fetchedTickets);
      setIsLoading(false);
    };
    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col items-center h-full">
      <div className="p-12 font-bold">Resolved Page</div>
      <div className="flex items-center w-full">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <TicketTable tickets={tickets} />
        )}
      </div>
    </div>
  );
};

export default CurrentPage;
