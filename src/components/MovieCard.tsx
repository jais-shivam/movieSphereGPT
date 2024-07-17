import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }:{posterPath:string}) => {
  if (!posterPath) return null;
  return (
    <div className="w-48 md:w-32 pr-4 rounded-md">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} className="rounded-lg" />
    </div>
  );
};
export default MovieCard;