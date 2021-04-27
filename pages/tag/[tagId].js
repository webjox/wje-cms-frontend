import { useRouter } from 'next/router';

import Head from '../../components/Head'; // динамический тег head
import NavBar from '../../components/NavBar';
import Main from '../../components/Main';
import Carousel from '../../components/Carousel';
import Product from '../../components/Product';
import Tag from '../../components/Tag';
import Basket from '../../components/Basket';
import Filter from '../../components/Filter';

import styles from '../../styles/tag.module.css';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import globalContext from '../../src/state/globalStateContext/context';

const TagId = () => {
  const router = useRouter();
  const { tagId } = router.query;

  const { state } = useContext(globalContext);

  const [products, setProducts] = useState([]);

  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    if (tagId) {
      state.setFilterData([['tags', tagId]]);
    }
  }, [tagId]);

  useEffect(() => {
    const newData = [].concat(state.filter);
    setLocalData(newData);
  }, [state.filter]);

  useEffect(async () => {
    setProducts(await state.getProductsByFilter(localData));
  }, [localData]);

  function checkCategory(category) {
    for (let product of products) {
      if (product.categoryId === category._id) return true;
    }
    return false;
  }

  const categoryRender = () => {
    return state.categories.map((category, index) => {
      if (checkCategory(category)) {
        return (
          <div key={index} className={styles.category}>
            <Link href={`/category/${category._id}`}>
              <a>
                <div>{category.name}</div>
              </a>
            </Link>

            <Carousel id={`abc${index}`}>{productCardsCategoryRender(category)}</Carousel>
          </div>
        );
      }
    });
  };

  const productCardsCategoryRender = category => {
    return products.map((product, index) => {
      if (product.categoryId == category._id) {
        return <Product key={index} product={product} />;
      }
    });
  };

  const tagsRender = () => {
    return state.tags.map((tag, index) => {
      return (
        <Link key={index} href={`/tag/${tag._id}`}>
          <a>
            <Tag title={tag.name} bgColor={tag._id === tagId ? true : false} />
          </a>
        </Link>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Head title="Tag" />
      <NavBar />
      <Main>
        <div className={styles.main}>
          <div className={styles.tags}>
            <div className={styles.title}>Подборки</div>
            <div className={styles.tagsWrapper}>{tagsRender()}</div>
          </div>

          <div className={styles.breadcrumbs}>
            <Link href="/">
              <a>Главная</a>
            </Link>
          </div>

          <div className={styles.filterWrapper}>
            <Filter />
          </div>

          {products.length != 0 ? (
            categoryRender()
          ) : (
            <div className={styles.category}>К сожалению данного сочетания товаров нет</div>
          )}
        </div>
      </Main>
      <Basket />
    </div>
  );
};

export default TagId;
