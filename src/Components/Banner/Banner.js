import React,{useState, useEffect} from 'react'
import './Banner.css'
import axios from '../../axios'
import { API_key,imageUrl } from '../../constants/constants'
import Youtude from 'react-youtube'

const Banner = () => {

  const [movie,setMovie] = useState()
  const [trailer,setTrailer] = useState('')
  const [ShowVideoPlayer, setShowVideoPlayer] = useState(true)

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_key}&language=en-US`).then((response)=>{
      const movies = response.data.results;
      console.log(movies[0]);
      const randomIndex = Math.floor(Math.random() * movies.length);
      const randomMovie = movies[randomIndex]
      setMovie(randomMovie);
    })

  },[])

  const opts = {
    height: '550',
    width: '100%',
    playerVars: {
        autoplay: 1
    }
  }

  const handleMovie = (id) => {
    axios.get(`/movie/${id}/videos?api_key=${API_key}&language=en-US`).then((response)=> {
        if (response.data.results.length > 0) {
            response.data.results.forEach(result => {
              if (result.type === 'Trailer') {
                setShowVideoPlayer(true);
                setTrailer(result);
                return; 
              }
            });
          } else {
            console.log("Empty response");
            
          }
    })

  }

  const handleCloseVideo = ()=>{
    setShowVideoPlayer(false)
  }

  return (
    <div style={{backgroundImage:`url(${movie? imageUrl+movie.backdrop_path:''})`}} className='banner'>
        {trailer && ShowVideoPlayer && (
            <div className='video'>
              <Youtude videoId={trailer.key} opts={opts} />
              <button className='close-button' onClick={handleCloseVideo}> Close Video</button>
                
            </div>
        )} 
       <div className='content' >
           <h1 className='title'>{movie? movie.title || movie.original_name:''}  </h1>
           <div className='banner_buttons' >
               <button onClick={()=>{handleMovie(movie.id)}} className='button' >Play</button>
               <button className='button' >My list</button>
           </div>
           <h1 className='description'> {movie? movie.overview:''} </h1>
       </div>
   <div className="fade_bottom"></div>

   </div>
  )
}

export default Banner
