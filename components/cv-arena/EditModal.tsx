'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CV } from '@/types';
import {
    Edit,
    Plus,
    Save,
    X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedCV: CV) => void;
  cv: CV | null;
}

export default function EditModal({ isOpen, onClose, onSave, cv }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tags: [] as string[],
    isActive: false,
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (cv) {
      setFormData({
        name: cv.name,
        description: cv.description || '',
        tags: [...cv.tags],
        isActive: cv.isActive,
      });
    }
  }, [cv]);

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cv || !formData.name.trim()) {
      return;
    }

    const updatedCV: CV = {
      ...cv,
      name: formData.name.trim(),
      description: formData.description.trim() || undefined,
      tags: formData.tags,
      isActive: formData.isActive,
      lastModified: new Date().toISOString(),
    };

    onSave(updatedCV);
    onClose();
  };

  const handleReset = () => {
    if (cv) {
      setFormData({
        name: cv.name,
        description: cv.description || '',
        tags: [...cv.tags],
        isActive: cv.isActive,
      });
    }
    setTagInput('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!cv) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5 text-indigo-500" />
            Edit CV Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Info (Read-only) */}
          <div className="bg-slate-50 rounded-lg p-3 border">
            <p className="text-sm text-slate-600 mb-1">File:</p>
            <p className="font-medium text-slate-900">{cv.fileName}</p>
            <p className="text-xs text-slate-500 mt-1">
              Version {cv.version} • {(cv.fileSize / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          {/* CV Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-cv-name">CV Name *</Label>
            <Input
              id="edit-cv-name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Senior Developer CV, Marketing Specialist Resume"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-cv-description">Description</Label>
            <Textarea
              id="edit-cv-description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of this CV version..."
              rows={2}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add tag..."
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleAddTag}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0 text-xs"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Set as Active */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="edit-is-active"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="rounded border-slate-300"
            />
            <Label htmlFor="edit-is-active" className="text-sm">
              Set as active CV
            </Label>
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!formData.name.trim()}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}