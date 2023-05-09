import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="m-auto font-mono text-center">
        <h1 className="text-4xl font-bold tracking-wide text-gray-900">
          Movie Flix
        </h1>
        <h3 className="text-blue-700">
          <Link href="/login">Login</Link>
        </h3>
      </div>
    </div>
  );
}
