import React from 'react';
import TicketTable from '@/app/components/TicketTable';
const ResolvedPage = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="p-36">Resolved Page</div>
      <div className="flex items-center w-10/12">
        <TicketTable />
      </div>
    </div>
  );
};

export default ResolvedPage;
