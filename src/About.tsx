// src/components/About/AboutView.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Banner Section */}
      <div className="relative rounded-xl overflow-hidden mb-10 h-64 md:h-80">
        <img
          src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          alt="Application Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50 flex flex-col justify-center px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Our Application
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-6">
            The all-in-one solution for your productivity and organization needs
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg w-fit transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Our Mission
        </h2>
        <p className="text-gray-600 mb-4">
          Our application aims to help users organize their schedule, track
          progress, and manage their personal profile effectively. We're
          committed to providing a seamless and intuitive user experience.
        </p>
        <p className="text-gray-600">
          Whether you're using the dashboard for an overview, the calendar for
          scheduling, the progress tracker for goals, or managing your profile,
          we've designed each feature with simplicity and functionality in mind.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Our Team
          </h2>
          <p className="text-gray-600 mb-4">
            We are a dedicated team of developers, designers, and product
            specialists passionate about creating tools that make your life
            easier and more organized.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Vaishali Pazare-Lead Developer</li>
            <li>UI/UX Designer</li>
            <li>Product Manager</li>
            <li>QA Specialist</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            We value your feedback and are always looking to improve our
            application. Feel free to reach out to us with any questions,
            suggestions, or concerns.
          </p>
          <div className="text-gray-600 space-y-2">
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Email:</span> vaishalipazare651@gmail.com
            </p>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="font-medium">Phone:</span> (7447)622879
            </p>
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium">Address:</span> Pune, Maharshtra 
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
          Version History
        </h2>
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-medium text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Version 2.0.0
            </h3>
            <p className="text-gray-600 ml-4">
              Complete UI overhaul and performance improvements
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-medium text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Version 1.2.0
            </h3>
            <p className="text-gray-600 ml-4">
              Introduced progress tracking and analytics
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-medium text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Version 1.1.0
            </h3>
            <p className="text-gray-600 ml-4">
              Added calendar integration and improved UI
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
            <h3 className="text-lg font-medium text-gray-700 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Version 1.0.0
            </h3>
            <p className="text-gray-600 ml-4">
              Initial release with core functionality
            </p>
          </div>
        </div>
      </div>

      {/* Get Started Call-to-Action */}
      <div className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-center shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to boost your productivity?
        </h2>
        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of users who have transformed how they organize their
          work and life.
        </p>
        <button 
          onClick={() => navigate("/dashboard")} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg w-fit transition-all shadow-lg hover:shadow-xl" >
          Get Started Now
        </button>
      </div>
    </div>
  );
};

export default About;
