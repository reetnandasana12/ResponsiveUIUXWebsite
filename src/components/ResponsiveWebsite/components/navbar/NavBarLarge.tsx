// import { colors } from '@mui/material';
import Box from '@mui/material/Box/Box'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack/Stack';
import { grey } from '@mui/material/colors';
import './navbar.css'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLoginStore } from '../../store/authStore';
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import avt from './avtar.jpg'

type MyFaqProps = {
  onClick:any, 
  index:number, 
  text:string, 
  check:boolean
}

const MyFaq = ({ onClick, index, text, check }:MyFaqProps) => (
  <Button variant={check ? 'text' : 'contained'} sx={{ color: check ? grey[700]:'white' }} onClick={onClick} key={index}>{text}</Button>
);

const NavBar = () => {
  const navigate = useNavigate()
  const [selectButton, setSelectButton] = useState(0);
  const setLogin = useLoginStore((state) => state.setLogin)
  const userType = useLoginStore((state) => state.userType)
  const location = useLocation();
  const handleQuestionClick = (text: string, index: number) => {
    if(index !== selectButton){
      setSelectButton(index);
      navigate(`/${userType}/${text}`)
    }
  };

  function onRegister() {
    navigate("/auth/register")
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const data = (userType == "user") ? ['Home', 'About', 'News'] : ['Home', 'posts', 'Events', 'Members', 'Contact']

  return (<>
    <Box className="navbar" sx={{ justifyContent: 'space-between' }}>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box >
          <img style={{ height: 50 }} src="https://www.gnwebsoft.com/Default/assets/img-gnweb/GNWebsoft_Logo.png" className='logo'></img>
        </Box>
        <Box width={'35%'} sx={{ minWidth: 415, display: "flex", justifyContent: "center" }}>


          {data.map((text, index) => (
            <MyFaq
              key={index}
              index={index}
              text={text}
              check={index !== selectButton}
              onClick={() => handleQuestionClick(text, index)}
            />
          ))}

        </Box>
        <Box >

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }} src={avt}></Avatar>
            </IconButton>
          </Tooltip>

        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => {
            localStorage.clear()
            setLogin(false)
            onRegister()
          }} >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Stack>
      {/* <Outlet/> */}
    </Box>
    <Outlet />
  </>

  )
}

export default NavBar
