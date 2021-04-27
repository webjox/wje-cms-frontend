import React from 'react';
import styles from '../styles/componentStyles/tag.module.css';
import Link from 'next/link';

export default function tag({ title = 'Загрузка...', bgColor }) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        style={bgColor ? { background: '#3E9D48', color: '#fff' } : { background: '#F7F7F7' }}>
        {title}
      </div>
    </div>
  );
}
