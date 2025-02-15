import {Grid2, Box, Typography, Button, Stack, Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import IconStack from '../iconStack/IconStack';
import firstImage from '../images/firstImage.jpg';
import secondImage from '../images/secondImage.png';
import logo1 from '../images/logo1.png';
import logo2 from '../images/logo2.png';
import logo56 from '../images/logo56.jpg';
import logo4 from '../images/logo4.png';
import LastComp from '../lastComp/LastComp';
import React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

function Main() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Grid2
        container
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'rgba(248,249,251,255)'
        }}
      >
        <Box sx={{ mt: 4 }}> <Typography variant="h4" color='primary'>Engage Your Alumni</Typography></Box>
        <Box><Typography variant="h4" color='secondary' >Like Never Before!</Typography></Box>
        <Box sx={{ width: { xs: '80%', md: '50%' }, mt: 3 }}><Typography align='center'>An Integrated alumni management solution for alumni offices and alumni associations at colleges, universities, secondary schools, and other educational programs for strengthening their alumni community, maintaining the database, enhancing engagement and managing contributions.</Typography></Box>
        <Box sx={{ mt: 3 }}>
          <Button variant='contained' color="secondary" onClick={toggleDrawer(true)}>Book Free Demo</Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Box>
        <Box> <img style={{ height: "auto", maxHeight: 400, width: '100%' }} src={firstImage} className='logo'></img></Box>
      </Grid2>

      <IconStack />

      <Grid2 container sx={{ my: 6, px: { sm: '10%', md: '20%' } }}>
        <Grid2 size={{ lg: 5, md: 12 }}><Box component={'img'} sx={{ ml: '5%', height: 'auto', width: '90%' }} src={secondImage} className='logo'></Box></Grid2>
        <Grid2 size={{ lg: 6, md: 12 }} sx={{ ml: 5 }}>
          <Box sx={{}}> <Typography fontWeight={'bold'} color='secondary'>All in one</Typography></Box>
          <Box sx={{ mr: 5 }}><Typography fontSize={20} color='primary' >360 Anumni Management Solution</Typography></Box>
          <Box sx={{ mt: 2 }}><Typography align='left'>An Integrated alumni management solution for alumni offices and alumni associations at colleges, universities, secondary schools, and other educational programs for strengthening their alumni community, maintaining the database, enhancing engagement and managing contributions.</Typography></Box>
          <Box sx={{ mt: 2 }}> <Button variant='contained' color="secondary" >Register Now!</Button></Box>
        </Grid2>
      </Grid2>
      {/* Part-5 completed */}
      <Box
        sx={{
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'rgba(248,249,251,255)'

        }}
      ><Stack
        direction="column"
        sx={{ alignItems: 'center' }}
      >
          <Box sx={{ mt: 5 }}><Typography fontWeight={'bold'}>Accreditation & Recognitions</Typography></Box>
          <Grid2 container width={{ xs: '80%', md: '60%' }} sx={{ mt: 7, mb: 5 }} spacing={{ xs: 2, md: 4 }}>
            {
              [logo1, logo2, logo56, logo4].map((value, index) => {
                return (
                  <Grid2 key={index} alignItems="center" size={{ lg: 3, md: 6, sm: 6, xs: 6 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={value}
                      sx={{ width: (value === logo2) ? 120 : 80, height: 80, ml: { xs: '10%', md: '25%' } }}
                      variant="square"
                    />
                  </Grid2>
                );
              })
            }
          </Grid2>
        </Stack>
      </Box>


      {/* Part-6  */}
      <LastComp />
    </>
  )
}

export default Main
