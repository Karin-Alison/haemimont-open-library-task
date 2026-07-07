import { useState, useEffect } from 'react';
import BookSearchForm from './components/BookSearchForm';
import BookList from './components/BookList';

export default function App() {
  const [query, setQuery] = useState('the hobbit');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://openlibrary.org/search.json?title=${query}`)
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
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Book Finder</h1>
      <BookSearchForm onSearch={setQuery} />
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && <BookList books={books} />}
    </div>
  );
}