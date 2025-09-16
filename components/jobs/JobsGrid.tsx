import { Card, CardContent } from '@/components/ui/card';
import { Job } from '@/types';
import { Briefcase, Loader2 } from 'lucide-react';
import AddJobModal from './AddJobModal';
import JobCard from './JobCard';

interface JobsGridProps {
  jobs: Job[];
  onAddJob: (job: Omit<Job, 'id' | 'dateApplied'>) => void;
  onJobClick?: (jobId: string) => void;
  loadMoreRef?: (node: HTMLElement | null) => void;
  hasMoreJobs?: boolean;
  isFetchingMore?: boolean;
}

export default function JobsGrid({ 
  jobs, 
  onAddJob, 
  onJobClick, 
  loadMoreRef, 
  hasMoreJobs, 
  isFetchingMore 
}: JobsGridProps) {
  if (jobs.length === 0) {
    return (
      <Card className="text-center py-12 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent>
          <Briefcase className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">No jobs found</h3>
          <p className="text-slate-600 mb-4">
            Try adjusting your filters or add a new job application.
          </p>
          <AddJobModal onAddJob={onAddJob} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onClick={onJobClick} />
        ))}
      </div>
      
      {/* Infinite scroll trigger and loading indicator */}
      {hasMoreJobs && (
        <div className="flex justify-center py-6">
          {isFetchingMore ? (
            <div className="flex items-center gap-2 text-slate-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading more jobs...</span>
            </div>
          ) : (
            <div 
              ref={loadMoreRef} 
              className="h-10 flex items-center justify-center text-slate-500 text-sm"
            >
              Scroll to load more jobs
            </div>
          )}
        </div>
      )}
    </div>
  );
}
