"use client";

import { Home, Calendar, MessageCircle, User, Send, Clock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");

  // Sample chat messages about dating topics
  const messages = [
    {
      id: 1,
      sender: "Max",
      text: "Hey! Looking forward to Saturday. What's your favorite cuisine?",
      time: "2:15 PM",
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      text: "Hi Max! I love Italian food, especially pasta dishes. What about you?",
      time: "2:18 PM",
      isOwn: true
    },
    {
      id: 3,
      sender: "Max",
      text: "Perfect! I know this amazing Italian place downtown. They have the best carbonara 👨‍🍳",
      time: "2:20 PM",
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      text: "That sounds wonderful! I'm excited to try it 😊",
      time: "2:22 PM",
      isOwn: true
    },
    {
      id: 5,
      sender: "Max",
      text: "Great! By the way, do you have any favorite hobbies? I love hiking and photography",
      time: "2:25 PM",
      isOwn: false
    },
    {
      id: 6,
      sender: "You", 
      text: "I love reading and painting! And hiking sounds fun, maybe we could do that sometime too",
      time: "2:27 PM",
      isOwn: true
    },
    {
      id: 7,
      sender: "Max",
      text: "That would be amazing! I'd love to show you some great trails around the city 🏔️",
      time: "2:30 PM",
      isOwn: false
    },
    {
      id: 8,
      sender: "You",
      text: "I saw some of your photos on your profile - you're really talented! The mountain sunset one is gorgeous",
      time: "2:32 PM",
      isOwn: true
    },
    {
      id: 9,
      sender: "Max",
      text: "Thank you so much! That means a lot 😊 That was taken during a weekend trip to the Alps",
      time: "2:35 PM",
      isOwn: false
    },
    {
      id: 10,
      sender: "Max",
      text: "I'd love to see some of your paintings sometime! What style do you usually work in?",
      time: "2:36 PM",
      isOwn: false
    },
    {
      id: 11,
      sender: "You",
      text: "I mostly do watercolors and some acrylics. I love painting landscapes and cityscapes",
      time: "2:38 PM",
      isOwn: true
    },
    {
      id: 12,
      sender: "Max",
      text: "That's so cool! We should definitely plan a day where I can take photos and you can paint the same scenery",
      time: "2:40 PM",
      isOwn: false
    },
    {
      id: 13,
      sender: "You",
      text: "What a creative idea! I'd love that. Maybe we could start with something close by first?",
      time: "2:42 PM",
      isOwn: true
    },
    {
      id: 14,
      sender: "Max",
      text: "Absolutely! There's a beautiful park near the city center with a lake. Perfect for both photos and painting",
      time: "2:44 PM",
      isOwn: false
    },
    {
      id: 15,
      sender: "You",
      text: "That sounds perfect! So excited for Saturday already 🎨📸",
      time: "2:46 PM",
      isOwn: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header with Profile */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        {/* Time Left Banner */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">13h chat left</span>
          </div>
        </div>
        
        {/* Profile Header */}
        <div className="p-4">
          <div className="flex items-center space-x-3">
            {/* Profile Picture */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">MM</span>
            </div>
            
            {/* Name and Status */}
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Max Mustermann</h1>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages - scrolls behind fixed header and bottom navigation */}
      <div className="pt-28 pb-32 px-4 space-y-4 overflow-y-auto min-h-screen">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isOwn
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isOwn ? 'text-pink-100' : 'text-gray-500'
              }`}>
                {message.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input - positioned above bottom navigation */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
          <button className="bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors">
            <Send className="w-5 h-5" />
          </button>
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

          {/* Chat - Active */}
          <button className="flex flex-col items-center space-y-1 p-2">
            <MessageCircle className="w-6 h-6 text-pink-500" />
          </button>

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
