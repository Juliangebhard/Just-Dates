"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, Utensils, Film, Heart, Coffee, MapPin, Activity, Gamepad2, Car, Plane, Ship } from "lucide-react";
import Link from "next/link";

interface Activity {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  activities: Activity[];
}

export default function DateCreationP2() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedDate = searchParams.get('date');
  const selectedTime = searchParams.get('time');
  
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Parse the selected date
  const parsedDate = selectedDate ? new Date(selectedDate) : new Date();
  const formattedDate = parsedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const timeLabel = selectedTime === 'early' ? 'Early in the Day' : 'Later that Day';

  // Activity categories and their activities
  const categories: Category[] = [
    {
      id: 'sports',
      name: 'Sports & Recreation',
      icon: <Activity className="w-5 h-5" />,
      activities: [
        { id: 'tennis', name: 'Tennis', icon: <Activity className="w-4 h-4" />, description: 'Play a friendly match' },
        { id: 'football', name: 'Football', icon: <Activity className="w-4 h-4" />, description: 'Kick around at the park' },
        { id: 'basketball', name: 'Basketball', icon: <Activity className="w-4 h-4" />, description: 'Shoot some hoops' },
        { id: 'swimming', name: 'Swimming', icon: <Activity className="w-4 h-4" />, description: 'Take a dip together' },
        { id: 'hiking', name: 'Hiking', icon: <Activity className="w-4 h-4" />, description: 'Explore nature trails' },
        { id: 'cycling', name: 'Cycling', icon: <Activity className="w-4 h-4" />, description: 'Bike ride adventure' },
        { id: 'rock-climbing', name: 'Rock Climbing', icon: <Activity className="w-4 h-4" />, description: 'Indoor climbing gym' },
      ]
    },
    {
      id: 'food',
      name: 'Food & Dining',
      icon: <Utensils className="w-5 h-5" />,
      activities: [
        { id: 'restaurant', name: 'Restaurant', icon: <Utensils className="w-4 h-4" />, description: 'Fine dining experience' },
        { id: 'cafe', name: 'Café', icon: <Coffee className="w-4 h-4" />, description: 'Cozy coffee date' },
        { id: 'cooking', name: 'Cooking Class', icon: <Utensils className="w-4 h-4" />, description: 'Learn to cook together' },
        { id: 'food-tour', name: 'Food Tour', icon: <MapPin className="w-4 h-4" />, description: 'Explore local cuisine' },
        { id: 'picnic', name: 'Picnic', icon: <Utensils className="w-4 h-4" />, description: 'Outdoor dining experience' },
        { id: 'wine-tasting', name: 'Wine Tasting', icon: <Utensils className="w-4 h-4" />, description: 'Sample fine wines' },
        { id: 'dessert', name: 'Dessert Spot', icon: <Utensils className="w-4 h-4" />, description: 'Sweet treats together' },
      ]
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: <Film className="w-5 h-5" />,
      activities: [
        { id: 'movie', name: 'Movie', icon: <Film className="w-4 h-4" />, description: 'Watch a film together' },
        { id: 'concert', name: 'Concert', icon: <Film className="w-4 h-4" />, description: 'Live music experience' },
        { id: 'museum', name: 'Museum', icon: <Film className="w-4 h-4" />, description: 'Explore art & history' },
        { id: 'escape-room', name: 'Escape Room', icon: <Gamepad2 className="w-4 h-4" />, description: 'Solve puzzles together' },
        { id: 'bowling', name: 'Bowling', icon: <Gamepad2 className="w-4 h-4" />, description: 'Friendly competition' },
        { id: 'arcade', name: 'Arcade', icon: <Gamepad2 className="w-4 h-4" />, description: 'Play games together' },
        { id: 'theater', name: 'Theater', icon: <Film className="w-4 h-4" />, description: 'Watch a live show' },
      ]
    },
    {
      id: 'romantic',
      name: 'Romantic',
      icon: <Heart className="w-5 h-5" />,
      activities: [
        { id: 'sunset-walk', name: 'Sunset Walk', icon: <Heart className="w-4 h-4" />, description: 'Romantic evening stroll' },
        { id: 'stargazing', name: 'Stargazing', icon: <Heart className="w-4 h-4" />, description: 'Watch the stars together' },
        { id: 'couples-massage', name: 'Couples Massage', icon: <Heart className="w-4 h-4" />, description: 'Relaxing spa treatment' },
        { id: 'dance-lesson', name: 'Dance Lesson', icon: <Heart className="w-4 h-4" />, description: 'Learn to dance together' },
        { id: 'hot-air-balloon', name: 'Hot Air Balloon', icon: <Heart className="w-4 h-4" />, description: 'Scenic aerial adventure' },
        { id: 'couples-yoga', name: 'Couples Yoga', icon: <Heart className="w-4 h-4" />, description: 'Mindful movement together' },
      ]
    },
    {
      id: 'adventure',
      name: 'Adventure',
      icon: <MapPin className="w-5 h-5" />,
      activities: [
        { id: 'kayaking', name: 'Kayaking', icon: <Ship className="w-4 h-4" />, description: 'Paddle through waters' },
        { id: 'zip-lining', name: 'Zip Lining', icon: <MapPin className="w-4 h-4" />, description: 'Thrilling aerial adventure' },
        { id: 'paragliding', name: 'Paragliding', icon: <Plane className="w-4 h-4" />, description: 'Soar through the sky' },
        { id: 'scuba-diving', name: 'Scuba Diving', icon: <Ship className="w-4 h-4" />, description: 'Explore underwater world' },
        { id: 'skydiving', name: 'Skydiving', icon: <Plane className="w-4 h-4" />, description: 'Ultimate adrenaline rush' },
        { id: 'rock-climbing-outdoor', name: 'Outdoor Climbing', icon: <Activity className="w-4 h-4" />, description: 'Natural rock faces' },
      ]
    }
  ];

  const handleActivitySelect = (activityId: string) => {
    setSelectedActivity(activityId);
    // Navigate to the next step with all selected parameters
    const nextStepUrl = `/dateCreationP3?date=${selectedDate}&time=${selectedTime}&activity=${activityId}`;
    router.push(nextStepUrl);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Link href="/dateCreationP1">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Choose Activity</h1>
            <p className="text-sm text-gray-600">Step 2 of 3</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Selected Date and Time Display */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Date Details</h2>
            <p className="text-xl font-bold text-blue-600 mb-1">{formattedDate}</p>
            <p className="text-sm text-gray-600">{timeLabel}</p>
          </div>
        </div>

        {/* Activity Categories */}
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                </div>
                <div className={`transform transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Category Activities */}
              {expandedCategory === category.id && (
                <div className="border-t border-gray-100">
                  <div className="p-4 space-y-2">
                    {category.activities.map((activity) => (
                      <button
                        key={activity.id}
                        onClick={() => handleActivitySelect(activity.id)}
                        className="w-full p-3 flex items-center space-x-3 hover:bg-blue-50 rounded-lg transition-colors group"
                      >
                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                          {activity.icon}
                        </div>
                        <div className="flex-1 text-left">
                          <h4 className="font-medium text-gray-800">{activity.name}</h4>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                        </div>
                        <div className="p-1">
                          <Check className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 