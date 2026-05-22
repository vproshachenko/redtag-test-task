import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { MenuBook, AccountCircle, Download, Add } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onExportCSV: () => void;
  showAdminActions?: boolean;
}

export default function Header({ onExportCSV, showAdminActions = true }: HeaderProps) {
  const navigate = useNavigate();

  const { isLoggedIn, handleLogout } = useAuth()

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }} onClick={() => navigate('/')}>
          <MenuBook />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Library Manager
        </Typography>
        {isLoggedIn && showAdminActions && (
          <Button
            color="inherit"
            variant="text"
            startIcon={<Add />}
            onClick={() => navigate('/add-book')}
            sx={{ mr: 2, textTransform: 'none' }}
          >
            Add Book
          </Button>
        )}
        <Button
          color="inherit"
          onClick={() => navigate('/authors')}
          sx={{ mr: 2, textTransform: 'none' }}
        >
          Authors List
        </Button>
        {onExportCSV && (
          <Button
            color="inherit"
            variant="text"
            startIcon={<Download />}
            onClick={onExportCSV}
            sx={{ mr: 2, textTransform: 'none' }}
          >
            Export CSV
          </Button>
        )}
        <Button
          color="inherit"
          variant="outlined"
          startIcon={<AccountCircle />}
          onClick={isLoggedIn ? handleLogout : () => navigate('/login')}
          sx={{ textTransform: 'none' }}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
}