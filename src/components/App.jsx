import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal';
import '../styles.css';

const API_KEY = '42614686-f34bed80d5088dc8495810476';
const perPage = 12;

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [loadMore, setLoadMore] = useState(false); // Dodanie stanu dla loadMore

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { hits, totalHits } = data;

        const newImages = hits.filter(newImage =>
          images.every(existingImage => existingImage.id !== newImage.id)
        );

        setImages(prevImages => [...prevImages, ...newImages]);
        setLoadMore(page < Math.ceil(totalHits / perPage)); // Ustawienie stanu loadMore
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, query]); // Usunięcie images z tablicy zależności

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (imageUrl, imageAlt) => {
    setSelectedImageUrl(imageUrl);
    setModalAlt(imageAlt);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <div>
        <Searchbar onSubmit={handleSubmit} />
        <ImageGallery images={images} onImageClick={handleImageClick} />

        {loadMore && (
          <Button onLoadMore={handleLoadMore} loading={loading} />
        )}
        {showModal && (
          <Modal
            imageUrl={selectedImageUrl}
            alt={modalAlt || 'Image'}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default App; // Zmiana na eksport domyślny
