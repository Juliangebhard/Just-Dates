"use client";

import { Home, Calendar, MessageCircle, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  
  // Set current date on client side to avoid hydration mismatch
  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }, []);

  // Generate next 30 days from today
  const getNext30Days = () => {
    if (!currentDate) return [];
    
    const days = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const next30Days = getNext30Days();

  // Check if date is today
  const isToday = (date: Date) => {
    if (!currentDate) return false;
    return currentDate.toDateString() === date.toDateString();
  };

  // Check if date is selected
  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return selectedDate.toDateString() === date.toDateString();
  };

  // Check if date is highlighted (June 15, 2024)
  const isHighlighted = (date: Date) => {
    return date.getFullYear() === 2024 && 
           date.getMonth() === 5 && 
           date.getDate() === 15;
  };

  // Format day name
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Format month name
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">Next 30 Days</h1>
        {selectedDate && (
          <p className="text-sm text-gray-600 mt-1">
            Selected: {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          {/* Grid Container */}
          <div className="grid grid-cols-7 gap-2">
            {/* Weekday Headers */}
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div key={index} className="aspect-square flex items-center justify-center text-sm font-semibold text-gray-500 pb-2">
                {day}
              </div>
            ))}
            
            {/* Empty cells to align first date to correct weekday */}
            {currentDate && Array.from({ length: (currentDate.getDay() + 6) % 7 }, (_, index) => (
              <div key={`empty-${index}`} className="aspect-square"></div>
            ))}
            
            {next30Days.map((date, index) => {
              const todayClass = isToday(date);
              const selectedClass = isSelected(date);
              const highlightedClass = isHighlighted(date);
              const isNewMonth = index === 0 || date.getMonth() !== next30Days[index - 1]?.getMonth();

              let cellClasses = "aspect-square flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-all hover:shadow-sm border ";
              
              if (highlightedClass) {
                cellClasses += "bg-[#E8F0FE] border-blue-300 text-blue-700 ";
              } else if (selectedClass) {
                cellClasses += "bg-blue-500 border-blue-500 text-white ";
              } else if (todayClass) {
                cellClasses += "ring-2 ring-blue-500 ring-offset-1 text-blue-600 border-blue-200 ";
              } else {
                cellClasses += "border-gray-200 hover:border-gray-300 hover:bg-gray-50 ";
              }

              return (
                <>
                  {/* Month Divider */}
                  {isNewMonth && index > 0 && (
                    <div className="col-span-7 flex items-center my-4">
                      <div className="flex-1 h-px bg-gray-200"></div>
                      <div className="px-4 text-sm font-semibold text-gray-600">
                        {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                  )}
                  
                  <div
                    key={index}
                    className={cellClasses}
                    onClick={() => setSelectedDate(new Date(date))}
                  >
                    {/* Day Number */}
                    <div className={`text-lg font-semibold ${
                      highlightedClass ? 'text-blue-700' : 
                      selectedClass ? 'text-white' : 
                      todayClass ? 'text-blue-600' : 'text-gray-800'
                    }`}>
                      {date.getDate()}
                    </div>
                    
                    {/* Status Indicators */}
                    <div className="flex flex-col items-center space-y-1 mt-1">
                      {todayClass && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      {highlightedClass && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-30">
        <div className="flex justify-between items-center">
          {/* House - Far Left */}
          <Link href="/dashboard">
            <button className="flex flex-col items-center space-y-1 p-2">
              <Home className="w-6 h-6 text-gray-600" />
            </button>
          </Link>

          {/* Calendar - Active */}
          <button className="flex flex-col items-center space-y-1 p-2">
            <Calendar className="w-6 h-6 text-blue-600" />
          </button>

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
