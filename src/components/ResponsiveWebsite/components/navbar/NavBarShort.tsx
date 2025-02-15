import * as React from 'react';
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import './navbar.css'

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  function onLogin() {
    window.location.href = "/login"
  }
  function onRegister() {
    window.location.href = "/register"
  }

  return (
    <Box className="navbar" sx={{ justifyContent: 'space-between' }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box >
          <img style={{ height: 50 }} src="https://www.gnwebsoft.com/Default/assets/img-gnweb/GNWebsoft_Logo.png" className='logo'></img>
        </Box>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Dashboard
        </Button>
        
        <Menu
          sx={{minWidth:320, maxWidth: '100%'}}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {['About', 'News', 'Events', 'Members', 'Contact'].map((text, index) => (
            // <Button variant='text' sx={{ color: grey[700],ml:2 }} key={index}>{text}</Button>
            <MenuItem onClick={handleClose} key={index}>{text}</MenuItem>
          ))}
           {
            localStorage.getItem("name") === null ? (
              <>
                <MenuItem onClick={onLogin}>Login</MenuItem>
                <MenuItem onClick={onRegister}>Register</MenuItem>
              </>
            ) :
            <MenuItem onClick={() => {
              localStorage.clear()
              onRegister()
            }}>Logout</MenuItem>
          }

        </Menu>
      </Stack>
    </Box>
  )
}

export default NavBar
