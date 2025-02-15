import { Box, Button, Grid2, Typography } from '@mui/material'
import cardImage2 from '../images/cardmage2.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLoginStore } from '../../store/authStore';
function Posts() {
  let { id } = useParams()
  const userType = useLoginStore((state) => state.userType);
  const { data: user, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => response.json())
  })

  const navigate = useNavigate()
  const page = Number(id)

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <Box>
      Go To home :- <Button variant='contained' color="secondary" onClick={() => navigate('/user/')} >Click Here</Button>
      <Grid2 container sx={{ p: { xs: 2, md: 5 } }}>
        <Grid2 size={{ xs: 12, lg: 5 }} >
          <Box component={'img'} src={cardImage2} sx={{ width: '95%' }}></Box>
        </Grid2>
        <Grid2 container size={{ lg: 7 }} direction={'column'} sx={{
          pr: 4, justifyContent: "space-between",
          alignItems: "flex-end",
        }}>
          <Grid2>
            <Grid2  >
              <Typography sx={{ fontSize: { xs: 20, md: 30 }, fontWeight: 'bold' }}>{user?.title}</Typography>
            </Grid2>
            <Grid2 >
              <Typography sx={{ fontSize: { xs: 10, md: 20 }, mt: 3 }}>{user?.body}</Typography>
            </Grid2>
          </Grid2>
          <Grid2 sx={{ mt: 3 }}>
            <Button variant="outlined" sx={{ mr: 3 }} onClick={() => navigate(`/${userType}/post/${(page - 1).toString()}`)} disabled={page === 0}>Back</Button>
            <Button variant="contained" size="large" onClick={() => navigate(`/${userType}/post/${(page + 1).toString()}`)} disabled={page === (99)}>Next</Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Posts
