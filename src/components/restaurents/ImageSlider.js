import React, { useState } from 'react';
import './ImageSlider.css';
const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="image-slider">
            {/* Slider Controls */}
            <button onClick={goToPrevious}>&lt;</button>
            
            {/* Current Image */}
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />

            {/* Slider Controls */}
            <button onClick={goToNext}>&gt;</button>
        </div>
    );
};

export default ImageSlider;