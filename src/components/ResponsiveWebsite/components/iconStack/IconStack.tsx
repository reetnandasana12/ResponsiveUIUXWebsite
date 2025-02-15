// import React from 'react'

import AccountBalanceIcon from '@mui/icons-material/AccountBalanceOutlined';
import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';
import { Grid2, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar/Avatar';
import Box from '@mui/material/Box/Box';
// import Stack from '@mui/material/Stack/Stack';

const icons = [{
    bgcolor: 'rgba(240,253,244,255)',
    icon: <AccountBalanceIcon sx={{ fontSize: 40, color: 'rgba(85,189,122,255)' }} />,
    number: 4000,
    text: 'Members'
}, {
    bgcolor: 'rgba(238,245,255,255)',
    icon: <InsertPhotoRoundedIcon sx={{ fontSize: 40, color: 'rgba(99,144,240,255)' }} />,
    number: 900,
    text: 'Photos'
},
{
    bgcolor: 'rgba(251,245,255,255)',
    color: 'rgba(188,129,242,255)',
    icon: <CalendarMonthOutlinedIcon sx={{ fontSize: 40, color: 'rgba(188,129,242,255)' }} />,
    number: 70,
    text: 'Events'
}, {
    bgcolor: 'rgba(254,251,232,255)',
    icon: <MilitaryTechOutlinedIcon sx={{ fontSize: 40, color: 'rgba(226,191,111,255)' }} />,
    number: 230,
    text: 'News'
}]

const IconStack = () => {
    return (
        <Box sx={{ my: 6, px: {xs:'5%' ,md:'15%'} }}>
            <Grid2 container spacing={2}>
                {icons.map((icon,index) =>
                    <Grid2 key={index} size={{ md: 6, lg: 3,sm:6, xs:6 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row',justifyContent:{xs:'flex-start', md:'center'} }}>
                            <Avatar sx={{ bgcolor: icon.bgcolor, width: {xs:50, md:70}, height:  {xs:50, md:70} }}>
                                {icon.icon}
                            </Avatar>
                            <Box sx={{ ml: 2 }}>
                                <Typography sx={{ fontWeight: 'medium' ,fontSize:{xs:20,md:30}}} >{icon.number}</Typography>
                                <Typography sx={{ fontWeight: 'medium' }}>{icon.text}</Typography>
                            </Box>
                        </Box>
                    </Grid2>
                )}

            </Grid2>

        </Box>
    )
}

export default IconStack
