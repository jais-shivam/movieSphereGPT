import { selectNowPlayingMovies, selectPopularMovies } from '../utils/moviesSlice';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector(selectNowPlayingMovies);
  const popularMovies = useSelector(selectPopularMovies);
  console.log(movies);
  
  return (
    movies && (
      <div className="bg-black">
        <div className=" mt-0 md:-mt-40 pl-4 md:pl-12 relative z-20">
          <MovieList title={"Now Playing"} movies={movies} />
          <MovieList title={"Popular"} movies={popularMovies} />
          {/* <MovieList title={"Popular"} movies={movies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies}
          />
          <MovieList title={"Horror"} movies={movies} /> */}
        </div>
      </div>
    )
  );
}

export default SecondaryContainer
