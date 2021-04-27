import React from 'react';
import styles from '../styles/componentStyles/loader.module.css';

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={`${styles.circle} ${styles.circle1}`}></div>
      <div className={`${styles.circle} ${styles.circle2}`}></div>
      <div className={`${styles.circle} ${styles.circle3}`}></div>
      <div className={`${styles.circle} ${styles.circle4}`}></div>
      <div className={`${styles.circle} ${styles.circle5}`}></div>
    </div>
  );
}
