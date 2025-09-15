import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/types';
import {
    Building,
    Calendar,
    Clock,
    DollarSign,
    MapPin,
} from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick?: (jobId: string) => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(job.id);
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm';
      case 'interview': return 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm';
      case 'declined': return 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm';
      case 'accepted': return 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm';
      default: return 'bg-slate-50 text-slate-700 border-slate-200 shadow-sm';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'part-time': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'contract': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'internship': return 'bg-violet-50 text-violet-700 border-violet-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <Card 
      className="h-full hover:shadow-xl transition-all duration-300 hover:border-indigo-200 hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50 cursor-pointer hover:scale-105"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-slate-600" />
            <CardTitle className="text-lg text-slate-800">{job.company}</CardTitle>
          </div>
          <Badge className={getStatusColor(job.jobStatus)}>
            {job.jobStatus}
          </Badge>
        </div>
        <CardDescription className="text-base font-medium text-slate-700">
          {job.position}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span>{job.location}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={getJobTypeColor(job.jobType)}>
            <Clock className="h-3 w-3 mr-1" />
            {job.jobType}
          </Badge>
          {job.salary && (
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <DollarSign className="h-4 w-4 text-emerald-600" />
              <span className="font-medium text-emerald-700">{job.salary}</span>
            </div>
          )}
        </div>

        {job.description && (
          <p className="text-sm text-slate-600 line-clamp-2">
            {job.description}
          </p>
        )}

        <div className="space-y-1 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="h-3 w-3" />
            <span>Applied: {new Date(job.dateApplied).toLocaleDateString()}</span>
          </div>
          {job.interviewDate && (
            <div className="flex items-center gap-2 text-xs text-blue-600">
              <Clock className="h-3 w-3" />
              <span>Interview: {new Date(job.interviewDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
