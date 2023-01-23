import React, { useEffect, useState } from 'react'
import axios from '../axios';
import './Row.css'
import Youtube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // A snippet of code which runs on a specific condition/variable
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    }

    function handleClick(movie) {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || '')
                .then((url) => {
                    // https://www.youtube.com/watch?v=XtMThy8QKqU&list=LL&index=1&t=8158s
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v')) // get the id after v
                }).catch(error => console.log(error))
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {/* several row poster */}
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name ? movie.name : movie.title}
                    />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row