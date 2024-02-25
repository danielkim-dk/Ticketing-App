import Image from 'next/image';
import { AddForm } from './components/AddForm';
import { initDB } from './db/init-db';
import { createTicket } from '@/app/actions';

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center p-2 w-full bg-gray-400">
      <div className="w-full p-2 border-2">
        <h1 className="border-2 mb-12 text-center">
          {' '}
          Main Page with form for client{' '}
        </h1>
        <div className="flex items-center justify-center border-2 pt-6 pb-6">
          <AddForm createTicket={createTicket} />
        </div>
      </div>
    </main>
  );
}


  // async function createTicket(formData) {
  //   'use server';

  //   console.log('inside createTicket action', formData);
  //   try {
  //     const data = [
  //       formData.get('name'),
  //       formData.get('email'),
  //       formData.get('message'),
  //     ];
  //     console.log(data);
  //     await sql`
  //       INSERT INTO Users (Name, Email) VALUES (${data[0]}, ${data[1]}) RETURNING UserID`;

  //     return {
  //       message: `Ticket created successfully`,
  //     };
  //   } catch (e) {
  //     return { message: 'Failed to create Ticket' };
  //   }
  // }