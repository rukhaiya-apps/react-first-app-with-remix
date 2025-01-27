// MoviesList.js
import React from "react";
import MovieCard from "./MovieCard";
import "./movie.css";

function MoviesList({ movies, onMovieSelect, handleMovieEditFormSubmit }) {
  const renderingArray = movies.map((input) => {
    const idCount = input.id;
    return (
      <article key={input.id} id={idCount} className="moviecard">
        <MovieCard
          id={input.id}
          pictureURL={input.poster_path}
          tagline={input.tagline}
          name={input.title}
          year={input.release_date}
          genres={input.genres}
          overview={input.overview}
          runtime={input.runtime}
          film={input}
          onSelect={() => onMovieSelect(input)}
          handleMovieEditFormSubmit={handleMovieEditFormSubmit}
        />
      </article>
    );
  });

  return <section className="movieslist">{renderingArray}</section>;
}

export default MoviesList;
