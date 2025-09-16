'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { CV } from '@/types';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


if (typeof window !== 'undefined') {
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url,
    ).toString();
  } catch (e) {

    pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  }
}

interface PDFViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cv: CV | null;
}

export default function PDFViewerModal({ isOpen, onClose, cv }: PDFViewerModalProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Error loading PDF:', error);
    setError('Failed to load PDF. The file might be corrupted or not accessible.');
    setLoading(false);
  }, []);

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };


  const getPdfUrl = () => {
    if (!cv) return null;
    
    if (cv.serverFilename) {
      return `http://localhost:5000/api/files/${cv.serverFilename}`;
    } else if (cv.fileContent) {
      return cv.fileContent;
    }
    
    return null;
  };

  const resetState = () => {
    setNumPages(0);
    setPageNumber(1);
    setScale(1.0);
    setLoading(false);
    setError(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!cv) return null;

  const pdfUrl = getPdfUrl();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] sm:w-[80vw] lg:w-[60vw] h-[90vh] sm:h-[95vh] max-w-none sm:max-w-none p-0 gap-0">
        <DialogHeader className="px-3 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
          <div className="flex items-center justify-center">
            <DialogTitle className="text-base sm:text-lg font-semibold text-slate-900 truncate">
              {cv.name}
            </DialogTitle>
          </div>
          
          {/* Controls */}
          {pdfUrl && !error && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mt-3 sm:mt-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevPage}
                  disabled={pageNumber <= 1}
                  className="px-2 sm:px-3"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="text-xs sm:text-sm text-slate-600 min-w-[80px] sm:min-w-[100px] text-center px-2">
                  {numPages > 0 ? `${pageNumber} of ${numPages}` : 'Loading...'}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNextPage}
                  disabled={pageNumber >= numPages}
                  className="px-2 sm:px-3"
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomOut}
                  disabled={scale <= 0.5}
                  className="px-2 sm:px-3"
                >
                  <ZoomOut className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetZoom}
                  className="min-w-[50px] sm:min-w-[60px] text-xs sm:text-sm"
                >
                  {Math.round(scale * 100)}%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={zoomIn}
                  disabled={scale >= 3.0}
                  className="px-2 sm:px-3"
                >
                  <ZoomIn className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-slate-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">
          {!pdfUrl ? (
            <div className="text-center text-slate-500">
              <p className="text-lg mb-2">PDF not available</p>
              <p className="text-sm">The PDF file could not be found or accessed.</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p className="text-lg mb-2">Error loading PDF</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="flex items-center justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-slate-600">Loading PDF...</span>
                  </div>
                }
                className="shadow-lg"
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  className="border border-slate-200 bg-white"
                  loading={
                    <div className="flex items-center justify-center p-8 bg-white border border-slate-200">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
                      <span className="ml-3 text-slate-600">Loading page...</span>
                    </div>
                  }
                />
              </Document>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}