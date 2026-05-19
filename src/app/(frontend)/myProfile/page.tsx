"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, LogOut, Edit3, ArrowLeft, Camera } from 'lucide-react';

export default function MyProfilePage() {
  const router = useRouter();

  // Temporary user data (Ekhane apnar backend/session theke data ashbe)
  const user = {
    name: "Rimon Chowdhury",
    email: "rimon@example.com",
    image: null // Jodi image thake tobe URL hobe
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans p-4 md:p-8">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
          
          {/* Cover / Header Accent */}
          <div className="h-32 bg-gradient-to-r from-amber-500 to-amber-700"></div>

          {/* Profile Content */}
          <div className="relative px-6 pb-8">
            
            {/* Profile Image & Edit Icon */}
            <div className="relative -top-12 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shadow-lg">
                  {user.image ? (
                    <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-zinc-400" />
                  )}
                </div>
                {/* Image Edit/Camera Button */}
                <button className="absolute bottom-1 right-1 p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-md transition-transform active:scale-90">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* User Details */}
            <div className="text-center -mt-8 mb-8">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">{user.name}</h2>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Mail className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 uppercase font-semibold">Email Address</p>
                  <p className="text-zinc-700 dark:text-zinc-200">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-col gap-3">
              <button className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all">
                Edit Profile Settings
              </button>
              
              <button className="w-full py-3 flex items-center justify-center gap-2 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors border border-transparent hover:border-red-100 dark:hover:border-red-900/50">
                <LogOut className="w-5 h-5" />
                Logout Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}