import { useState, useEffect, useCallback } from 'react';
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
  const [currentImage, setCurrentImage] = useState({ src: '', alt: '' });
  const [error, setError] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const query = () => {
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
            setTotalHits(resp.totalHits);
          });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (name === '' || page === '') return;
    setIsLoading(true);
    query();
  }, [name, page]);

  const onSubmit = useCallback(name => {
    setName(name);
    setPage(1);
    setImages([]);
    setTotalHits(0);
    setError(false);
    setIsLoading(true);
  }, []);

  const onLoadMore = useCallback(() => {
    setPage(prevState => prevState + 1);
    setIsLoading(true);
  }, []);

  const resetCurrentImage = useCallback(() => {
    setCurrentImage({ src: '', alt: '' });
  }, []);

  const onModal = useCallback(currentImage => {
    setCurrentImage(currentImage);
  }, []);

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
      {images.length > 0 && images.length < totalHits && (
        <Button onLoadMore={onLoadMore} />
      )}

      {currentImage.src && (
        <Modal
          currentImage={currentImage}
          resetCurrentImage={resetCurrentImage}
        />
      )}
    </div>
  );
};
