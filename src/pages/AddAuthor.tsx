import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import AuthorForm from '../components/AuthorForm';
import { useLibrary } from '../context/LibraryContext';

export default function AddAuthor() {
  const navigate = useNavigate();
  const { addAuthor } = useLibrary();



  return (
    <Container maxWidth="xs">
      <Box sx={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/authors')}
          color="inherit"
          sx={{ alignSelf: 'flex-start', mb: 2, textTransform: 'none' }}
        >
          Back to Authors
        </Button>

        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Add New Author
          </Typography>

          <AuthorForm
            onSubmit={addAuthor}
            onCancel={() => navigate('/authors')}
          />
        </Paper>
      </Box>
    </Container>
  );
}