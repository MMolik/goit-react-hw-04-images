import React from 'react';
import LoaderSpinner from 'react-loader-spinner';

const Loader = () => {
  return (
    <LoaderSpinner
      type="BallTriangle"
      height={100}
      width={100}
      color="#e3b129"
      ariaLabel="ball-triangle-loading"
    />
  );
};

export default Loader;
