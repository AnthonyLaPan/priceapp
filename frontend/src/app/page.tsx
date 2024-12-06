import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-gray-800 mb-6">PriceComp</h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to PriceComp, your ultimate price comparison tool.
      </p>
      <Link href="/login">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
          Login
        </button>
      </Link>
    </div>
  );
}