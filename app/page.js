import Image from 'next/image';
import { AddForm } from './components/AddForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-2 w-full bg-gray-400">
      <div className="w-full p-2 border-2">
        <h1 className="border-2 mb-12 text-center"> Main Page with form for client </h1>
        <div className="flex items-center justify-center border-2 pt-6 pb-6">
        <AddForm />
        </div>
      </div>
    </main>
  );
}
