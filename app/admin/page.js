import { getTicketCounts } from '@/app/actions';
import TicketStatusChart from '@/app/components/TicketStatusChart';

export default async function AdminPage() {
  const ticketCounts = await getTicketCounts();

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="p-12 font-bold">Overview</div>
      <div className="flex items-start justify-center sm:min-w-screen md:w-full h-96">
        {ticketCounts && ticketCounts ? (
          <div className="mt-12 sm:w-full md:w-8/12 ">
            <TicketStatusChart ticketCounts={ticketCounts} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
