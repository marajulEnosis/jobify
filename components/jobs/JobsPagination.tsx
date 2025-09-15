import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

interface JobsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function JobsPagination({ currentPage, totalPages, onPageChange }: JobsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className={cn(
                currentPage === 1 && "pointer-events-none opacity-50",
                currentPage !== 1 && "cursor-pointer hover:scale-105 hover:bg-indigo-50 transition-all duration-200"
              )}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
                className="cursor-pointer hover:scale-105 hover:bg-indigo-50 transition-all duration-200"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              className={cn(
                currentPage === totalPages && "pointer-events-none opacity-50",
                currentPage !== totalPages && "cursor-pointer hover:scale-105 hover:bg-indigo-50 transition-all duration-200"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
