'use client';

import InterviewCalendar, { CalendarEvent } from '@/components/interviews/InterviewCalendar';
import InterviewDetails from '@/components/interviews/InterviewDetails';
import InterviewHeader from '@/components/interviews/InterviewHeader';
import UpcomingInterviews from '@/components/interviews/UpcomingInterviews';
import { jobsStorage } from '@/lib/localStorage';
import { Job } from '@/types';
import { useEffect, useMemo, useState } from 'react';

export default function InterviewsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Load jobs from localStorage on component mount
  useEffect(() => {
    const loadedJobs = jobsStorage.load();
    setJobs(loadedJobs);
  }, []);

  // Create calendar events from jobs with interview dates
  const calendarEvents = useMemo(() => {
    return jobs
      .filter(job => job.interviewDate && job.jobStatus === 'interview')
      .map((job): CalendarEvent => {
        const interviewDate = new Date(job.interviewDate!);
        return {
          id: job.id,
          title: `${job.position} - ${job.company}`,
          start: interviewDate,
          end: new Date(interviewDate.getTime() + 60 * 60 * 1000), // 1 hour duration
          resource: job,
        };
      });
  }, [jobs]);

  // Get upcoming interviews (next 7 days)
  const upcomingInterviews = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    return calendarEvents
      .filter(event => event.start >= today && event.start <= nextWeek)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [calendarEvents]);

  const handleEventSelect = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Header */}
      <InterviewHeader />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Upcoming Interviews Sidebar */}
          <div className="lg:col-span-1">
            <UpcomingInterviews 
              upcomingInterviews={upcomingInterviews}
              onInterviewSelect={handleEventSelect}
            />

            {/* Selected Event Details */}
            <InterviewDetails selectedEvent={selectedEvent} />
          </div>

          {/* Calendar */}
          <div className="lg:col-span-3">
            <InterviewCalendar 
              events={calendarEvents}
              onEventSelect={handleEventSelect}
            />
          </div>
        </div>
      </div>
    </div>
  );
}