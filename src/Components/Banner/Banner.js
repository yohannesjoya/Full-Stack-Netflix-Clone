import React, { useState, useEffect } from "react";
import "./Banner.css";
import { imgBaseUrl } from "../Row/Row";
import axios from "../../axios";
import requests from "../../requests";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { useGlobalState } from "../../GlobalStateProvider";

// truncate paragraphs
export var truncateString = (str, num) => {
  if (str?.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

function Banner() {
  const [BannerMovie, setBannerMovie] = useState([]);
  const [BannerMovieTrailerUrl, setBannerMovieTrailerUrl] = useState(null);
  const [{ user }] = useGlobalState();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchDocumentaries);

      var singleResult =
        request?.data.results[
          Math.floor(Math.random() * request?.data?.results.length)
        ];

      setBannerMovie(singleResult);
      return request;
    }

    fetchData();
  }, []);
  var showMovieTrailer = (movie, e) => {
    if (BannerMovieTrailerUrl) {
      setBannerMovieTrailerUrl(null);
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_title)
        .then((url) => {
          var urlParsed = new URLSearchParams(new URL(url).search);
          setBannerMovieTrailerUrl(urlParsed.get("v"));
        })
        .catch((err) => {
          console.log("there is error in showing the trailer");
        });
    }
  };
  // console.log(movie)

  //   console.log(BannerMovie);

  return (
    <section
      className="banner"
      style={{
        backgroundImage: `url(${imgBaseUrl}${BannerMovie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      // onClick={() => {show}}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {BannerMovie?.title ||
            BannerMovie?.original_title ||
            BannerMovie?.name}
        </h1>
        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => {
              showMovieTrailer(BannerMovie);
            }}
          >
            Play
          </button>
          <button disabled={user ? false :true} className={`banner__button ${!user && 'disabled-btn'}`}>My List</button>
        </div>
        <h1 className="banner_description">
          {truncateString(BannerMovie?.overview, 150)}
        </h1>
      </div>

      <div className="banner_fadeBottom" />
      {BannerMovieTrailerUrl && (
        <>
          <YouTube
            className="BannerYoutubePlayer"
            videoId={BannerMovieTrailerUrl}
            opts={{
              height: "448",
              width: "100%",
              margin: "auto",
              playerVars: { autoplay: 1 },
            }}
          />
          <button
            className="BannerTrailerCloser banner__button"
            onClick={() => {
              setBannerMovieTrailerUrl(null);
            }}
          >
            Close
          </button>
        </>
      )}
    </section>
  );
}

export default Banner;
