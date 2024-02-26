import React from 'react';
import TicketTable from '@/app/components/TicketTable';
import { getTickets } from '@/app/actions';

const CurrentPage = async () => {
  const tickets = await getTickets();
  return (
    <div className="flex flex-col items-center h-full">
      <div className="p-12 font-bold">Current Page</div>
      <div className="flex items-center w-full">
        {tickets === null ? (
          <div>Loading...</div>
        ) : (
          <TicketTable tickets={tickets} />
        )}
      </div>
    </div>
  );
};

export default CurrentPage;
