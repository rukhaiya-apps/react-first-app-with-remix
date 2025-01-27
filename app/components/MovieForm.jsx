import React from 'react';
import styles from './MovieForm.module.css'; // Import the CSS module

function MovieForm({ initialMovie, onSubmit }) {

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    defaultValues: initialMovie,
  });

  const handleFormSubmit = (data) => {
    const newData = { ...data, runtime: parseFloat(data.runtime) };
    // Check if 'genres' is an empty array, and exclude it from the newData if empty
    if (Array.isArray(data.genres) && data.genres.length === 0) {
      const { genres, ...formDataWithoutGenres } = newData;
      onSubmit(formDataWithoutGenres);
    } else {
      onSubmit(newData);
    }
  };

  useEffect(() => {
    if (initialMovie) {
      Object.keys(initialMovie).forEach((key) => {
        setValue(key, initialMovie[key]);
      });
    }
  }, [initialMovie, setValue]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>
        <div className={styles.col}>
          <label className={styles.label}>Release Year:</label>
          <input
            type="text"
            {...register('release_date', {
              required: 'Release date is required',
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: 'Please enter a valid release date in YYYY-MM-DD format',
              },
            })}
          />
          {errors.release_date && <span>{errors.release_date.message}</span>}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label}>Tagline:</label>
          <input
            type="text"
            {...register('tagline', { required: 'Tagline is required' })}
          />
          {errors.tagline && <span>{errors.tagline.message}</span>}
        </div>
        <div className={styles.col}>
          <label className={styles.label}>Duration:</label>
          <input
            type="number"
            {...register('runtime', {
              required: 'Duration is required',
              pattern: {
                value: /^(\d+\.?\d*|\.\d+)$/,
                message: 'Please enter a valid duration',
              },
            })}
          />
          {errors.runtime && <span>{errors.runtime.message}</span>}
        </div>
      </div>
      <div className={styles.row}>
      <div className={styles.col}>
          <label className={styles.label}>Movie URL:</label>
          <input
            type="text"
            {...register('poster_path', {
              required: 'Movie URL is required',
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Please enter a valid URL',
              },
            })}
          />
          {errors.poster_path && <span>{errors.poster_path.message}</span>}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label}>Genres:</label>
          <select
            multiple
            {...register('genres')}
          >
            <option value="Documentary">Documentary</option>
            <option value="Crime">Crime</option>
            <option value="Action">Action</option>
            <option value="Horror">Horror</option>
            <option value="Comedy">Comedy</option>
          </select>
          {errors.genres && <span>{errors.genres.message}</span>}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <label className={styles.label}>Description:</label>
          <textarea
            {...register('overview', {
              required: 'Description is required',
            })}
          />
          {errors.overview && <span>{errors.overview.message}</span>}
        </div>
      </div>
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
}

export default MovieForm;