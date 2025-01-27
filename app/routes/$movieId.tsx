// movieListPage.tsx

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import MovieListPage from '../components/MovieListPage'; // Adjust the path as needed
import axios from 'axios';

export let loader: LoaderFunction = async ({ params }) => {
    const { movieId } = params; // Fetch the movieId from the params object
  console.log('path param value '+ movieId);
    try {
      if (movieId) {
        const fetchedData = await axios.get(`http://localhost:4000/movies/${movieId}`); // Fetch data based on the movieId
        console.log('fetchedData for path param: ', fetchedData.data);
        //console.log('test in path param: ', fetchedData.data.data);
        return fetchedData.data
        //return { moviesData: fetchedData.data }; // Return the fetched data
      } else {
        const fetchedData = await axios.get('http://localhost:4000/movies'); // Fetch all movies if no movieId is provided
        console.log('fetchedData: ', fetchedData.data);
        //return { moviesData: fetchedData.data }; // Return the fetched data
        return fetchedData.data
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      //return { moviesData: [] }; // Return an empty array or handle the error accordingly
    }
  };

export default function MovieListPageLoader() {
  return <MovieListPage />; // Render the MovieListPage component
}