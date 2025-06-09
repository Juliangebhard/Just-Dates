"use client";

import { Home, Calendar, MessageCircle, User, Edit3, Settings, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  // User profile data
  const userProfile = {
    name: "Antonia Sander :)",
    age: 28,
    location: "Berlin, Deutschland",
    occupation: "Software Developer",
    bio: "Ich liebe es, neue Leute kennenzulernen und gemeinsam schöne Momente zu erleben. In meiner Freizeit fotografiere ich gerne und gehe wandern.",
    interests: ["Wandern", "Fotografie", "Kochen", "Reisen"],
    joinDate: "März 2024"
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Profil</h1>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4 space-y-6">
        {/* Profile Picture and Basic Info */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Large Profile Picture */}
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-4xl">MM</span>
            </div>
            
            {/* Name and Age */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
              <p className="text-lg text-gray-600">{userProfile.age} Jahre</p>
            </div>
            
            {/* Location */}
            <div className="flex items-center text-gray-600">
              <span className="text-sm">{userProfile.location}</span>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Über mich</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Beruf</p>
              <p className="text-gray-800">{userProfile.occupation}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Bio</p>
              <p className="text-gray-800">{userProfile.bio}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">Interessen</p>
              <div className="flex flex-wrap gap-2">
                {userProfile.interests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-1">Mitglied seit</p>
              <p className="text-gray-800">{userProfile.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 p-6 pb-4">Einstellungen</h3>
          
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Allgemeine Einstellungen</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Privatsphäre</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800">Benachrichtigungen</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            
            <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors text-red-600">
              <div className="flex items-center space-x-3">
                <span className="text-red-600">Abmelden</span>
              </div>
              <ChevronRight className="w-5 h-5 text-red-400" />
            </button>
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

          {/* Profile Avatar - Far Right - Active */}
          <button className="flex flex-col items-center space-y-1 p-2">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
} 