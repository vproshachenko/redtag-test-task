import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface AuthorFormProps {
  onSubmit: (authorData: string) => Promise<void>;
  onCancel: () => void;
}

export default function AuthorForm({ onSubmit, onCancel }: AuthorFormProps) {
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await onSubmit(name.trim());
    } catch (err) {
      console.error("Form submission failure:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        label="Author Name"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
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
          Submit
        </Button>
      </Box>
    </Box>
  );
}