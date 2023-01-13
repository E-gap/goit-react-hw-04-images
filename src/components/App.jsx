import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Button from './Button/Button.jsx';
import Loader from './Loader/Loader.jsx';
import Modal from './Modal/Modal.jsx';

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState({ src: '', alt: '' });
  const [endSearch, setEndSearch] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (page) {
      query(name, page);
    }
  }, [name, page]);

  //что делать с этой ошибкой?
  //WARNING in src\components\App.jsxonfig:load:flatten Completed in 10ms
  //Line 22:6:  React Hook useEffect has a missing dependency: 'query'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

  function query(name, page) {
    try {
      fetch(
        `https://pixabay.com/api/?q=${name}&page=${page}&key=31147704-3d6790a6d451c63a87a2b7851&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(resp => resp.json())
        .then(resp => {
          if (resp.hits.length === 0) {
            setError(true);
            return;
          }
          setImages(prevState => [...prevState, ...resp.hits]);

          if (resp.totalHits <= images.length + resp.hits.length) {
            setEndSearch(true);
          }
        });
    } finally {
      setIsLoading(false);
    }
  }

  const onSubmit = name => {
    setName(name);
    setPage(1);
    setImages([]);
    setEndSearch(false);
    setError(false);
    setIsLoading(true);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  };

  const closeModal = event => {
    if (event.code === 'Escape') {
      setIsModalOpen(false);
    }
    window.removeEventListener('keydown', closeModal);
  };

  const onModal = currentImage => {
    setIsModalOpen(isModalOpen);
    setCurrentImage(currentImage);
    window.addEventListener('keydown', closeModal);
  };

  const offModal = event => {
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'block',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        textAlign: 'center',
      }}
    >
      <Searchbar onSubmit={onSubmit} />
      {error && <p>There aren't any results</p>}
      {images.length > 0 && <ImageGallery images={images} onModal={onModal} />}
      {isLoading && <Loader />}
      {images.length > 0 && !endSearch && <Button onLoadMore={onLoadMore} />}
      {isModalOpen && <Modal currentImage={currentImage} offModal={offModal} />}
    </div>
  );
};
