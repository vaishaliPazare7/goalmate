import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Briefcase, Calendar } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    occupation: 'Software Engineer',
    joinDate: 'January 2024',
    bio: 'Passionate about personal development and achieving goals. Always striving to learn and grow.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the profile changes to your backend
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="relative h-32 bg-blue-600">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                  <Camera size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-16 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-2xl font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              )}
              <p className="text-gray-500">{profile.occupation}</p>
            </div>
            <button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={18} />
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="bg-gray-100 px-2 py-1 rounded flex-1"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={18} />
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="bg-gray-100 px-2 py-1 rounded flex-1"
                  />
                ) : (
                  <span>{profile.phone}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin size={18} />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="bg-gray-100 px-2 py-1 rounded flex-1"
                  />
                ) : (
                  <span>{profile.location}</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Briefcase size={18} />
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.occupation}
                    onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                    className="bg-gray-100 px-2 py-1 rounded flex-1"
                  />
                ) : (
                  <span>{profile.occupation}</span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={18} />
                <span>Joined {profile.joinDate}</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full h-32 bg-gray-100 px-3 py-2 rounded"
              />
            ) : (
              <p className="text-gray-600">{profile.bio}</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Goal Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-600">Goals Completed</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Active Goals</div>
          </div>
        </div>
      </div>
    </div>
  );
};