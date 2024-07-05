import React from 'react'
import { useSelector } from 'react-redux'
import { selectNowPlayingMovies } from '../utils/moviesSlice'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
    const nowPlayingMovies:[] = useSelector(selectNowPlayingMovies);
    if(!nowPlayingMovies) return;
    const mainMovie = nowPlayingMovies[0];
    console.log('mainMovie',mainMovie);
    const { original_title, overview, id } = mainMovie;
    
  return (
    <div>
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBackground movieId={id}/>
    </div>
  )
}

export default MainContainer
