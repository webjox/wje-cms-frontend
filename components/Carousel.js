import { useEffect, useState } from 'react';
import styles from '../styles/componentStyles/carousel.module.css';

export default function Carousel({ children }) {
  const [pressed, setPressed] = useState(false);
  const [shift, setShift] = useState(0);
  const [endPoint, setEndPoint] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    if (!pressed) {
      if (shift > 0) {
        setShift(0);
      } else if (shift < -endPoint) {
        setShift(-endPoint);
      }
    }
  }, [pressed]);

  useEffect(() => {
    window.addEventListener('wheel', handleStopWhell, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleStopWhell);
    };
  }, []);

  const handlerPressed = event => {
    const wrapper = event.target.closest(`.${styles.carouselWrapper}`);
    if (endPoint === null) {
      const container = wrapper.firstElementChild;
      const widthWrapper = parseInt(getComputedStyle(wrapper).width);
      const widthContainer = parseInt(getComputedStyle(container).width);
      if (widthContainer < widthWrapper) setEndPoint(0);
      else setEndPoint(widthContainer - widthWrapper);
    }

    if (event.type == 'touchstart') {
      setTouchStart(event.touches[0].clientX);
    }
    if (event.type == 'mouseleave' || event.type == 'touchcancel') {
      setPressed(false);
    } else setPressed(!pressed);
  };

  const handlerMove = event => {
    if (pressed && event.type == 'touchmove') {
      let direction = 10;
      if (touchStart < event.touches[0].clientX) direction = -10;
      setShift(shift - direction);
    }
    if (pressed && event.type == 'mousemove') {
      const direction = event.movementX;
      setShift(shift + direction);
    }
  };

  const handleStopWhell = event => {
    const wrapper = event.target.closest(`.${styles.carouselWrapper}`);
    if (wrapper) {
      if (endPoint === null) {
        const container = wrapper.firstElementChild;
        const widthWrapper = parseInt(getComputedStyle(wrapper).width);
        const widthContainer = parseInt(getComputedStyle(container).width);
        if (widthContainer < widthWrapper) setEndPoint(0);
        else setEndPoint(widthContainer - widthWrapper);
      }
      event.preventDefault();
    }
  };
  const handleWhell = event => {
    let direction = event.deltaY;
    if (!endPoint) return;
    if (shift >= 0) {
      direction = 0;
      if (event.deltaY > 0) {
        direction = event.deltaY;
      }
    }
    if (shift <= -endPoint) {
      direction = 0;
      if (event.deltaY < 0) {
        direction = event.deltaY;
      }
    }
    setShift(shift - direction);
  };

  if (children) {
    return (
      <div
        onMouseUp={handlerPressed}
        onMouseLeave={handlerPressed}
        onMouseDown={handlerPressed}
        onMouseMove={handlerMove}
        onWheel={handleWhell}
        onTouchEnd={handlerPressed}
        onTouchCancel={handlerPressed}
        onTouchStart={handlerPressed}
        onTouchMove={handlerMove}
        className={styles.carouselWrapper}>
        <div
          className={styles.container}
          style={{ transform: `translateX(${shift}px)`, transition: pressed ? '' : '.3s' }}>
          {children}
        </div>
      </div>
    );
  } 
    return <div>Loading...</div>;
  
}
