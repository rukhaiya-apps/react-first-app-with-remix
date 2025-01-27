// movieListPage.tsx

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import MovieListPage from '../components/MovieListPage'; // Adjust the path as needed

export let loader: LoaderFunction = async ({ request }) => {
  const queryParams = new URL(request.url).searchParams;
  const query = queryParams.get('query');
  const sortBy = queryParams.get('sortBy');
  const offset = queryParams.get('offset');
  const genre = queryParams.get('genre');

  try {
    const queryParamsForAPI = {
      search: query,
      searchBy: query ? 'title' : 'genres',
      offset: offset,
      limit: 10,
      sortBy: sortBy,
      sortOrder: 'desc',
      filter: query ? null : (genre === 'All' ? null : genre),
    };

    const response = await axios.get('http://localhost:4000/movies', { params: queryParamsForAPI });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      movies: [],
      totalAmount: 0,
    };
  }
};




export default function MovieListPageLoader() {
  //console.log('test');
  return <MovieListPage />; // Render the MovieListPage component
}