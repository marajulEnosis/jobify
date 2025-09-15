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


  useEffect(() => {
    const loadedJobs = initializeJobsData(dummyJobs);
    setJobs(loadedJobs);
  }, []);


  const filteredAndSortedJobs = useJobFiltering(jobs, filters);


  const totalPages = Math.ceil(filteredAndSortedJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentJobs = filteredAndSortedJobs.slice(startIndex, endIndex);


  const handleAddJob = (newJobData: Omit<Job, 'id' | 'dateApplied'>) => {
    const newJob: Job = {
      ...newJobData,
      id: Date.now().toString(), 
      dateApplied: new Date().toISOString().split('T')[0]
    };
    const updatedJobs = jobsStorage.add(newJob);
    setJobs(updatedJobs);
    setCurrentPage(1);
  };


  const handleEditJob = (updatedJob: Job) => {
    const updatedJobs = jobsStorage.update(updatedJob);
    setJobs(updatedJobs);
    setSelectedJobId(null);
  };


  const handleDeleteJob = (jobId: string) => {
    const updatedJobs = jobsStorage.delete(jobId);
    setJobs(updatedJobs);
    setSelectedJobId(null);
  };

  const handleJobCardClick = (jobId: string) => {
    setSelectedJobId(jobId);
  };


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


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">

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


      <div className="p-6 space-y-6">

        <ActiveFilters filters={filters} resetFilters={resetFilters} />

   
        <JobsGrid 
          jobs={currentJobs} 
          onAddJob={handleAddJob}
          onJobClick={handleJobCardClick}
        />

        <JobDetailsModal
          job={selectedJobId ? jobsStorage.getById(selectedJobId) || null : null}
          isOpen={!!selectedJobId}
          onClose={() => setSelectedJobId(null)}
          onEdit={handleEditJob}
          onDelete={handleDeleteJob}
        />


        <JobsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
