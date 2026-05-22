import { Card, CardContent, CardActions, CardMedia, Typography, Button } from '@mui/material';
import type { Book } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';

interface BookCardProps {
  book: Book;
  authorName: string;
}

export default function BookCard({ book, authorName }: BookCardProps) {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const { removeBook } = useLibrary();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: 2, boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="180"
        image={book.imageUrl}
        alt={book.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: '600', lineHeight: 1.3 }}>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
          By: {authorName}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block' }} color="text.disabled">
          Published: {book.publishedYear}
        </Typography>
      </CardContent>

      <CardActions sx={{ borderTop: '1px solid #f0f0f0', px: 2, py: 1 }}>
        {isLoggedIn && (
          <>
            <Button size="small" color="primary" onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</Button>
            <Button size="small" color="error" sx={{ ml: 'auto' }} onClick={() => removeBook(book.id)}>
              Delete
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}