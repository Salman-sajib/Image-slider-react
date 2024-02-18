/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

function ImageSlider({ url, limit = 5, page = 1 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url !== '') fetchImages(url);
  }, [url]);

  // console.log(images);

  if (loading) {
    return <p>Loading data! Please wait...</p>;
  }

  if (errorMsg !== null) {
    return <p>Error occured! {errorMsg} </p>;
  }

  return (
    <div className='container'>
      <BsArrowLeftCircleFill className='arrow arrow-left' />
      {images && images.length
        ? images.map((imageItem) => (
            <img
              className='current-image'
              key={imageItem.id}
              src={imageItem.download_url}
              alt={imageItem.download_url}
            />
          ))
        : null}
      <BsArrowRightCircleFill className='arrow arrow-right' />
      <span className='circle-indicators'>
        {images && images.length
          ? images.map((_, index) => (
              <button key={index} className='current-indicator'></button>
            ))
          : null}
      </span>
    </div>
  );
}

export default ImageSlider;
