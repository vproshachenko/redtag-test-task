import { Grid, Typography, Box } from '@mui/material';
import AuthorCard from './AuthorCard';
import { useLibrary } from '../context/LibraryContext';

interface AuthorListProps {
  searchQuery: string;
}

export default function AuthorList({ searchQuery }: AuthorListProps) {
  const { authors } = useLibrary();

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredAuthors.length === 0) {
    return (
      <Box sx={{ textAlignment: 'center', mt: 4 }}>
        <Typography color="text.secondary">No authors match your search criteria.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {filteredAuthors.map((author) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={author.id}>
          <AuthorCard
            author={author}
          />
        </Grid>
      ))}
    </Grid>
  );
}