import styles from '../styles/Home.module.css';

import Head from '../components/Head';
import NavBar from '../components/NavBar';
import Tag from '../components/Tag';
import Carousel from '../components/Carousel';
import CategoryCard from '../components/CategoryCard';
import ServiceCard from '../components/ServiceCard';
import Basket from '../components/Basket';

import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import globalContext from '../src/state/globalStateContext/context';

export default function Home() {
  const { state } = useContext(globalContext);
  const [pages, setPages] = useState([]);

  useEffect(async () => {
    setPages(await state.getPages());
    state.setFilterData([]);
  }, []);

  const categoryRender = () => {
    return state.categories.map((category, index) => {
      if (category.parent_id == null) {
        return (
          <div className={styles.category} key={index}>
            <Link href={`/category/${category._id}`}>
              <a>
                <div className={styles.title}>{category.name}</div>
              </a>
            </Link>

            {state.categories.map((subCategory, index) => {
              if (subCategory.parent_id === category._id) {
                return (
                  <CategoryCard
                    key={index}
                    data={subCategory}
                    link={subCategory._id}
                    title={subCategory.name}
                  />
                );
              }
            })}
          </div>
        );
      }
    });
  };

  const serviceCardRender = () => {
    return pages.map((item, index) => {
      if (!item.is_system && item.enabled && !item.in_the_sidebar) {
        return (
          <div key={index}>
            <ServiceCard title={item.card_name} background={item.card_image.url} link={item._id} />{' '}
            {/* Добавь background */}
          </div>
        );
      }
    });
  };

  return (
    <div className={styles.container}>
      <Head title="Home" />
      <NavBar />

      <div className={styles.main}>
        <div className={styles.tags}>
          <div className={styles.title}>Подборки</div>
          <div className={styles.tagsWrapper}>
            <Carousel id="asfa">
              {state.tags.map((item, index) => {
                return (
                  <Link key={index} href={`/tag/${item._id}`}>
                    <a>
                      <Tag title={item.name} key={index} />
                    </a>
                  </Link>
                );
              })}
            </Carousel>
          </div>
        </div>

        {categoryRender()}

        <div className={styles.serviceCardTitle}>Пирошоу и спецэффекты</div>
        <div className={styles.serviceCardWrapper}>{serviceCardRender()}</div>
      </div>

      <Basket />
    </div>
  );
}
