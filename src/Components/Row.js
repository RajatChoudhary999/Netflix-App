import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube';
import axios from '../axios';
import "./Row.css";
// import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row(props) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
    async function fetchData() {
        const request = await axios.get(props.fetchUrl);
        setMovies(request.data.results);
        return request;
    }
    fetchData();
    }, [props.fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
        autoplay: 1,
        },
    };

    // const handleClick = (movie) => {
    //     if (trailerUrl) {
    //         setTrailerUrl('');
    //     } else {
    //         movieTrailer(movie?.name || "")
    //         .then(url => {
    //             const urlParams = new URLSearchParams(new URL(url).search);
    //             setTrailerUrl(urlParams.get("v"));
    //         }).catch((error) => console.log(error))
    //     }
    // }

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            let trailerurl = await axios.get(
            `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
            );
            setTrailerUrl(trailerurl.data.results[0]?.key);
        }
    };

    return (
        <div className = "row">
            <h2>{props.title}</h2>
                <div className = "row__posters">
                    {movies.map(movie => (
                        <img 
                        key = {movie.id}
                        onClick ={() => handleClick(movie)}
                        className = {`row__poster ${props.isLargeRow && "row__posterLarge"}`}
                        src = {`${base_url}${props.isLargeRow ? movie.poster_path :movie.backdrop_path}`} alt={movie.name}/>
                    ))}
                </div>
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;


