import React from 'react';
import Searchbar from './Searchbar/Searchbar.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import Button from './Button/Button.jsx';
import Loader from './Loader/Loader.jsx';
import Modal from './Modal/Modal.jsx';

export class App extends React.Component {
  state = {
    name: '',
    page: 1,
    images: [],
    isLoading: false,
    isModalOpen: false,
    currentImage: { src: '', alt: '' },
    endSearch: false,
    error: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      this.query();
    }
  }

  query = () => {
    try {
      fetch(
        `https://pixabay.com/api/?q=${this.state.name}&page=${this.state.page}&key=31147704-3d6790a6d451c63a87a2b7851&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(resp => resp.json())
        .then(resp => {
          if (resp.hits.length === 0) {
            this.setState({ error: true });
            return;
          }

          this.setState(prevState => {
            return { images: [...prevState.images, ...resp.hits] };
          });

          if (resp.totalHits <= this.state.images.length + resp.hits.length) {
            this.setState({ endSearch: true });
          }
        });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = name => {
    this.setState({
      name,
      page: 1,
      images: [],
      endSearch: false,
      error: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  closeModal = event => {
    if (event.code === 'Escape') {
      this.setState({ isModalOpen: false });
    }
    window.removeEventListener('keydown', this.closeModal);
  };

  onModal = currentImage => {
    this.setState({ isModalOpen: true, currentImage });
    window.addEventListener('keydown', this.closeModal);
  };

  offModal = event => {
    if (event.target === event.currentTarget) {
      this.setState({ isModalOpen: false });
    }
  };

  render() {
    const { error, images, isLoading, endSearch, currentImage } = this.state;
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
        <Searchbar onSubmit={this.onSubmit} />
        {error && <p>There aren't any results</p>}
        {images.length > 0 && (
          <ImageGallery images={images} onModal={this.onModal} />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !endSearch && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {this.state.isModalOpen && (
          <Modal currentImage={currentImage} offModal={this.offModal} />
        )}
      </div>
    );
  }
}
