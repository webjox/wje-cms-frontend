import React from 'react'
import styles from '../styles/componentStyles/categoryCard.module.css';
import {useContext, useEffect, useState} from 'react';
import globalContext from '../src/state/globalStateContext/context';

import Link from 'next/link';

export default function serviceCard({data}) {
    const altImage = 'categoryPlug.png';
    const [image, setImage] = useState(null);
    const {state} = useContext(globalContext);
   

    useEffect(async () => {
        setImage(await state.getImagesCategoryById(data._id))
    }, [])
    if(image){
        return (
            <div className={styles.wrapper}>
                <Link href={`/category/${data._id}`}>
                    <a>
                        <div className={styles.container}>
                            <p className={styles.title}>{data.name}</p>
                             <img src={/undefined/gi.test(image.url) ? altImage : image.url }></img>  
                        </div> 
                    </a>
                </Link>
            </div>
        )
    }
    else{
        return <div/>
    }
    
}
