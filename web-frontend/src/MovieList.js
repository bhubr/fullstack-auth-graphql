import { gql, useQuery } from '@apollo/client';

const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      picture
      releaseYear
    }
  }
`;

function MovieList() {
  const { loading, error, data } = useQuery(GET_MOVIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="MovieList">
      {
        data.movies.map(movie => (
          <div key={movie._id}>
            <h3>{movie.title}</h3>
            <img alt={movie.title} src={movie.picture} />
          </div>
        ))
      }
    </div>
  );
}

export default MovieList;
