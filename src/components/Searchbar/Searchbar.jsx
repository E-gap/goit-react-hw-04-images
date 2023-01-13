import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handlerChangeName = event => {
    setName(event.target.value.trim());
  };

  const reset = () => {
    setName('');
  };

  const handlerSubmit = event => {
    event.preventDefault();
    onSubmit(name);
    reset();
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handlerSubmit}>
        <button type="submit" className={css.button}>
          <FcSearch className={css.icon} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={name}
          onChange={handlerChangeName}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
