import Link from "next/link";


export default function AdminPage() {
  return (
      <div className="flex justify-around p-36 border-2">
        <div>Success</div>
        <Link href="/">Back to Home</Link>
      </div>

  );
}
