import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem } from '@mui/material';
import { type Author, type Book } from '../types';

interface BookFormProps {
  authors: Author[];
  initialData?: Book;
  onSubmit: (bookData: Omit<Book, 'id'>) => Promise<void>;
  onCancel: () => void;
  submitButtonText: string;
}

export default function BookForm({ authors, initialData, onSubmit, onCancel, submitButtonText }: BookFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [authorId, setAuthorId] = useState(initialData?.authorId || '');
  const [publishedYear, setPublishedYear] = useState<number>(initialData?.publishedYear || new Date().getFullYear());
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!title || !authorId) return;

    try {
      await onSubmit({
        title,
        authorId,
        publishedYear: Number(publishedYear),
        imageUrl: imageUrl || 'https://via.placeholder.com/180x250?text=No+Cover'
      });
    } catch (err) {
      console.error("Form submission failure:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        label="Book Title"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        select
        label="Select Author"
        fullWidth
        required
        value={authorId}
        onChange={(e) => setAuthorId(e.target.value)}
      >
        {authors.map((author) => (
          <MenuItem key={author.id} value={author.id}>
            {author.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Published Year"
        type="number"
        fullWidth
        required
        value={publishedYear}
        onChange={(e) => setPublishedYear(Number(e.target.value))}
      />

      <TextField
        label="Cover Image URL (Optional)"
        fullWidth
        placeholder="https://example.com/cover.jpg"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          color="inherit"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disableElevation
        >
          {submitButtonText}
        </Button>
      </Box>
    </Box>
  );
}