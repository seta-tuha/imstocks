import React from 'react';
import './Background.css';

export default function Background() {
  const images = React.useRef();
  const [currentImage, setCurrentImage] = React.useState(null);
  const [switchingImage, setSwitchingImage] = React.useState(false);
  const [displayingImage, setDisplayingImage] = React.useState();

  React.useEffect(() => {
    fetch('https://api.unsplash.com/photos/?client_id=0d26d0f5997df5dfffe2399343c4541a443d50eb9dc2eeeb012808196b762f38')
      .then(response => response.json())
      .then(responseImages => {
        images.current = responseImages.map(r => r.urls.full);
        setSwitchingImage(true)
      })
  }, []);

  React.useEffect(() => {
    if (switchingImage) {
      const timerId = setInterval(() => {
        setCurrentImage(x => x === images.current.length - 1 || x === null ? 0 : x + 1)
      }, 3000);
      return () => clearInterval(timerId);
    }
  }, [switchingImage]);

  React.useEffect(() => {
    if(images.current && images.current[currentImage]) {
      const imageLoader = new Image();
      imageLoader.onload = () => {
        setDisplayingImage(images.current[currentImage]);
      }
      imageLoader.src = images.current[currentImage];
    }
  }, [currentImage]);

  return (
    <div className="background" style={{ backgroundImage: `url("${displayingImage}")`}} />
  )
}
