"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Lock, User, UserPlus } from 'lucide-react'; 
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-amber-600">Create Account</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Join us to start taking notes</p>
        </div>

        {/* Register Form */}
        <form className="space-y-5">
          {/* Full Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
            <input 
              type="password" 
              placeholder="Create Password" 
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white"
              required
            />
          </div>

          {/* Signup Button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95 mt-2"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          <span className="px-3 text-sm text-zinc-400">OR</span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
        </div>

        {/* Google Signup Button (Re-using the SVG for real colors) */}
        <button 
          className="w-full py-3 flex items-center justify-center gap-3 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors mb-6 text-zinc-700 dark:text-zinc-300"
        >
          <FcGoogle />
          Sign up with Google
        </button>

        {/* Footer: Login Link */}
        <div className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link 
              href="/login" 
              className="text-amber-600 font-bold hover:underline underline-offset-4"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}