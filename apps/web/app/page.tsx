import Link from "next/link";
import { api } from "@/trpc/server";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center space-y-8">
        {/* Main Heading */}
        <h1 className="text-6xl font-bold text-gray-800 tracking-tight">
          Just Dates
        </h1>
        
        {/* Start Button */}
        <Link href="/dashboard">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
            Start
          </button>
        </Link>
      </div>
    </div>
  );
}