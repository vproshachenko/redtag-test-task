import { useState } from 'react';
import { Container, Box } from '@mui/material';
import BookList from '../components/BookList';
import { exportLibraryToCsv } from '../utils/csvUtils';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { useLibrary } from '../context/LibraryContext';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { books, authors } = useLibrary();

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5', pb: 4 }}>
      <Header
        onExportCSV={() => exportLibraryToCsv(books, authors)}
      />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search books by title or author..."
        />

        <BookList
          searchQuery={searchQuery}
        />
      </Container>
    </Box>
  );
}