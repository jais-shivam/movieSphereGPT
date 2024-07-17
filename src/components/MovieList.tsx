import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }:{ title:string; movies:[] }) => {
  return (
    <div className="px-2 ">
      <h1 className="text-lg md:text-2xl py-4 font-semibold text-white">{title}</h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex">
          {movies?.map((movie: { id: number; poster_path: string; }) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MovieList;