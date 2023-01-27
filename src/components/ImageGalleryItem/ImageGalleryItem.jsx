import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image: { webformatURL, largeImageURL, tags } }) => {
  return (
    <li>
      <img
        className={css.galleryItem}
        src={webformatURL}
        large={largeImageURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
