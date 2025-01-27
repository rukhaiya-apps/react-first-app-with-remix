import React from 'react';
import Dialog from './Dialog';
import MovieForm from './MovieForm';

function EditMovieDialog({ title, onClose, initialMovie, handleMovieEditFormSubmit, closeEditDialog }) {
  return (
    <Dialog title={title} onClose={closeEditDialog}>
      <MovieForm
        initialMovie={initialMovie}
        onSubmit={(data) => {
          handleMovieEditFormSubmit(data);
          closeEditDialog();
        }}
      />
    </Dialog>
  );
}

export default EditMovieDialog;