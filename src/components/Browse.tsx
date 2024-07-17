import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import usePopularMovies from "../hooks/usePopularMovies ";
import Header from "./Header"
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import { selectToggleGptSearchView } from "../utils/gptSlice";
import GptSearch from "./GptSearch";

const Browse = () => {
  const showSearchGpt = useSelector(selectToggleGptSearchView);
  useNowPlayingMovies();
  usePopularMovies();
  return (
    <div >
      <Header />
      {
        showSearchGpt 
        ? <GptSearch /> 
        : (<>
            <MainContainer />
            <SecondaryContainer />
          </>)
      }
    </div>
  )
}

export default Browse
