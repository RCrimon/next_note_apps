"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Lock} from 'lucide-react'; 
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-8">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-600">Welcome Back</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">Log in to access your notes</p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-zinc-400" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all dark:text-white"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95"
            
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          <span className="px-3 text-sm text-zinc-400">OR</span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
        </div>

        {/* Google Login Button */}
        <button 
          className="w-full py-3 flex items-center justify-center gap-3 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors mb-6 text-zinc-700 dark:text-zinc-300"
          onClick={async()=>{
              await signIn('google',{
                callbackUrl:'/'
              })
            }}
        >
          <FcGoogle />
          Continue with Google
        </button>

        {/* Footer: Register Link */}
        <div className="text-center">
          <p className="text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link 
              href="/register" 
              className="text-amber-600 font-bold hover:underline underline-offset-4"
            >
              Create a new account / Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}