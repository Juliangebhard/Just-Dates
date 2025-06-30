"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function DateCreationP1() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedDate = searchParams.get('date');
  
  const [selectedTime, setSelectedTime] = useState<'early' | 'later' | null>(null);

  // Parse the selected date
  const parsedDate = selectedDate ? new Date(selectedDate) : new Date();
  const formattedDate = parsedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleTimeSelection = (time: 'early' | 'later') => {
    setSelectedTime(time);
    // Navigate to the next step with the selected date and time
    const nextStepUrl = `/dateCreationP2?date=${selectedDate}&time=${time}`;
    router.push(nextStepUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Link href="/calendar">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Create Date</h1>
            <p className="text-sm text-gray-600">Step 1 of 3</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Selected Date Display */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Selected Date</h2>
            <p className="text-2xl font-bold text-blue-600">{formattedDate}</p>
          </div>
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 text-center">
            When would you like to meet?
          </h2>
          
          <div className="space-y-4">
            {/* Early in the Day Option */}
            <button
              onClick={() => handleTimeSelection('early')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
                  <Sun className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Early in the Day</h3>
                  <p className="text-sm text-gray-600">Morning to early afternoon</p>
                </div>
                <Clock className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </button>

            {/* Later that Day Option */}
            <button
              onClick={() => handleTimeSelection('later')}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Moon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-gray-800">Later that Day</h3>
                  <p className="text-sm text-gray-600">Afternoon to evening</p>
                </div>
                <Clock className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 