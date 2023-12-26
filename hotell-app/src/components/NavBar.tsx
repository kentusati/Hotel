import React from 'react';
import { Link } from 'react-router-dom';
import { Typography ,AppBar, IconButton, Toolbar, Stack, Button } from '@mui/material';
import {Home} from '@mui/icons-material';

const NavBar: React.FC = () => {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Link to='/home'>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <Home htmlColor='#ffffff'/>
        </IconButton>
        </Link>
        <Typography variant='h6' component='div' sx={{ flexGrow : 1 }}>
          HOTEL
        </Typography>
        <Stack direction='row' spacing={2}>
          <Link to='/booking'>
            <Button color='inherit'>
            Booking
            </Button>
          </Link>
        {/*<Link to='/menuservice'>
          <Button color='inherit'> MenuService </Button>
        </Link>*/}
        <Link to='/profile'>
          <Button color='inherit'> Profile </Button>
        </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;