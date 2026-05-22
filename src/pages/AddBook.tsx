import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import BookForm from '../components/BookForm';
import { useLibrary } from '../context/LibraryContext';

export default function AddBook() {
  const navigate = useNavigate();
  const { authors, addBook } = useLibrary();



  return (
    <Container maxWidth="xs">
      <Box sx={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} color="inherit" sx={{ alignSelf: 'flex-start', mb: 2, textTransform: 'none' }}>
          Back to Catalog
        </Button>

        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Add New Book
          </Typography>

          <BookForm
            authors={authors}
            onSubmit={addBook}
            onCancel={() => navigate('/')}
            submitButtonText="Save Book"
          />
        </Paper>
      </Box>
    </Container>
  );
}