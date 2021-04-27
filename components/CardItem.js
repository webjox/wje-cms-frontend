import React from 'react';
import styles from '../styles/componentStyles/card-item.module.css';

export const CardItem = ({ category, add, count, amount }) => (
    <div className={`${styles.cardItem}`}>
      <img className={styles.img} src="/salut.png" />
      <div className={styles.desc}>
        <p className={styles.category}>{category}</p>
        <p className={styles.add}>{add}</p>
      </div>
      <div className={styles.count}>{count}</div>
      <div className={styles.break} />
      <div className={`${styles.amount} ${styles.mobileBlock}`}>{amount}</div>
    </div>
  );
