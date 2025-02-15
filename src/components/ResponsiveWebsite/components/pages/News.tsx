function News() {
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjQ2ODM3ZTYxNjE2NmM3YmQ5ZGEzOGE5ZmRjZDFhYiIsIm5iZiI6MTczOTUwODgzMC4wMzMsInN1YiI6IjY3YWVjYzVlYTI0YmQ4ZjcxMDFjYjVkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sn7jPkz0uU9jWn6u0q8-mNT19ZdVKS9iANq5b8_5ya0'
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));
  return (
    <div>

    </div>
  )
}

export default News
