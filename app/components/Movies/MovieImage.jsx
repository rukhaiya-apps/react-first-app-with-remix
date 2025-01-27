import React, { useState } from "react";
import PropTypes from "prop-types";
import placeholder from "../../images/film-poster-placeholder.png";
import "./movie.css";
import MovieDetails from "./MovieDetails";
import { useLocation, useNavigate } from "@remix-run/react";

function MovieImage({ img, filmTitle, film }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    if (!showModal) {
      document.addEventListener("keydown", handleKeyPress);
    } else {
      removePathParam();
      document.removeEventListener("keydown", handleKeyPress);
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 27) {
      setShowModal(false);
    }
  };

  const removePathParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newPath = "/";
    const newUrl = `${newPath}?${urlParams.toString()}`;
    // window.history.pushState({}, '', newUrl);
  };

  const handleMovieClick = () => {
    addPathParam();
    setShowModal(true);
  };

  const addPathParam = () => {
    const searchParams = new URLSearchParams(location.search);
    const newPath = `/${film.id}`;
    const newUrl = `${newPath}?${searchParams.toString()}`;
    // Update the URL without redirection
    // window.history.pushState({}, '', newUrl);
  };

  const handleImageError = () => {
    // Handle image loading error by setting a fallback image
    // This function will be called if the primary image fails to load
    // You can set a placeholder or a fallback image here
    navigate(placeholder); // Navigate to a fallback image URL or set a fallback state
  };

  return (
    <div>
      <img
        src={img}
        onError={handleImageError}
        onClick={handleMovieClick} // Updated onClick event
        alt={filmTitle}
        title={filmTitle}
        className="filcard-image"
      />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <MovieDetails movieInfo={film} />
          </div>
        </div>
      )}
    </div>
  );
}

MovieImage.propTypes = {
  img: PropTypes.string.isRequired,
  film: PropTypes.object.isRequired,
  filmTitle: PropTypes.string.isRequired,
};

export default MovieImage;
