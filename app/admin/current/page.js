import React from 'react';
import TicketTable from '@/app/components/TicketTable';
import { getTickets } from '@/app/actions';

const CurrentPage = async () => {
  const tickets = await getTickets();
  console.log('tickets data in page', tickets)
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="p-36">CurrentPage</div>
      <div className="flex items-center w-10/12">
        <TicketTable tickets={tickets} />
      </div>
    </div>
  );
};

export default CurrentPage;
