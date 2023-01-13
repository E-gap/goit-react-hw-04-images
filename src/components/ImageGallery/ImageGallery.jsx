import React from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';

const ImageGallery = ({ images, onModal }) => {
  return (
    <ul
      className={css.gallery}
      onClick={e => {
        onModal({
          src: e.target.getAttribute('large'),
          alt: e.target.getAttribute('alt'),
        });
      }}
    >
      {images.map(image => (
        <ImageGalleryItem image={image} key={image.id} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onModal: PropTypes.func.isRequired,
};

export default ImageGallery;
