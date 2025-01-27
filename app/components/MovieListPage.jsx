import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; // No need for useNavigate from react-router-dom
import axios from 'axios';
import Counter from './counter';
import SearchForm from './searchform';
import '../components/Header/header.css';
import MoviesList from './Movies/MovieList';
import SortAndGenreControl from './SortAndGenreControl/SortAndGenreControl';
import Dialog from './Dialog';
import MovieForm from './MovieForm';
import { useParams, Link } from '@remix-run/react';
import MovieDetails from './Movies/MovieDetails';
import EditMovieDialog from "./EditMovieDialog";
import {useLoaderData, useNavigate  } from '@remix-run/react';

function MovieListPage() {
  const loaderData = useLoaderData();

  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentSort, setCurrentSort] = useState('releaseDate');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState(loaderData.data ? loaderData.data : []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 8;
  const [totalAmount, setTotalAmount] = useState(loaderData.data ? loaderData.data.totalAmount : 0);
  const [successMessage, setSuccessMessage] = useState('');
  const [newMovieId, setNewMovieId] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [showModal, setShowModal] = useState(loaderData.data ? false : true );
  const [movieInfo, setMovieInfo] = useState(loaderData.data ? null : loaderData);
  const { movieIdParam, movieIdForEdit } = useParams(); // Get the movieId from the URL params


  const handleMovieSelect = (movie) => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set('movieId', movie.id);
    //navigate(`?${currentSearchParams.toString()}`);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
    updatePathForAddForm();
  };

  const updatePathForAddForm = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newPath = '/new';
    const newUrl = `${newPath}?${urlParams.toString()}`;
    //window.history.pushState({}, '', newUrl);
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
    const urlParams = new URLSearchParams(window.location.search);
    const newUrl = `/?${urlParams.toString()}`;
    //alert ('newURL' + newUrl);
    navigate(newUrl);
  };

  const handleMovieAddFormSubmit = async (data) => {
    try {
      closeDialog();
      //alert(`Submitting data: ${JSON.stringify(data)}`);
      const response = await axios.post('http://localhost:4000/movies', data);
      const newMovieId = response.data.id;
      setNewMovieId(newMovieId);
      setSuccessMessage('Movie Added Successfully...');
    } catch (error) {
      setSuccessMessage('Error occured while trying to add...');
      console.error('Error adding movie:', error);
    }
  };

  const handleMovieEditFormSubmit = async (data) => {
    try {
      const response = await axios.put('http://localhost:4000/movies', data);
      const urlParams = new URLSearchParams(window.location.search);
      setSuccessMessage('Movie Edited Successfully...');
    } catch (error) {
      setSuccessMessage('Error occured while trying to edit...');
      console.error('Error adding movie:', error);
    }
  }

  const closeSuccessMessageDialog = () => {
    if (successMessage  === 'Movie Edited Successfully...') {
      setSuccessMessage('');
      // to refresh page
      window.location.reload();
    }
    if (successMessage  === 'Movie Added Successfully...' ){
      setSuccessMessage('');
      // to update path with movieId
      const urlParams = new URLSearchParams(window.location.search);
      const newUrl = `/${newMovieId}?${urlParams.toString()}`;
      navigate(newUrl);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedGenre(null);
    setOffset(0);
  };

  const handleGenreChange = (query) => {
    setSearchQuery(null);
    setSelectedGenre(query);
    setOffset(0);
  };

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  const toggleModal = () => {
    removePathParam();
    setShowModal(false);
  }

  const removePathParam = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newPath = '/';
    const newUrl = `${newPath}?${urlParams.toString()}`;
    //window.history.pushState({}, '', newUrl);
  }

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    removeMovieIdFromPath();
  };

  const removeMovieIdFromPath = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const newPath = `/`;
    const newUrl = `${newPath}?${urlParams.toString()}`;
    //window.history.pushState({}, '', newUrl);
  }

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalAmount / limit);

  return (
    <div className="div-container">
      <button className="add-movie-button" onClick={openDialog}>
        Add Movie
      </button>
      {isEditDialogOpen && (
        <> 
        <EditMovieDialog
        title="Edit Movie"
        onClose={closeEditDialog}
        initialMovie={movieInfo}
        handleMovieEditFormSubmit={handleMovieEditFormSubmit}
        closeEditDialog={closeEditDialog}
      />
      </>
      )}
      {isDialogOpen && (
        <Dialog title="ADD MOVIE" onClose={closeDialog}>
          <MovieForm onSubmit={(data) => handleMovieAddFormSubmit(data)} />
        </Dialog>
      )}
       {successMessage && (
        <Dialog title={successMessage} onClose={() => closeSuccessMessageDialog()}>
        </Dialog>
      )}
      <Counter initialValue={10} />
      <SearchForm query={searchQuery} onSearch={handleSearch} />
      <SortAndGenreControl
        genres={['All', 'Documentary', 'Comedy', 'Horror', 'Crime', 'Action']}
        selectedGenre={selectedGenre}
        onSelect={handleGenreChange}
        currentSort={currentSort}
        onSortChange={setCurrentSort}
      />
      <br />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <MovieDetails movieInfo={movieInfo} />
          </div>
        </div>
      )}
        <>
          <MoviesList
            searchQuery={searchQuery}
            selectedGenre={selectedGenre}
            currentSort={currentSort}
            onMovieSelect={handleMovieSelect}
            movies={movies}
            handleMovieEditFormSubmit={handleMovieEditFormSubmit}
          />
          <div>
            <button onClick={handlePrevPage} disabled={offset === 0}>
              Previous Page
            </button>
            <span>
              &nbsp;&nbsp;Page {currentPage} of {totalPages}&nbsp;&nbsp;
            </span>
            <button onClick={handleNextPage}>&nbsp;&nbsp;&nbsp;Next Page&nbsp;&nbsp;&nbsp;</button>
          </div>
        </>
      <br />
    </div>
  );
}

export default MovieListPage;