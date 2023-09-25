import React, { useState } from "react";
import { motion } from "framer-motion";

function SearchBar({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState("");
  const [plotType, setPlotType] = useState("short"); // Added searchType state
  const [searchType, setSearchType] = useState("movie");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const handlePlotTypeChange = (e) => {
    setPlotType(e.target.value);
  };
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm, year, plotType, searchType);
  };
  const handleClear = () => {
    onClear();
  };

  const style = {
    div: { textAlign: "center", paddingTop: "8px" },
    input: {
      width: "60vw",
      padding: "10px",
      fontSize: "16px",
      border: "2px solid #ccc",
      borderRadius: "4px",
      marginRight: "10px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#ffd500",
      color: "black",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    label: {
      color: "white",
      fontSize: "large",
    },
    select: {
      width: "6em",
      padding: "10px",
      fontSize: "16px",
      border: "2px solid #ccc",
      borderRadius: "4px",
      margin: "5px",
    },
    yearInput: {
      width: "3em",
      padding: "10px",
      fontSize: "16px",
      border: "2px solid #ccc",
      borderRadius: "4px",
      marginRight: "10px",
      marginTop: "5px",
    },
  };
  return (
    <div style={style.div}>
      <div>
        <input
          style={style.input}
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleInputChange}
        />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, backgroundColor: "#ffffff", color: "white" }}
          style={style.button}
          onClick={handleSearch}
        >
          Search
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, backgroundColor: "#ffffff", color: "white" }}
          onClick={handleClear}
          style={{
            ...style.button,
            backgroundColor: "#d9d9d9",
            marginLeft: ".5em",
          }}
        >
          Clear
        </motion.button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <label style={style.label}>{"Year: "}</label>

          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={handleYearChange}
            style={style.yearInput}
          />
        </div>
        <div>
          <label style={style.label}>{"Type: "}</label>
          <select
            style={{ ...style.select, width: "7em" }}
            value={searchType}
            onChange={handleSearchTypeChange}
          >
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episodes</option>
          </select>
        </div>
        <div>
          <label style={style.label}>{"Plot: "}</label>
          <select
            style={style.select}
            value={plotType}
            onChange={handlePlotTypeChange}
          >
            <option value="short">Short</option>
            <option value="full">Full</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
