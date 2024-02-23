'use client';
import React from 'react';
import TicketTable from '@/app/components/TicketTable';

const CurrentPage = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="p-36">CurrentPage</div>
      <div className="flex items-center w-10/12">
        <TicketTable />
      </div>
    </div>
  );
};

export default CurrentPage;
