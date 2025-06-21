"use client";

import { Home, Calendar, MessageCircle, User } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  
  // Set current date on client side to avoid hydration mismatch
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);
  
  // Calendar data for June 2025
  const calendarMonth = 5; // June (0-indexed)
  const calendarYear = 2025;
  const daysInJune = Array.from({ length: 30 }, (_, i) => i + 1);
  const startDay = 6; // June 1st, 2024 starts on Saturday (0=Sunday, 6=Saturday)
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);
  
  // Only calculate current date info if we have the date
  const currentDay = currentDate?.getDate();
  const currentMonth = currentDate?.getMonth();
  const currentYear = currentDate?.getFullYear();
  const isCurrentMonth = currentMonth === calendarMonth && currentYear === calendarYear;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800">
          Just Dates
        </h1>

        {/* Mini Calendar */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">June 2025</h2>
          
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} className="h-8"></div>
            ))}
            
            {/* Days of the month */}
            {daysInJune.map((day) => {
              const isToday = currentDate && isCurrentMonth && day === currentDay;
              const isHighlighted = day === 15;
              
              let dayClasses = "h-8 flex items-center justify-center text-sm rounded relative ";
              
              if (isHighlighted) {
                dayClasses += "bg-[#E8F0FE] text-blue-700 font-semibold ";
              } else {
                dayClasses += "text-gray-700 hover:bg-gray-100 ";
              }
              
              if (isToday) {
                dayClasses += "ring-2 ring-blue-500 ring-offset-1 ";
              }
              
              return (
                <div key={day} className={dayClasses}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Date Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Your next date</h2>
          </div>
          
          {/* Profile Banner */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              {/* Profile Picture */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">MM</span>
              </div>
              
              {/* Name */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Max Mustermann</h3>
                <p className="text-sm text-gray-500">Sport | Tennis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-between items-center">
          {/* House - Far Left - Active */}
          <button className="flex flex-col items-center space-y-1 p-2">
            <Home className="w-6 h-6 text-blue-600" />
          </button>

          {/* Calendar */}
          <Link href="/calendar">
            <button className="flex flex-col items-center space-y-1 p-2">
              <Calendar className="w-6 h-6 text-gray-600" />
            </button>
          </Link>

          {/* Chat */}
          <Link href="/chat">
            <button className="flex flex-col items-center space-y-1 p-2">
              <MessageCircle className="w-6 h-6 text-gray-600" />
            </button>
          </Link>

          {/* Profile Avatar - Far Right */}
          <Link href="/profile">
            <button className="flex flex-col items-center space-y-1 p-2">
              <div className="w-8 h-8 bg-[#E8F0FE] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-700" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
