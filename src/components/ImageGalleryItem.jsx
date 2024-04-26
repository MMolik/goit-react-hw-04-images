import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ id, src, onClick }) => (
  <li className="imageGalleryItem" onClick={() => onClick(id)}>
    <img src={src} alt="" className="imageGalleryItem-image" />
  </li>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
