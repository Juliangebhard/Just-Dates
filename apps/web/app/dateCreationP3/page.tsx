"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Heart, MapPin, Star, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Person {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  avatar: string;
  distance: string;
  rating: number;
  mutualInterests: number;
  dateInterests: string;
}

export default function DateCreationP3() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const dateParam = searchParams.get('date');
      const timeParam = searchParams.get('time');
      const activityParam = searchParams.get('activity');
      setSelectedDate(dateParam);
      setSelectedTime(timeParam);
      setSelectedActivity(activityParam);
    } catch (error) {
      console.log('Error getting search params:', error);
    }
  }, []);

  // Parse the selected date
  const parsedDate = selectedDate ? new Date(selectedDate) : new Date();
  const formattedDate = parsedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const timeLabel = selectedTime === 'early' ? 'Early in the Day' : 'Later that Day';

  // Get activity name from ID
  const getActivityName = (activityId: string) => {
    const activityMap: { [key: string]: string } = {
      'tennis': 'Tennis',
      'football': 'Football',
      'basketball': 'Basketball',
      'swimming': 'Swimming',
      'hiking': 'Hiking',
      'cycling': 'Cycling',
      'rock-climbing': 'Rock Climbing',
      'restaurant': 'Restaurant',
      'cafe': 'Café',
      'cooking': 'Cooking Class',
      'food-tour': 'Food Tour',
      'picnic': 'Picnic',
      'wine-tasting': 'Wine Tasting',
      'dessert': 'Dessert Spot',
      'movie': 'Movie',
      'concert': 'Concert',
      'museum': 'Museum',
      'escape-room': 'Escape Room',
      'bowling': 'Bowling',
      'arcade': 'Arcade',
      'theater': 'Theater',
      'sunset-walk': 'Sunset Walk',
      'stargazing': 'Stargazing',
      'couples-massage': 'Couples Massage',
      'dance-lesson': 'Dance Lesson',
      'hot-air-balloon': 'Hot Air Balloon',
      'couples-yoga': 'Couples Yoga',
      'kayaking': 'Kayaking',
      'zip-lining': 'Zip Lining',
      'paragliding': 'Paragliding',
      'scuba-diving': 'Scuba Diving',
      'skydiving': 'Skydiving',
      'rock-climbing-outdoor': 'Outdoor Climbing'
    };
    return activityMap[activityId] || 'Activity';
  };

  // Create date interests string
  const dateInterests = `${formattedDate} • ${timeLabel} • ${getActivityName(selectedActivity || '')}`;

  // 20 dummy people profiles
  const people: Person[] = [
    {
      id: '1',
      name: 'James Johnson',
      age: 28,
      location: 'Downtown',
      interests: ['Hiking', 'Food', 'Travel'],
      avatar: '👨‍🦰',
      distance: '2.3 km',
      rating: 4.8,
      mutualInterests: 3,
      dateInterests: dateInterests
    },
    {
      id: '2',
      name: 'Michael Chen',
      age: 31,
      location: 'Westside',
      interests: ['Rock Climbing', 'Technology', 'Beer'],
      avatar: '👨‍💻',
      distance: '4.1 km',
      rating: 4.6,
      mutualInterests: 2,
      dateInterests: dateInterests
    },
    {
      id: '3',
      name: 'Ethan Rodriguez',
      age: 26,
      location: 'East Village',
      interests: ['Art', 'Coffee', 'Nature'],
      avatar: '👨‍🎨',
      distance: '1.8 km',
      rating: 4.9,
      mutualInterests: 4,
      dateInterests: dateInterests
    },
    {
      id: '4',
      name: 'David Kim',
      age: 29,
      location: 'North Park',
      interests: ['Tennis', 'Fitness', 'Cooking'],
      avatar: '👨‍🏋️',
      distance: '3.7 km',
      rating: 4.7,
      mutualInterests: 3,
      dateInterests: dateInterests
    },
    {
      id: '5',
      name: 'Liam Thompson',
      age: 27,
      location: 'South Bay',
      interests: ['Yoga', 'Wellness', 'Outdoors'],
      avatar: '🧘‍♂️',
      distance: '5.2 km',
      rating: 4.8,
      mutualInterests: 2,
      dateInterests: dateInterests
    },
    {
      id: '6',
      name: 'Alex Martinez',
      age: 30,
      location: 'Midtown',
      interests: ['Music', 'Concerts', 'Food'],
      avatar: '🎵',
      distance: '2.9 km',
      rating: 4.5,
      mutualInterests: 3,
      dateInterests: dateInterests
    },
    {
      id: '7',
      name: 'Jason Wang',
      age: 25,
      location: 'Riverside',
      interests: ['Reading', 'Museums', 'Coffee'],
      avatar: '📚',
      distance: '3.4 km',
      rating: 4.9,
      mutualInterests: 4,
      dateInterests: dateInterests
    },
    {
      id: '8',
      name: 'Ryan O\'Connor',
      age: 32,
      location: 'Harbor District',
      interests: ['Kayaking', 'Ocean', 'Adventure'],
      avatar: '🌊',
      distance: '6.1 km',
      rating: 4.6,
      mutualInterests: 2,
      dateInterests: dateInterests
    },
    {
      id: '9',
      name: 'Marcus Garcia',
      age: 28,
      location: 'Central Plaza',
      interests: ['Cooking', 'Wine', 'Food'],
      avatar: '👨‍🍳',
      distance: '1.5 km',
      rating: 4.8,
      mutualInterests: 5,
      dateInterests: dateInterests
    },
    {
      id: '10',
      name: 'James Wilson',
      age: 29,
      location: 'University District',
      interests: ['Escape Rooms', 'Games', 'Technology'],
      avatar: '🎮',
      distance: '4.8 km',
      rating: 4.4,
      mutualInterests: 2,
      dateInterests: dateInterests
    },
    {
      id: '11',
      name: 'Sam Anderson',
      age: 26,
      location: 'Garden Heights',
      interests: ['Hiking', 'Nature', 'Stargazing'],
      avatar: '🌸',
      distance: '3.2 km',
      rating: 4.7,
      mutualInterests: 4,
      dateInterests: dateInterests
    },
    {
      id: '12',
      name: 'Carlos Mendez',
      age: 31,
      location: 'Sports Complex',
      interests: ['Basketball', 'Fitness', 'Health'],
      avatar: '🏀',
      distance: '2.7 km',
      rating: 4.6,
      mutualInterests: 3,
      dateInterests: dateInterests
    },
    {
      id: '13',
      name: 'Andrew Foster',
      age: 27,
      location: 'Theater District',
      interests: ['Theater', 'Movies', 'Culture'],
      avatar: '🎭',
      distance: '1.9 km',
      rating: 4.8,
      mutualInterests: 3,
      dateInterests: dateInterests
    },
    {
      id: '14',
      name: 'Kevin Park',
      age: 30,
      location: 'Tech Hub',
      interests: ['Bowling', 'Networking', 'Business'],
      avatar: '💼',
      distance: '4.3 km',
      rating: 4.5,
      mutualInterests: 2,
      dateInterests: dateInterests
    },
    {
      id: '15',
      name: 'Robert Green',
      age: 25,
      location: 'Art Quarter',
      interests: ['Photography', 'Art', 'Museums'],
      avatar: '📸',
      distance: '2.1 km',
      rating: 4.9,
      mutualInterests: 4,
      dateInterests: dateInterests
    },
    {
      id: '16',
      name: 'Tom Harris',
      age: 33,
      location: 'Mountain View',
      interests: ['Hiking', 'Climbing', 'Adventure'],
      avatar: '🏔️',
      distance: '7.5 km',
      rating: 4.7,
      mutualInterests: 3,
      dateInterests: dateInterests
    },
    {
      id: '17',
      name: 'Nick Patel',
      age: 28,
      location: 'Downtown East',
      interests: ['Dancing', 'Music', 'Social'],
      avatar: '💃',
      distance: '3.6 km',
      rating: 4.8,
      mutualInterests: 2,
      dateInterests: dateInterests
    },
    {
      id: '18',
      name: 'Marcus Johnson',
      age: 29,
      location: 'Harbor Front',
      interests: ['Sailing', 'Water Sports', 'Beach'],
      avatar: '⛵',
      distance: '5.9 km',
      rating: 4.6,
      mutualInterests: 2,
      dateInterests: dateInterests
    },
    {
      id: '19',
      name: 'Isaac Silva',
      age: 26,
      location: 'Cultural District',
      interests: ['Art History', 'Museums', 'Culture'],
      avatar: '🏛️',
      distance: '2.4 km',
      rating: 4.9,
      mutualInterests: 4,
      dateInterests: dateInterests
    },
    {
      id: '20',
      name: 'Daniel Lee',
      age: 31,
      location: 'Business District',
      interests: ['Golf', 'Wine', 'Fine Dining'],
      avatar: '⛳',
      distance: '4.7 km',
      rating: 4.5,
      mutualInterests: 3,
      dateInterests: dateInterests
    }
  ];

  const handlePersonSelect = (personId: string) => {
    setSelectedPerson(personId);
    // Navigate to home screen after selecting a person
    router.push('/dashboard');
  };

  // Don't render until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Link href="/dateCreationP2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Choose Your Date</h1>
            <p className="text-sm text-gray-600">Step 3 of 3</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Selected Date, Time, and Activity Display */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Date Plan</h2>
            <p className="text-xl font-bold text-blue-600 mb-1">{formattedDate}</p>
            <p className="text-sm text-gray-600 mb-2">{timeLabel}</p>
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-blue-700">{getActivityName(selectedActivity || '')}</span>
            </div>
          </div>
        </div>

        {/* People Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">People Interested in Similar Activities</h3>
          
          <div className="grid grid-cols-1 gap-4">
            {people.map((person) => (
              <button
                key={person.id}
                onClick={() => handlePersonSelect(person.id)}
                className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className="text-3xl">{person.avatar}</div>
                  
                  {/* Person Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{person.name}, {person.age}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{person.location} • {person.distance}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{person.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3 p-2 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">{person.dateInterests}</p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 