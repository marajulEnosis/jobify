'use client';

import ActiveFilters from '@/components/jobs/ActiveFilters';
import JobDetailsModal from '@/components/jobs/JobDetailsModal';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobsPagination from '@/components/jobs/JobsPagination';
import StickyHeader from '@/components/jobs/StickyHeader';
import { dummyJobs } from '@/data/dummy-data';
import { useJobFiltering } from '@/hooks/useJobFiltering';
import { initializeJobsData, jobsStorage } from '@/lib/localStorage';
import { Job, JobFilters } from '@/types';
import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 6;





export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    search: '',
    jobType: 'all',
    jobStatus: 'all',
    sortBy: 'dateApplied',
    sortOrder: 'desc'
  });

  // Load jobs from localStorage on mount
  useEffect(() => {
    const loadedJobs = initializeJobsData(dummyJobs);
    setJobs(loadedJobs);
  }, []);

  // Use the custom hook for filtering and sorting
  const filteredAndSortedJobs = useJobFiltering(jobs, filters);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = filteredAndSortedJobs.slice(startIndex, endIndex);

  // Handle adding new job
  const handleAddJob = (newJobData: Omit<Job, 'id' | 'dateApplied'>) => {
    const newJob: Job = {
      ...newJobData,
      id: Date.now().toString(), // Use timestamp for unique ID
      dateApplied: new Date().toISOString().split('T')[0]
    };
    const updatedJobs = jobsStorage.add(newJob);
    setJobs(updatedJobs);
    setCurrentPage(1); // Reset to first page when adding new job
  };

  // Handle editing a job
  const handleEditJob = (updatedJob: Job) => {
    const updatedJobs = jobsStorage.update(updatedJob);
    setJobs(updatedJobs);
    setSelectedJobId(null);
  };

  // Handle deleting a job
  const handleDeleteJob = (jobId: string) => {
    const updatedJobs = jobsStorage.delete(jobId);
    setJobs(updatedJobs);
    setSelectedJobId(null);
  };

  // Handle job card click
  const handleJobCardClick = (jobId: string) => {
    setSelectedJobId(jobId);
  };

  // Handle filter reset
  const resetFilters = () => {
    setFilters({
      search: '',
      jobType: 'all',
      jobStatus: 'all',
      sortBy: 'dateApplied',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* Sticky Header */}
      <StickyHeader
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        filteredJobsCount={filteredAndSortedJobs.length}
        totalJobsCount={jobs.length}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        onAddJob={handleAddJob}
      />

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Active Filters Indicator */}
        <ActiveFilters filters={filters} resetFilters={resetFilters} />

        {/* Jobs Grid */}
        <JobsGrid 
          jobs={currentJobs} 
          onAddJob={handleAddJob}
          onJobClick={handleJobCardClick}
        />

        {/* Job Details Modal */}
        <JobDetailsModal
          job={selectedJobId ? jobsStorage.getById(selectedJobId) || null : null}
          isOpen={!!selectedJobId}
          onClose={() => setSelectedJobId(null)}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />

        {/* Pagination */}
        <JobsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
