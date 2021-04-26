import {useEffect, useState} from 'react';
import styles from '../styles/componentStyles/sliderContainer.module.css';
import YouTube from 'react-youtube';

export default function SliderContainer({children,images = [],video}) {
    const [shift, setShift]       = useState(0);
    const [endPoint, setEndPoint] = useState(null);
    const [width, setWidth]       = useState(0);
    
    const opts = {
        height: '428',
        width: '760',
        playerVars: {
            modestbranding: 1,
            controls: 0,
            origin: 'https://localhost/'  // НУЖНО ИЗМЕНИТЬ В ПРОДАКШЕНЕ
        },
    };

    const _onReady = (event) => {
        event.target.pauseVideo();
    };

    useEffect(() => {
        // if(endPoint === null) {
            const wrapper   = document.querySelector(`.${styles.sliderWrapper}`);
            const container = document.querySelector(`.${styles.sliderWrapper}`).firstElementChild;
            
            const widthWrapper = Math.round(parseFloat(getComputedStyle(wrapper).width));
            const widthContainer = Math.round(parseFloat(getComputedStyle(container).width));
            setWidth(widthWrapper);
            if(widthContainer < widthWrapper) setEndPoint(0);
            else setEndPoint(widthContainer - widthWrapper);
        // }
    })

    const handleRightClick = () => {
        if(shift < -endPoint || shift == -endPoint) setShift(0);
        else setShift(shift - width)
    }

    const handleLeftClick = () => {
        if(shift > 0 || shift == 0) setShift(-endPoint);
        else setShift(shift + width)
    }
    
    return (
            <div className={styles.sliderWrapper}>

                <div className={styles.container} style={{transform:`translateX(${shift}px)`}}>
                    {
                        video ?  <div className={styles.contantWrapper} >
                                    <YouTube videoId={video.replace('https://youtu.be/', '')} opts={opts} onReady={_onReady}/>
                                </div>
                                    : ''
                    }
                    {images.map((item,index) => {
                        if(index == 0) return;
                        return (
                            <div key={index} className={styles.contantWrapper} >
                                <img src={item.url}/>
                            </div>
                        )
                    })}
                </div>

                <div className={styles.sliderControler}>
                    <div onClick={handleLeftClick} className={styles.slideControl}> <img style={{transform: 'rotate(180deg)'}} src='/toView.svg'/> </div>
                    <div onClick={handleRightClick} className={styles.slideControl}> <img src='/toView.svg'/> </div>
                </div>
            </div>
    )
}
