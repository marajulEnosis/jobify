'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { Building, MapPin } from 'lucide-react';
import { CalendarEvent } from './InterviewCalendar';

interface InterviewDetailsProps {
  selectedEvent: CalendarEvent | null;
}

export default function InterviewDetails({ selectedEvent }: InterviewDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'interview':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!selectedEvent) {
    return null;
  }

  return (
    <Card className="mt-4 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800">
          Interview Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-medium text-slate-800 mb-1">
            {selectedEvent.resource.position}
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
            <Building className="h-4 w-4" />
            <span>{selectedEvent.resource.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{selectedEvent.resource.location}</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-slate-200">
          <Badge className={getStatusColor(selectedEvent.resource.jobStatus)}>
            {selectedEvent.resource.jobStatus}
          </Badge>
        </div>
        
        {selectedEvent.resource.salary && (
          <div className="pt-2">
            <span className="text-sm font-medium text-slate-700">
              Salary: {selectedEvent.resource.salary}
            </span>
          </div>
        )}
        
        {selectedEvent.resource.description && (
          <div className="pt-2">
            <p className="text-sm text-slate-600">
              {selectedEvent.resource.description}
            </p>
          </div>
        )}
        
        <div className="pt-2 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            <strong>Interview Time:</strong><br />
            {format(selectedEvent.start, 'EEEE, MMMM dd, yyyy')}<br />
            {format(selectedEvent.start, 'h:mm a')} - {format(selectedEvent.end, 'h:mm a')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}