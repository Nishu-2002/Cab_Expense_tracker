import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #e2e8f0', bgcolor: 'white' }}>
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <Box 
            sx={{ 
              p: 1, 
              borderRadius: 1.5, 
              bgcolor: 'primary.main', 
              color: 'white',
              display: 'flex',
              mr: 2
            }}
          >
            <AssuredWorkloadIcon />
          </Box>
          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
            Gundal Business
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button 
            component={Link} 
            to="/" 
            variant={location.pathname === '/' ? 'contained' : 'text'}
            color="primary"
          >
            Office Expenses
          </Button>
          <Button 
            component={Link} 
            to="/coffee" 
            variant={location.pathname === '/coffee' ? 'contained' : 'text'}
            color="secondary"
            startIcon={<LocalCafeIcon />}
          >
            Coffee & Snacks
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
