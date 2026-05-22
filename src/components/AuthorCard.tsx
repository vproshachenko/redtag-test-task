import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { type Author } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const { isLoggedIn } = useAuth()
  const { books, removeAuthor } = useLibrary();
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'medium' }}>
          {author.name}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
        {isLoggedIn && (
          <Button
            size="small"
            color="error"
            startIcon={<Delete />}
            onClick={() => removeAuthor(author.id, books)}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}