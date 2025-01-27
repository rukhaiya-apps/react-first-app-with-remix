import React, { useState } from "react";
import PropTypes from "prop-types";
import MovieImage from "./MovieImage";
import MovieInfo from "./MovieInfo";
import "./movie.css";
import Dialog from "../Dialog";
import EditMovieDialog from "../EditMovieDialog";

function MovieCard(props) {
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleEditMenu = () => {
    setShowEditMenu((prevShowEditMenu) => !prevShowEditMenu);
  };

  const openEditDialog = (data) => {
    setIsEditDialogOpen(true);
    setShowEditMenu(false);
    setMovieData(data);
    updatePathWithMovieId(data);
  };

  const updatePathWithMovieId = (data) => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = data.id;
    const newPath = `/${movieId}/edit`;
    const newUrl = `${newPath}?${urlParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    removeMovieIdFromPath();
  };

  const removeMovieIdFromPath = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newPath = `/`;
    const newUrl = `${newPath}?${urlParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const closeEditMenu = () => {
    setShowEditMenu(false);
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
    setShowEditMenu(false);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(false);
    // Handle deletion logic
  };

  return (
    <div className="movie-card" onMouseLeave={closeEditMenu}>
      <div className="dots-overlay" onClick={toggleEditMenu}>
        <i className="fa fa-ellipsis-v"></i>
      </div>
      {showEditMenu && (
        <div className="edit-menu">
          <div
            className="edit-option"
            onClick={() => openEditDialog(props.film)}
          >
            Edit Movie
          </div>
          <div className="edit-option" onClick={openDeleteDialog}>
            Delete Movie
          </div>
        </div>
      )}
      <MovieImage
        toggleShowFilmBody={props.toggleShowFilmBody}
        img={props.pictureURL}
        filmTitle={props.name}
        film={props.film}
      />
      <MovieInfo
        description={props.tagline}
        name={props.name}
        year={props.year}
      />
      {isEditDialogOpen && (
        <>
          <EditMovieDialog
            title="Edit Movie"
            onClose={closeEditDialog}
            initialMovie={movieData}
            handleMovieEditFormSubmit={props.handleMovieEditFormSubmit}
            closeEditDialog={closeEditDialog}
          />
        </>
      )}
      {isDeleteDialogOpen && (
        <Dialog title="DELETE MOVIE" onClose={closeDeleteDialog}>
          <div>Are you sure you want to delete this movie?</div>
          <div className="delete-dialog-buttons">
            <button onClick={handleDelete}>Confirm</button>&nbsp;&nbsp;&nbsp;
            <button onClick={closeDeleteDialog}>Cancel</button>
          </div>
        </Dialog>
      )}
    </div>
  );
}

MovieCard.propTypes = {
  genres: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  pictureURL: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  film: PropTypes.object.isRequired,
};

export default MovieCard;
