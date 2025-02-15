import { Box, Grid2, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { useEffect, useState } from 'react'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import cardImage1 from '../images/cardmage1.jpg';
import cardImage2 from '../images/cardmage2.jpg';
import lastImage2 from '../images/lastImage2.jpg';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDataStore } from '../../store/dataStore';

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

function LastComp() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate()

  const bookmark: number[] = useDataStore((state) => state.bookmark);
  const posts: PostProp[] = useDataStore((state) => state.posts);
  const setPosts = useDataStore((state) => state.setPosts);

  useEffect(() => {
    // bookmark.push(1)
    console.log(bookmark)
  }, [])

  const postQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json()),
      staleTime:1000*30
  })
  if (postQuery.isSuccess) {
    setPosts(postQuery.data)
    console.log(postQuery.data)
  }

  return (
    <Box sx={{ mx: { xs: '10%', md: '18%' }, mt: 10 }}>
      <Grid2 container>
        <Grid2 size={{ md: 6, lg: 6, sm: 12 }}>
          <Box><Typography color='secondary'>Latest News</Typography></Box>
          <Box><Typography color='primary' fontWeight={'bold'}>Read Latest News and  important updates.</Typography></Box>
        </Grid2>
        <Grid2 size={{ md: 6, lg: 6, sm: 12 }} sx={{ display: 'flex', justifyContent: 'flex-end', mt: { xs: 3, md: 0 } }}>
          <Button variant='contained' color="secondary" onClick={() => setToggle((prev) => !prev)}>View All</Button>
          <Button variant='contained' color="secondary" onClick={() => navigate('/user/bookmark')}>BookMark</Button>
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2} sx={{ mt: 10 }}>
        {
          toggle ? posts?.map((data, index: number) => {
            return (
              <CardComp key={index} data={data} index={index} />
            )
          }) : posts?.slice(1, 4).map((data, index: number) => {
            return (
              <CardComp data={data} key={index} index={index} />
            )
          })
        }
      </Grid2>

      <Box sx={{ display: "flex", direction: "row", justifyContent: "left", my: 5 }}>
        <Box>
          <Box><Typography color='secondary'>Latest News</Typography></Box>
          <Box><Typography color='primary' fontWeight={'bold'}>Read Latest News and  important updates.</Typography></Box>
        </Box>
      </Box>
      <Grid2 container spacing={2}>
        <Grid2 size={{ md: 12, lg: 6, sm: 12 }} sx={{ display: 'flex', justifyContent: 'center', minHeight: { xs: 600, md: 500 } }}>
          <Card sx={{ border: "none", boxShadow: "none", minWidth: { xs: 300, md: 400 } }}>
            <CardMedia
              sx={{ height: '100%', maxWidth: 470, width: '100%', maxHeight: 275 }}
              image={lastImage2}
              title="green iguana"
            />
            <CardContent sx={{ mx: 1, px: 0, pb: 0 }}>
              <Typography fontWeight={"bold"} fontSize={16} component="div">
                Campaining for The Right of The People
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                <EventAvailableIcon sx={{ height: 12 }} />
                <Typography fontSize={12} >
                  Friday, Sep 06 2024
                </Typography>
              </Box>
              <Typography fontSize={13} >
                Raising say express had chiefly detract demands she. Quiet led own cause three front no party young abode state saved. He do fruit woody met defective are allowance two perceived listening consulted contained. It chicken oh colonel pressed excited suppose to shortly. He improve started no we manners h owever effects.
              </Typography>
            </CardContent>
            <CardActions sx={{ mx: 1, px: 0, mt: 0 }}>
              <Button variant='contained' color="secondary" size="small" onClick={() => navigate('/user/post/1')}>Read More</Button>
            </CardActions>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 12, lg: 6, sm: 12 }} container spacing={4}>
          {['1', '2', '3', '4'].map((value, index) =>
            <Grid2 key={index} size={{ md: 12, lg: 12, sm: 12 }}>
              <Box key={value} sx={{ border: "none", boxShadow: "none", display: "flex", direction: "row", justifyContent: { xs: "flex-start", md: "center" }, }}>
                <CardMedia
                  sx={{ height: 100, width: 160, borderRadius: 5 }}
                  image={lastImage2}
                  title="green iguana"
                />
                <Box sx={{ ml: 2 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <EventAvailableIcon sx={{ height: 12 }} />
                      <Typography fontSize={12} >
                        Friday, Sep 06 2024
                      </Typography>
                    </Box>
                    <Typography fontWeight={"bold"} fontSize={16} component="div">
                      Archiver's Aword Ceremony
                    </Typography>

                  </CardContent>
                  <CardActions sx={{ px: 0, mt: 0 }}>
                    <Button variant='contained' color="secondary" size="small" onClick={() => navigate('/user/post/1')}>Read More</Button>
                  </CardActions>
                </Box>
              </Box>
            </Grid2>
          )}
        </Grid2>
      </Grid2>
    </Box>
  )
}


function CardComp({ data, index }: CardCompProps) {
  const navigate = useNavigate()
  const bookmark: number[] = useDataStore((state) => state.bookmark);
  const removeBookmark = useDataStore((state) => state.removeBookmark);
  const [isLike, setIsLike] = useState(bookmark.includes(index))


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
          <Button variant='contained' color="secondary" size="small" onClick={() => navigate(`/user/post/${index}`)}>Read More</Button>

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
export default LastComp
