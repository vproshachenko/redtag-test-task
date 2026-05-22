import { Grid, Box, Typography } from '@mui/material';
import BookCard from './BookCard';
import { useLibrary } from '../context/LibraryContext';

interface BookListProps {
  searchQuery: string;
}

export default function BookList({ searchQuery }: BookListProps) {
  const { books, authors } = useLibrary();

  const getAuthorName = (authorId: string) => {
    const author = authors.find((a) => a.id === authorId);
    return author ? author.name : 'Unknown Author';
  };

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const authorMatch = getAuthorName(book.authorId).toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || authorMatch;
  });

  if (filteredBooks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          No books found matching "{searchQuery}"
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredBooks.map((book) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={book.id}>
          <BookCard
            book={book}
            authorName={getAuthorName(book.authorId)}
          />
        </Grid>
      ))}
    </Grid>
  );
}