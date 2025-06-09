"use client";

import { Home, Calendar, MessageCircle, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Set current date on client side to avoid hydration mismatch
  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  }, []);

  // Auto-scroll to current date when page loads
  useEffect(() => {
    if (currentDate && scrollContainerRef.current) {
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      
      // Wait a bit for the DOM to be ready
      setTimeout(() => {
        const yearElement = document.getElementById(`year-${currentYear}`);
        if (yearElement) {
          yearElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
    }
  }, [currentDate]);

  // Generate years from 2020 to 2030
  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Check if date is today
  const isToday = (year: number, month: number, day: number) => {
    if (!currentDate) return false;
    return currentDate.getFullYear() === year &&
           currentDate.getMonth() === month &&
           currentDate.getDate() === day;
  };

  // Check if date is selected
  const isSelected = (year: number, month: number, day: number) => {
    if (!selectedDate) return false;
    return selectedDate.getFullYear() === year &&
           selectedDate.getMonth() === month &&
           selectedDate.getDate() === day;
  };

  // Check if date is highlighted (June 15, 2024) - same as dashboard
  const isHighlighted = (year: number, month: number, day: number) => {
    return year === 2024 && month === 5 && day === 15; // June = month 5 (0-indexed)
  };

  const renderMonth = (year: number, monthIndex: number) => {
    const daysInMonth = getDaysInMonth(year, monthIndex);
    const firstDay = getFirstDayOfMonth(year, monthIndex);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const todayClass = isToday(year, monthIndex, day);
      const selectedClass = isSelected(year, monthIndex, day);
      const highlightedClass = isHighlighted(year, monthIndex, day);

      let dayClasses = "h-10 flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors ";
      
      if (highlightedClass) {
        // Same styling as dashboard for June 15
        dayClasses += "bg-pink-500 text-white font-semibold ";
      } else if (selectedClass) {
        dayClasses += "bg-blue-500 text-white font-semibold ";
      } else if (todayClass) {
        // Same styling as dashboard for today's date
        dayClasses += "ring-2 ring-blue-500 ring-offset-1 text-blue-600 font-semibold ";
      } else {
        dayClasses += "text-gray-700 hover:bg-gray-100 ";
      }

      days.push(
        <div
          key={day}
          className={dayClasses}
          onClick={() => setSelectedDate(new Date(year, monthIndex, day))}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {months[monthIndex]} {year}
        </h3>
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
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

      {/* Scrollable Calendar Content */}
      <div ref={scrollContainerRef} className="p-4 space-y-6 overflow-y-auto">
        {years.map((year) => (
          <div key={year} id={`year-${year}`} className="space-y-6">
            {/* Year Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{year}</h2>
            </div>
            
            {/* Months for this year */}
            <div className="space-y-4">
              {months.map((_, monthIndex) => (
                renderMonth(year, monthIndex)
              ))}
            </div>
          </div>
        ))}
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
            <Calendar className="w-6 h-6 text-pink-500" />
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
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
