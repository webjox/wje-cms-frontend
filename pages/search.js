import styles from '../styles/search.module.css';

import Head from '../components/Head';
import NavBar from '../components/NavBar';
import Product from '../components/Product';
import Basket from '../components/Basket';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import globalContext from '../src/state/globalStateContext/context';

export default function search({}) {
  const { state } = useContext(globalContext);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    setProducts(await state.getProductBySearch(state.search));
  }, [state.search]);

  if (products.length) {
    return (
      <div>
        <Head />
        <NavBar />
        <div className={styles.main}>
          <div className={styles.title}>Мы нашли такие товары по вашему запросу</div>
          {products.map((product, index) => {
            return <Product key={index} product={product} />;
          })}
        </div>
        <Basket />
      </div>
    );
  } else {
    return (
      <div>
        <Head />
        <NavBar />
        <div className={styles.main}>К сожалению мы ничего не нашли по вашему запросу...</div>
        <Basket />
      </div>
    );
  }
}
