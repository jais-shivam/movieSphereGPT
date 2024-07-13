import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }:{posterPath:string}) => {
  if (!posterPath) return null;
  return (
    <div className="w-48 md:w-32 pr-4">
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;