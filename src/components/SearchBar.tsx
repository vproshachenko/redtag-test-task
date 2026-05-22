import { Box, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <Box
      sx={{
        mb: 4,
        display: 'flex',
        backgroundColor: '#fff',
        p: 2,
        borderRadius: 2,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        width: '100%'
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <Search color="action" sx={{ mr: 1 }} />,
          },
        }}
      />
    </Box>
  );
}