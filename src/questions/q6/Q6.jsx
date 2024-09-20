import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';

const UNSPLASH_ACCESS_KEY = 'ugKlMoAHcw4V3I_DxHTF8acP_dKZNmzTRyLxHieb2a8';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch images from Unsplash API
  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=${UNSPLASH_ACCESS_KEY}&page=${page}&per_page=12`
      );
      
      if (!response.ok) {
        throw new Error('Error fetching data from Unsplash');
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Expected data to be an array');
      }

      setImages((prevImages) => [...prevImages, ...data]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Handle infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <h1>Infinite Scroll</h1>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.urls.small} alt={image.alt_description} />
          </div>
        ))}
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
