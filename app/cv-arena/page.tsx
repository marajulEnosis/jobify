'use client';

import CVArenaHeader from '@/components/cv-arena/CVArenaHeader';
import CVGrid from '@/components/cv-arena/CVGrid';
import EditModal from '@/components/cv-arena/EditModal';
import UploadModal from '@/components/cv-arena/UploadModal';
import { cvStorage } from '@/lib/localStorage';
import { CV } from '@/types';
import { useEffect, useState } from 'react';

export default function CVArenaPage() {
  const [cvs, setCVs] = useState<CV[]>([]);
  const [filteredCVs, setFilteredCVs] = useState<CV[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCV, setSelectedCV] = useState<CV | null>(null);

  // Load CVs from localStorage on component mount
  useEffect(() => {
    const loadedCVs = cvStorage.load();
    setCVs(loadedCVs);
    setFilteredCVs(loadedCVs);
  }, []);

  // Filter CVs based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCVs(cvs);
    } else {
      const filtered = cvs.filter(cv => {
        const searchLower = searchTerm.toLowerCase();
        return (
          cv.name.toLowerCase().includes(searchLower) ||
          cv.fileName.toLowerCase().includes(searchLower) ||
          cv.description?.toLowerCase().includes(searchLower) ||
          cv.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      });
      setFilteredCVs(filtered);
    }
  }, [cvs, searchTerm]);

  const handleUpload = (cvData: Omit<CV, 'id' | 'uploadDate' | 'lastModified' | 'version'>) => {
    // If setting as active, deactivate all others first
    let updatedCVs = cvs;
    if (cvData.isActive) {
      updatedCVs = cvs.map(cv => ({ ...cv, isActive: false }));
    }

    const newCV: CV = {
      ...cvData,
      id: crypto.randomUUID(),
      uploadDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: 1,
    };

    const finalCVs = cvStorage.add(newCV);
    setCVs(finalCVs);
    setIsUploadModalOpen(false);
  };

  const handleEdit = (cv: CV) => {
    setSelectedCV(cv);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedCV: CV) => {
    // If setting as active, deactivate all others first
    if (updatedCV.isActive) {
      const deactivatedCVs = cvs.map(cv => 
        cv.id === updatedCV.id ? updatedCV : { ...cv, isActive: false }
      );
      cvStorage.save(deactivatedCVs);
      setCVs(deactivatedCVs);
    } else {
      const updatedCVs = cvStorage.update(updatedCV);
      setCVs(updatedCVs);
    }
    
    setIsEditModalOpen(false);
    setSelectedCV(null);
  };

  const handleDelete = async (cvId: string) => {
    if (window.confirm('Are you sure you want to delete this CV? This action cannot be undone.')) {
      try {
        // Find the CV to get the server filename
        const cvToDelete = cvs.find(cv => cv.id === cvId);
        
        if (cvToDelete?.serverFilename) {
          // Delete from server
          const response = await fetch(`http://localhost:5000/api/files/${cvToDelete.serverFilename}`, {
            method: 'DELETE',
          });
          
          const result = await response.json();
          if (!result.success) {
            console.warn('Failed to delete file from server:', result.error);
            // Continue with localStorage deletion even if server deletion fails
          }
        }
        
        // Delete from localStorage
        const updatedCVs = cvStorage.delete(cvId);
        setCVs(updatedCVs);
        
      } catch (error) {
        console.error('Error deleting CV:', error);
        alert('Error deleting CV. The file might still exist on the server.');
        
        // Still delete from localStorage even if server deletion fails
        const updatedCVs = cvStorage.delete(cvId);
        setCVs(updatedCVs);
      }
    }
  };

  const handleSetActive = (cvId: string) => {
    const updatedCVs = cvStorage.setActive(cvId);
    setCVs(updatedCVs);
  };

  const handleDownload = async (cv: CV) => {
    try {
      if (cv.serverFilename) {
        // Download from server
        const response = await fetch(`http://localhost:5000/api/download/${cv.serverFilename}`);
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = cv.fileName;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } else {
          throw new Error('Failed to download file from server');
        }
      } else if (cv.fileContent) {
        // Fallback: use stored base64 content for older entries
        const link = document.createElement('a');
        link.href = cv.fileContent;
        link.download = cv.fileName;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Show file path information
        alert(`File path: ${cv.filePath}\nPlease check if the file exists at this location.`);
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. The file might no longer be available.');
    }
  };

  const handleOpenInNewTab = (cv: CV) => {
    try {
      if (cv.serverFilename) {
        // Open from server
        const fileUrl = `http://localhost:5000/api/files/${cv.serverFilename}`;
        window.open(fileUrl, '_blank', 'noopener,noreferrer');
      } else if (cv.fileContent) {
        // Fallback: use stored base64 content for older entries
        const newWindow = window.open('', '_blank', 'noopener,noreferrer');
        if (newWindow) {
          newWindow.location.href = cv.fileContent;
        }
      } else {
        // Show file path information
        alert(`File path: ${cv.filePath}\nPlease check if the file exists at this location.`);
      }
    } catch (error) {
      console.error('Failed to open file in new tab:', error);
      alert('Failed to open file. The file might no longer be available.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <CVArenaHeader
          cvs={cvs}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onUploadClick={() => setIsUploadModalOpen(true)}
        />

        <CVGrid
          cvs={filteredCVs}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSetActive={handleSetActive}
          onDownload={handleDownload}
          onOpenInNewTab={handleOpenInNewTab}
        />

        <UploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
        />

        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedCV(null);
          }}
          onSave={handleSaveEdit}
          cv={selectedCV}
        />
      </div>
    </div>
  );
}