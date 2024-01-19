import React, { useState, useEffect } from 'react';

const ImageComponent = ({imageName }) => {
  const [imageUrl, setImageUrl] = useState('');
  
  useEffect(() => {
    if (imageName) {
      const imageBasePath = 'http://localhost:3000/images/';
      const encodedImageName = encodeURIComponent(imageName);
      setImageUrl(`${imageBasePath}${encodedImageName}`);
    }
  }, [imageName]);

  return imageUrl ? <img src={imageUrl} alt="Uploaded Content" /> : <p>No image found</p>;
};

export default ImageComponent;
