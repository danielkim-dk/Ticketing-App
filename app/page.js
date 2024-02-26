import { AddForm } from './components/AddForm';
import { createTicket } from '@/app/actions';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-2 pt-20 w-full bg-gray-200">
      <div className="w-full p-2 border bg-gray-300 max-w-[900px] rounded-lg shadow-lg border-gray-400">
        <h1 className="mt-8 mb-8 text-center text-2xl font-bold">
          Ticket Submission Form
        </h1>
        <div className="flex items-center justify-center pt-6 pb-12">
          <AddForm createTicket={createTicket} />
        </div>
      </div>
    </main>
  );
}
