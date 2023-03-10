import { memo } from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <div className={css.loadmore}>
      <button className={css.button} type="button" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default memo(Button);
