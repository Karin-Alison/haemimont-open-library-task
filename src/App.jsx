import { useState, useEffect } from 'react';
import BookSearchForm from './components/BookSearchForm';
import BookList from './components/BookList';

export default function App() {
  let [query, setQuery] = useState('the hobbit');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (query.trim() === '') {
    setQuery('the hobbit');
  }

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://openlibrary.org/search.json?title=${query ? query : 'the hobbit'}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setBooks(data.docs.slice(0, 5)); 
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="card-container">
      <h1>Open Library Search</h1>
      <BookSearchForm onSearch={setQuery} />
      
      {loading && <p className="status-text">Loading...</p>}
      {error && <p className="status-text">Error: {error}</p>}
      {!loading && !error && <BookList books={books} />}
    </div>
  );
}