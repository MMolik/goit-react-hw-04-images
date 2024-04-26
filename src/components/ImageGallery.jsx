import React from 'react';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onImageClick }) => (
  <ul className="imageGallery">
    {images.map(image => (
      <li key={image.id}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          onClick={() => onImageClick(image.webformatURL, image.id)}
        />
      </li>
    ))}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
