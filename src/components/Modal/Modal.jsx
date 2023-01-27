import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const Modal = ({ currentImage, resetCurrentImage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalWindow = event => {
    if (event.code === 'Escape') {
      resetCurrentImage();
    }
    if (event.target === event.currentTarget) {
      setIsModalOpen(false);
      resetCurrentImage();
    }
  };

  useEffect(() => {
    setIsModalOpen(true);
    window.addEventListener('keydown', closeModalWindow);

    return () => {
      setIsModalOpen(false);
      window.removeEventListener('keydown', closeModalWindow);
    };
  }, [closeModalWindow]);

  return (
    isModalOpen && (
      <div className={css.overlay} onClick={closeModalWindow}>
        <div className={css.modal}>
          <img src={currentImage.src} alt={currentImage.alt} />
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  currentImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  resetCurrentImage: PropTypes.func.isRequired,
};

export default Modal;
