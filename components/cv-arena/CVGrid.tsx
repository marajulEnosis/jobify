'use client';

import { CV } from '@/types';
import { FileX } from 'lucide-react';
import CVCard from './CVCard';

interface CVGridProps {
  cvs: CV[];
  onEdit: (cv: CV) => void;
  onDelete: (cvId: string) => void;
  onSetActive: (cvId: string) => void;
  onDownload: (cv: CV) => void;
  onOpenInNewTab: (cv: CV) => void;
}

export default function CVGrid({ cvs, onEdit, onDelete, onSetActive, onDownload, onOpenInNewTab }: CVGridProps) {
  if (cvs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-slate-100 rounded-full p-6 mb-4">
          <FileX className="h-12 w-12 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-700 mb-2">
          No CVs uploaded yet
        </h3>
        <p className="text-slate-500 max-w-md">
          Start building your CV collection by uploading your first resume. 
          You can manage different versions for different job applications.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
      {cvs.map((cv) => (
        <CVCard
          key={cv.id}
          cv={cv}
          onEdit={onEdit}
          onDelete={onDelete}
          onSetActive={onSetActive}
          onDownload={onDownload}
          onOpenInNewTab={onOpenInNewTab}
        />
      ))}
    </div>
  );
}