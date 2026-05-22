import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const isSuccess = await handleLogin(email, password);

      if (isSuccess) {
        navigate('/')
      } else {
        setError('Invalid email or password. Admin access only.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Sign In
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Access management tools
        </Typography>

        {error && (
          <Alert severity="error" variant="outlined" sx={{ mb: 2, textAlign: 'left' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disableElevation
            sx={{ mt: 3, mb: 1, py: 1.2 }}
          >
            Submit
          </Button>

          <Button
            fullWidth
            variant="text"
            color="inherit"
            onClick={() => navigate('/')}
            size="small"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Container>
  );
}