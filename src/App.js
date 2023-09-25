import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { AiOutlineLinkedin, AiFillGithub } from "react-icons/ai";
import "react-circular-progressbar/dist/styles.css";

function MovieDetails() {
  const [movieData, setMovieData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
  const [year, setYear] = useState("");
  const [plot, setPlot] = useState("");

  const apiKey = "e05d637b";

  useEffect(() => {
    const apiUrl = `https://www.omdbapi.com/?t=${searchTerm}&y=${year}&plot=${plot}&type=${searchType}&apikey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setMovieData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchTerm, searchType, year, plot]);

  if (!movieData) {
    return (
      <motion.div
        animate={{
          scale: [1, 2, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 0,
        }}
        id={"loading"}
      >
        Loading...
      </motion.div>
    );
  }
  const handleSearch = (term, year, plot, type) => {
    setSearchTerm(term);
    setSearchType(type);
    setYear(year);
    setPlot(plot);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSearchType("");
    setYear("");
    setPlot("");
  };

  const {
    Actors,
    Awards,
    BoxOffice,
    Country,
    DVD,
    Director,
    Genre,
    Language,
    Metascore,
    Plot,
    Poster,
    Production,
    Rated,
    Released,
    Runtime,
    Title,
    Type,
    Writer,
    imdbID,
    imdbRating,
    imdbVotes,
    Year,
  } = movieData;

  return (
    <div id="page_container">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        id={"searchbar_container"}
      >
        {!movieData.Title && (
          <>
            <h1>Media Finder</h1>
            <h4>Powered by OmdbAPI!</h4>
          </>
        )}
        <SearchBar onSearch={handleSearch} onClear={handleClear} />
      </motion.div>
      {movieData.Title ? (
        <motion.div
          id="movieData_container"
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={Poster} alt={Title} />
          <h1>
            {Title} ({Year})
          </h1>

          <p style={{ textAlign: "center" }}>{Plot}</p>
          <div>
            <p>
              <span>Actors:</span> {Actors}
            </p>
            <p>
              <span>Country:</span> {Country}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <div>
              <p>
                <span>Director:</span> {Director}
              </p>
              <p>
                <span>Writer:</span> {Writer}
              </p>
              <p>
                <span>Awards:</span> {Awards}
              </p>
              <p>
                <span>Genre:</span> {Genre}
              </p>
              <p>
                <span>Box Office:</span> {BoxOffice}
              </p>
              <p>
                <span>Runtime:</span> {Runtime}
              </p>
              <p>
                <span>Type:</span> {Type}
              </p>
              <p>
                <span>IMDb ID:</span> {imdbID}
              </p>
            </div>
            <div>
              <p>
                <span>Metascore:</span> {Metascore}
              </p>
              <p>
                <span>Production:</span> {Production}
              </p>
              <p>
                <span>Rated:</span> {Rated}
              </p>
              <p>
                <span>Released:</span> {Released}
              </p>
              <p>
                <span>DVD Release:</span> {DVD}
              </p>
              <p>
                <span>IMDb Rating:</span> {imdbRating}
              </p>
              <p>
                <span>IMDb Votes:</span> {imdbVotes}
              </p>
            </div>
          </div>

          <p>
            <span>Language:</span> {Language}
          </p>
        </motion.div>
      ) : (
        <div>
          <p>
            {movieData.Error &&
            searchTerm &&
            movieData.Error !== "Incorrect IMDb ID." ? (
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 5,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                  repeatDelay: 0,
                }}
                id="error_code"
              >
                {movieData.Error}
              </motion.div>
            ) : null}
          </p>
        </div>
      )}
      <div className="socials">
        <a
          href={"https://www.linkedin.com/in/johnny-sierra/"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineLinkedin />
        </a>
        <a
          href={"https://github.com/J-Sierra/movie-search"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub />
        </a>
        <div className="afterBar" />
      </div>
      <div className="website">
        <div id="website_link" style={{ cursor: "pointer" }}>
          <a href={"https://www.johnnysierra.com"}>www.JohnnySierra.com</a>
        </div>
        <div className="afterBar" />
      </div>
    </div>
  );
}

export default MovieDetails;
