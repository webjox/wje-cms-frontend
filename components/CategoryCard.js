import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../styles/componentStyles/categoryCard.module.css';

import globalContext from '../src/state/globalStateContext/context';


export default function serviceCard({ data }) {
  const altImage = 'categoryPlug.png';
  const [image, setImage] = useState(null);
  const { state } = useContext(globalContext);

  useEffect(async () => {
    setImage(await state.getImagesCategoryById(data._id));
  }, []);
  if (image) {
    return (
      <div className={styles.wrapper}>
        <Link href={`/category/${data._id}`}>
          <a>
            <div className={styles.container}>
              <p className={styles.title}>{data.name}</p>
              <img src={image.url.includes('undefined') ? altImage : image.url} />
            </div>
          </a>
        </Link>
      </div>
    );
  } 
    return <div />;
  
}
