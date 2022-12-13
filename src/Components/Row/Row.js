import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "../../axios";
import { default as axiosPost } from "axios";

import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useGlobalState } from "../../GlobalStateProvider";

export const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";
export default function Row({ title, fetchURL, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [TrailerURL, setTrailerURL] = useState(null);
  const [TrailerMovie, setTrailerMovie] = useState({});
  const [{ user }] = useGlobalState();
  // create states to hold the entire movie playing as trailer
  // later used to redirect to the single detailed page of that movie
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      // console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);
  var showTrailer = (movie, e) => {
    if (TrailerURL) {
      setTrailerURL(null);
    } else {
      // console.log(movie)
      movieTrailer(movie?.title || movie?.name || movie?.original_title)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v"));
          setTrailerMovie(movie);
        })
        .catch((err) => {
          console.log("there is error in showing the trailer");
        });
    }
  };
  // console.log(TrailerMovie);
  const handleAddtoToList = (event) => {
    event.preventDefault();
    async function addMovie() {
      const response = await axiosPost.post(
        "http://localhost:7000/addtolist",
        // method: "post",
        // body: JSON.stringify({
        //   user_id: user.acc_id,
        //   language: TrailerMovie.original_language,
        //   original_title: TrailerMovie.original_title,
        //   overview: TrailerMovie.overview,
        //   poster_path: TrailerMovie.poster_path,
        //   release_date: TrailerMovie.release_date,
        //   title: TrailerMovie.title,
        // }),
        {
          user_id: user?.acc_id,
          language: TrailerMovie?.original_language,
          original_title: TrailerMovie?.original_title,
          overview: TrailerMovie?.overview,
          poster_path: TrailerMovie?.poster_path,
          release_date: TrailerMovie?.release_date,
          title: TrailerMovie?.title,
        }
      );
    }
    addMovie();
  };
  // console.log(movies);
  return (
    <div className="Row">
      <h1> {title}</h1>
      <div className="Row__posters">
        {movies.map((movie) => {
          // console.log();
          return (
            <>
              <img
                onClick={() => {
                  showTrailer(movie);
                }}
                className={`Row__poster ${isLarge && "Row__posterLarge"}`}
                src={`${imgBaseUrl}${
                  isLarge
                    ? movie.poster_path
                    : movie.backdrop_path || movie.poster_path
                }`}
                alt={movie.title}
              ></img>
              {/* {!isLarge && (
                <p className="backdrops_title">
                  {movie?.title || movie?.name || movie?.original_title}
                </p>
              )} */}
            </>
          );
        })}
      </div>

      <form
        // method="post"
        onSubmit={handleAddtoToList}
        className="Trailer__show"
      >
        {TrailerURL && (
          <>
            <h2
              style={{
                background: "rgba(255,0,0,0.7)",
                padding: "0.75rem",
                margin: "0.5rem 0",
              }}
            >
              {TrailerMovie?.title ||
                TrailerMovie?.name ||
                TrailerMovie?.original_title}
            </h2>
            <YouTube
              videoId={TrailerURL}
              opts={{
                height: "390",
                width: "100%",
                margin: "auto",
                playerVars: { autoplay: 1 },
              }}
            ></YouTube>
            <div className="buttons">
              <button
                className="Row__button RowTrailerCloser"
                onClick={() => {
                  setTrailerURL(null);
                }}
              >
                Close
              </button>
              <button
                type="submit"
                className="Row__button AddToList"
                // onClick={() => {
                //   // write the function that add the movie name my database
                //   // hint i have used TrailerName state to get playing movie name
                // }}
              >
                Add
              </button>
              {/* tobe changed to link that directs to the detail of the movie */}
              {/* <button type="">Change me to link</button> */}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
