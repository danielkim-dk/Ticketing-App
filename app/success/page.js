'use client';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();
  const ticketID = router.query ? router.query.ticketID : null;

  return (
    <div className="flex justify-around p-36 border-2">
      <div>Success</div>
      {ticketID && (
        <p>Your ticket has been created successfully. Ticket ID: {ticketID}</p>
      )}
      <Link href="/">Back to Home</Link>
    </div>
  );
}
