'use client';

import { Card, CardContent } from '@/components/ui/card';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer for react-big-calendar
const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define the event type for the calendar
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: any; // Job type
}

interface InterviewCalendarProps {
  events: CalendarEvent[];
  onEventSelect: (event: CalendarEvent) => void;
}

export default function InterviewCalendar({ events, onEventSelect }: InterviewCalendarProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-6">
        <div style={{ height: '600px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={onEventSelect}
            style={{ height: '100%' }}
            views={['month', 'week', 'day']}
            defaultView="month"
            eventPropGetter={(event) => {
              const job = event.resource;
              let backgroundColor = '#3b82f6'; // Default blue
              
              switch (job?.jobStatus) {
                case 'interview':
                  backgroundColor = '#10b981'; // Green
                  break;
                case 'pending':
                  backgroundColor = '#f59e0b'; // Yellow
                  break;
                case 'declined':
                  backgroundColor = '#ef4444'; // Red
                  break;
                case 'accepted':
                  backgroundColor = '#8b5cf6'; // Purple
                  break;
              }

              return {
                style: {
                  backgroundColor,
                  borderRadius: '6px',
                  border: 'none',
                  color: 'white',
                  fontSize: '11px',
                  padding: '2px 4px',
                  marginBottom: '1px',
                  fontWeight: '500',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                },
              };
            }}
            dayPropGetter={(date) => {
              const today = new Date();
              const isToday = 
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
              
              return {
                style: {
                  backgroundColor: isToday ? '#f0f9ff' : undefined,
                },
              };
            }}
            components={{
              toolbar: (props) => (
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => props.onNavigate('PREV')}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => props.onNavigate('TODAY')}
                      className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                    >
                      Today
                    </button>
                    <button
                      onClick={() => props.onNavigate('NEXT')}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer"
                    >
                      Next
                    </button>
                  </div>
                  
                  <h2 className="text-lg font-semibold text-slate-800">
                    {props.label}
                  </h2>
                  
                  <div className="flex items-center gap-1">
                    {['month', 'week', 'day'].map((viewName) => (
                      <button
                        key={viewName}
                        onClick={() => props.onView(viewName as any)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                          props.view === viewName
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {viewName.charAt(0).toUpperCase() + viewName.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              ),
              event: ({ event }: { event: CalendarEvent }) => (
                <div className="text-xs font-medium truncate hover:bg-opacity-80 transition-all duration-200">
                  <div className="truncate">{event.resource?.position || event.title}</div>
                  <div className="truncate opacity-75">{event.resource?.company}</div>
                </div>
              ),
              month: {
                dateHeader: ({ date, label }: { date: Date; label: string }) => {
                  const dayEvents = events.filter(event => {
                    const eventDate = new Date(event.start);
                    return eventDate.toDateString() === date.toDateString();
                  });

                  return (
                    <div className="relative">
                      <span className={`${
                        dayEvents.length > 0 
                          ? 'font-bold text-blue-600' 
                          : ''
                      }`}>
                        {label}
                      </span>
                      {dayEvents.length > 3 && (
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                          {dayEvents.length}
                        </div>
                      )}
                    </div>
                  );
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}