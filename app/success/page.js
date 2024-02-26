'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center bg-gray-200 p-36 border-2 h-screen">
      <div className="flex flex-col min-w-[400px] w-2/3 h-[400px] border shadow-lg bg-gray-300 rounded-lg text-center justify-center border-gray-400">
        <div className="text-8xl text-green-500">&#x2713;</div>
        <div className="mt-1 mb-8"> Successfully submitted your ticket</div>
      </div>
      <Button className="mt-5" onClick={() => router.push('/')}>
        Back to Home
      </Button>
    </div>
  );
}
