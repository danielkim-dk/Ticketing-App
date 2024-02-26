import React from 'react';
import TicketTable from '@/app/components/TicketTable';
import { getResolvedTickets } from '@/app/actions';

const CurrentPage = async () => {
  const tickets = await getResolvedTickets();
  return (
    <div className="flex flex-col items-center h-full">
      <div className="p-12 font-bold">Resolved Page</div>
      <div className="flex items-center w-full">
        {!tickets ? <div>Loading...</div> : <TicketTable tickets={tickets} />}
      </div>
    </div>
  );
};

export default CurrentPage;
