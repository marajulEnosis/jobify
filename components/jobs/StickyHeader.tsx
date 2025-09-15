import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Job, JobFilters } from '@/types';
import { Filter, SlidersHorizontal } from 'lucide-react';
import AddJobModal from './AddJobModal';
import FilterPanel from './FilterPanel';

interface StickyHeaderProps {
  filters: JobFilters;
  setFilters: React.Dispatch<React.SetStateAction<JobFilters>>;
  resetFilters: () => void;
  filteredJobsCount: number;
  totalJobsCount: number;
  isFilterOpen: boolean;
  setIsFilterOpen: (open: boolean) => void;
  onAddJob: (job: Omit<Job, 'id' | 'dateApplied'>) => void;
}

export default function StickyHeader({
  filters,
  setFilters,
  resetFilters,
  filteredJobsCount,
  totalJobsCount,
  isFilterOpen,
  setIsFilterOpen,
  onAddJob
}: StickyHeaderProps) {
  const activeFilterCount = [
    filters.search, 
    filters.jobType !== 'all' ? '1' : '', 
    filters.jobStatus !== 'all' ? '1' : ''
  ].filter(Boolean).length;

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg">
      <div className="p-6 pt-16 md:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 sm:gap-6">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-800 to-indigo-600 bg-clip-text text-transparent">
              All Jobs
            </h1>
            <p className="text-slate-600 mt-1 text-sm sm:text-base">
              Manage and track all your job applications
            </p>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            {/* Filter Toggle Button */}
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 shadow-sm transition-all duration-200 h-11 px-4 font-medium cursor-pointer hover:scale-105 hover:shadow-md"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span className="hidden sm:inline">Filters</span>
                  <span className="sm:hidden">Filter</span>
                  {activeFilterCount > 0 && (
                    <Badge className="ml-1 px-2 py-0.5 text-xs h-5 bg-indigo-500 text-white rounded-full min-w-[20px] flex items-center justify-center">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-full sm:w-[480px] md:w-[520px] flex flex-col bg-white border-l border-slate-200 p-0"
              >
                <SheetHeader className="px-6 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-indigo-50">
                  <SheetTitle className="flex items-center gap-3 text-xl font-bold text-slate-800">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Filter className="h-5 w-5 text-indigo-600" />
                    </div>
                    Filter Jobs
                  </SheetTitle>
                  <SheetDescription className="text-slate-600 text-base mt-2">
                    Refine your job search with the filters below
                  </SheetDescription>
                </SheetHeader>
                
                <div className="flex-1 px-6 py-6 overflow-hidden">
                  <FilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    resetFilters={resetFilters}
                    filteredJobsCount={filteredJobsCount}
                    totalJobsCount={totalJobsCount}
                    onClose={() => setIsFilterOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
            
            <AddJobModal onAddJob={onAddJob} />
          </div>
        </div>

       
      </div>
    </div>
  );
}
