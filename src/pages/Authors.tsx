import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';

import AuthorList from '../components/AuthorList';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../context/AuthContext';

export default function Authors() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn } = useAuth()


  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          color="inherit"
          sx={{ textTransform: 'none' }}
        >
          Back to Books
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Authors
        </Typography>

        <Box sx={{ minWidth: 115, display: 'flex', justifyContent: 'flex-end' }}>
          {isLoggedIn ? (
            <Button
              variant="text"
              color="primary"
              startIcon={<Add />}
              onClick={() => navigate('/add-author')}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Add Author
            </Button>
          ) : (
            <Box sx={{ width: 115 }} />
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search authors by name..."
        />
      </Box>
      <AuthorList
        searchQuery={searchQuery}
      />
    </Container>
  );
}