import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Icon } from './Icon';

const LoginPage: React.FC = () => {
    const { signInWithGoogle } = useAuth();
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="text-center p-8">
                 <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="bg-blue-500 p-3 rounded-xl">
                      <Icon name="dumbbell" className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900">Deepak's Fitness Tracker</h1>
                 </div>
                 <p className="text-slate-600 mb-8 max-w-md">
                     Welcome! Please sign in to track your fitness journey and access your personalized dashboard from any device.
                 </p>
                 <button 
                    onClick={signInWithGoogle}
                    className="inline-flex items-center gap-3 bg-white text-slate-700 px-6 py-3 rounded-lg shadow-md border border-slate-200 font-semibold hover:bg-slate-100 transition-colors"
                 >
                    <GoogleIcon />
                    Sign in with Google
                 </button>
            </div>
            <footer className="absolute bottom-4 text-center p-4 text-slate-500 text-sm">
                <p>Built by Deepak and AI ;)</p>
            </footer>
        </div>
    );
};

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.565-3.118-11.28-7.461l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.25,44,30.63,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


export default LoginPage;
