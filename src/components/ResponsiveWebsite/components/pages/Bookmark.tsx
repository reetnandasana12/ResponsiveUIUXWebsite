import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid2, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cardImage1 from '../images/cardmage1.jpg';
import cardImage2 from '../images/cardmage2.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useDataStore } from '../../store/dataStore';
import { useLoginStore } from '../../store/authStore';

type PostProp = {
  id: number,
  title: string,
  body: string,
  userId: number
};

type CardCompProps = {
  data: PostProp,
  index: number
}


function Bookmark() {
    
    const navigate = useNavigate()
      const bookmark = useDataStore((state) => state.bookmark);
      const posts = useDataStore((state) => state.posts);
      const book = posts?.filter((_,index)=>bookmark.includes(index))
  return (
    <Box>
        
        Go To home :- <Button variant='contained' color="secondary" onClick={()=>navigate('/user/')} >Click Here</Button>
      <Grid2 container spacing={2} sx={{ mt: 10 }}>
        {
          book?.map((data, index: number) => {
            return (
              <CardComp data={data} key={index} index={index} />
            )
          })
        }
      </Grid2>
    </Box>
  )
}

function CardComp({ data, index }:CardCompProps) {
    const navigate = useNavigate()
    const bookmark = useDataStore((state) => state.bookmark);
    const userType = useLoginStore((state) => state.userType);
    const removeBookmark = useDataStore((state) => state.removeBookmark);
    const [isLike, setIsLike] = useState(true)
    return (
      <Grid2 key={index} size={{ md: 6, lg: 4, sm: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 300, border: "none", boxShadow: "none" }}>
          <CardMedia
            sx={{ height: { xs: 200, md: 200 }, borderRadius: 5 }}
            image={data.id % 2 == 0 ? cardImage1 : cardImage2}
            title="green iguana"
          />
          <CardContent sx={{ px: 0, pb: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EventAvailableIcon sx={{ height: 12 }} />
              <Typography fontSize={12} >
                Friday, Sep 06 2024
              </Typography>
            </Box>
            <Typography fontWeight={"bold"} fontSize={16} sx={{ my: 1 }} component="div">
              {data.title}
            </Typography>
            <Typography fontSize={13} >
              {data.body}
            </Typography>
          </CardContent>
          <CardActions sx={{ px: 0, mt: 0, justifyContent: 'space-between' }}>
            <Button variant='contained' color="secondary" size="small" onClick={() => navigate(`/${userType}/post/${index}`)}>Read More</Button>
  
            <Button onClick={() => {
              console.log(bookmark)
              if (bookmark.includes(index)) {
                removeBookmark(index)
                setIsLike((prev) => !prev)
              }
              else {
                bookmark.push(index)
                setIsLike((prev) => !prev)
              }
              console.log(bookmark)
            }}>
              {isLike ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
  
          </CardActions>
        </Card></Grid2>
    )
  }
export default Bookmark
