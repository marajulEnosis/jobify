import { Card, CardContent } from '@/components/ui/card';
import { Job } from '@/types';
import { Briefcase } from 'lucide-react';
import AddJobModal from './AddJobModal';
import JobCard from './JobCard';

interface JobsGridProps {
  jobs: Job[];
  onAddJob: (job: Omit<Job, 'id' | 'dateApplied'>) => void;
  onJobClick?: (jobId: string) => void;
}

export default function JobsGrid({ jobs, onAddJob, onJobClick }: JobsGridProps) {
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
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={onJobClick} />
      ))}
    </div>
  );
}
