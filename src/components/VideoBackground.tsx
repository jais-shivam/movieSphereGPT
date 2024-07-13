import useMovieTrailer from '../hooks/useMovieTrailer'
import { selectTrailerVideo } from '../utils/moviesSlice';
import { useSelector } from 'react-redux';

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector(selectTrailerVideo);
  useMovieTrailer(movieId);
  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" 
          +'hXzcyx9V0xw' +
          "?&amp;controls=0&autoplay=1&mute=1&loop=1&" + `playlist=hXzcyx9V0xw`
        }
        title="YouTube video player"
        frameBorder={0}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

    </div>
  )
}

export default VideoBackground
