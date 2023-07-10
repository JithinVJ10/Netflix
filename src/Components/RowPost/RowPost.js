import React, { useEffect, useState } from 'react'
import Youtude from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import { API_key,imageUrl } from '../../constants/constants'

const RowPost = (props) => {

  const [movie,setMovie] = useState([])
  const [trailer,setTrailer] = useState('')
  const [ShowVideoPlayer, setShowVideoPlayer] = useState(true)


  useEffect(()=>{
    axios.get(props.url).then(response =>{
      console.log(response.data);
      setMovie(response.data.results)
    },[])
  })

  const opts = {
    height: '450',
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
    <div className='row'>
        <h2> {props.title} </h2>
        <div className='posters'>
            {movie.map((obj)=> {
                return(
                    <div key={obj.id} >
                        <img onClick={()=>{handleMovie(obj.id)}}  className={props.isSmall ? "smallPoster" : "poster" } alt='' src={`${imageUrl+obj.backdrop_path}`}/>
                        <div className='image-text'>{obj.title || obj.original_name}</div>
                    </div>
                )
            })}
        </div>
        <div>
        {trailer && ShowVideoPlayer && (
            <div>
                <Youtude videoId={trailer.key} opts={opts} />
                <button className='close-button' onClick={handleCloseVideo}> Close Video</button>
            </div>
        )}  
        </div>
    </div>
  )
}

export default RowPost
