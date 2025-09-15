'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Building, Clock, MapPin } from 'lucide-react';
import { CalendarEvent } from './InterviewCalendar';

interface UpcomingInterviewsProps {
  upcomingInterviews: CalendarEvent[];
  onInterviewSelect: (event: CalendarEvent) => void;
}

export default function UpcomingInterviews({ 
  upcomingInterviews, 
  onInterviewSelect 
}: UpcomingInterviewsProps) {
  // Group interviews by date
  const groupedInterviews = upcomingInterviews.reduce((groups, event) => {
    const dateKey = format(event.start, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
    return groups;
  }, {} as Record<string, CalendarEvent[]>);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          Upcoming Interviews
          {upcomingInterviews.length > 0 && (
            <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {upcomingInterviews.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.keys(groupedInterviews).length > 0 ? (
          Object.entries(groupedInterviews)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([dateKey, events]) => (
              <div key={dateKey} className="space-y-2">
                {/* Date Header */}
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                  <div className="text-sm font-semibold text-slate-700">
                    {format(new Date(dateKey), 'EEEE, MMM dd')}
                  </div>
                  {events.length > 1 && (
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium">
                      {events.length} interviews
                    </span>
                  )}
                </div>
                
                {/* Interviews for this date */}
                <div className="space-y-2">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all duration-200 hover:shadow-sm"
                      onClick={() => onInterviewSelect(event)}
                    >
                      <div className="font-medium text-slate-800 text-sm mb-1">
                        {event.resource.position}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-600 mb-2">
                        <Building className="h-3 w-3" />
                        <span>{event.resource.company}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-600 mb-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.resource.location}</span>
                      </div>
                      <div className="text-xs font-medium text-blue-600">
                        {format(event.start, 'h:mm a')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-6">
            <Clock className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600">No upcoming interviews</p>
            <p className="text-xs text-slate-500 mt-1">
              Schedule interviews from your job applications
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}