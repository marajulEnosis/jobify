'use client';

import { CalendarIcon } from 'lucide-react';

export default function InterviewHeader() {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Interview Calendar
            </h1>
            <p className="text-slate-600 mt-1">
              Track and manage your upcoming interviews
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}