import Link from 'next/link';
import styles from '../styles/componentStyles/main.module.css';

export default function Main(props) {
  return <div className={styles.wrapper}>{props.children}</div>;
}
