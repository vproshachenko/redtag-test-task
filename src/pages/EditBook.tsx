import { useNavigate, useParams } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { type Book } from '../types';
import BookForm from '../components/BookForm';
import { useLibrary } from '../context/LibraryContext';

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const { editBook, authors, books } = useLibrary();
  const navigate = useNavigate()

  const book = books.find((book: Book) => book.id == id)

  const handleEditSubmit = async (formData: Omit<Book, 'id'>) => {
    if (id) {
      await editBook(id, formData);
    }
  };
  return (
    <Container maxWidth="xs">
      <Box sx={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} color="inherit" sx={{ alignSelf: 'flex-start', mb: 2, textTransform: 'none' }}>
          Back to Catalog
        </Button>

        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Edit Book
          </Typography>

          {book && (
            <BookForm
              authors={authors}
              initialData={book}
              onSubmit={handleEditSubmit}
              onCancel={() => navigate('/')}
              submitButtonText="Update Changes"
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
}