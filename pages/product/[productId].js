import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../../src/state/globalStateContext/context';

import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Basket from '../../components/Basket';
import ProductCard from '../../components/ProductCard';
import ShopCard from '../../components/ShopCard';
import SliderContainer from '../../components/SliderContainer';
import Product from '../../components/Product';
import Modal from '../../components/Modal';

import styles from '../../styles/product.module.css';

const Description = ({ children }) => {
  const [dropped, setDropped] = useState('false');
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const elem = document.querySelector(`.${styles.descriptionContent}`);
    setHeight(elem.scrollHeight);
  }, []);

  return (
    <div>
      <div
        className={styles.descriptionContent}
        style={dropped ? { maxHeight: '82px' } : { maxHeight: height }}>
        {children}
      </div>
      <div
        className={styles.descriptionBtn}
        onClick={() => {
          setDropped(!dropped);
        }}>
        {dropped ? `Показать полностью` : `Скрыть описание`}
      </div>
    </div>
  );
};

const ProductId = () => {
  const altImage = '/PlugProduct.png';

  const router = useRouter();
  const { productId } = router.query;

  const { state } = useContext(globalContext);

  const [category, setCategory] = useState([]);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState(null);

  const [shops, setShops] = useState([]);
  const [showShops, setShowShops] = useState(false);

  const [files, setFiles] = useState([]);

  useEffect(async () => {
    if (productId) setProduct(await state.getProductBySlug(productId));
  }, [productId]);

  useEffect(async () => {
    setShops(await state.getShops());
  }, []);

  useEffect(async () => {
    if (product._id) {
      setFiles(await state.getProductFilesById(product._id));
      setProducts(await state.getProductByCategory(product.categoryId));
      setCategory(await state.getCategoryId(product.categoryId));
      setImages(await state.getImagesProductById(product._id));
    }
  }, [product]);

  //  var myMap;

  // Дождёмся загрузки API и готовности DOM.

  //    window.ymaps.ready(init);

  //     function init () {
  //         // Создание экземпляра карты и его привязка к контейнеру с
  //         // заданным id ("map").
  //         myMap = new window.ymaps.Map('map', {
  //             // При инициализации карты обязательно нужно указать
  //             // её центр и коэффициент масштабирования.
  //             center: [55.76, 37.64], // Москва
  //             zoom: 10
  //         }, {
  //             searchControlProvider: 'yandex#search'
  //         });

  //     }

  useEffect(() => {
    if (showShops) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [showShops]);

  function Content() {
    return <div dangerouslySetInnerHTML={{ __html: product.description }} />;
  }

  if (images) {
    return (
      <div className={styles.container}>
        <Head title="Product" />
        <NavBar />

        <div className={styles.main}>
          <div className={styles.breadcrumbs}>
            <Link href="/">
              <a>Главная</a>
            </Link>
            {` > `}
            <Link href={`/category/${category._id}`}>
              <a>{category.name}</a>
            </Link>
            {` > `}

            {product.name}
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.effects}>ПИОН</div>

            <SliderContainer images={images} video={product.video} />

            <div className={styles.description}>
              <h1>Описание</h1>
              {product.description.length > 400 ? (
                <Description>
                  <Content />
                </Description>
              ) : (
                <div className={styles.descriptionContent}>
                  <Content />
                </div>
              )}
            </div>

            {files.length ? (
              <div className={styles.docsWrapper}>
                {files.map((item, index) => (
                    <Link href={`${item.url}`} key={index}>
                      <a>
                        <div key={index} className={styles.doc}>
                          <img src="/docIcon.svg" />
                          {item.filename}
                        </div>
                      </a>
                    </Link>
                  ))}
              </div>
            ) : (
              ''
            )}
          </div>

          <button onClick={() => setShowShops(!showShops)} className={styles.showShopsBtn}>
            Магазины
          </button>

          <Modal
            title="Наличие товара"
            showModalHandler={() => setShowShops(!showShops)}
            showModal={showShops}
            option
            rowTwo={<div id="map" style={{ width: '1200px', height: '600px' }} />}>
            {shops.length
              ? shops.map((shop, index) => (
                    <div key={index} className={`${styles.selectShop}`}>
                      <ShopCard shop={shop} product={product} />
                    </div>
                  ))
              : ''}
          </Modal>

          <div
            style={
              showShops
                ? {
                    position: 'absolute',
                    top: '0',
                    height: '10000%',
                    width: '1000%',
                    backgroundColor: '#00000070',
                    left: '0',
                    transition: '.3s',
                  }
                : {
                    transition: '.3s',
                    height: '0%',
                    width: '0%',
                    position: 'absolute',
                  }
            } />

          <div className={styles.productCardWrapper}>
            <ProductCard image={images.length != 0 ? images[0] : altImage} product={product} />
          </div>

          {products.length ? (
            <div className={styles.relatedWrapper}>
              <h1>Вам могут понравиться</h1>
              <div>
                {products.map((item, index) => {
                  if (item._id == product._id) return;
                  if (index > 3) return;
                  return <Product key={index} category={category} product={item} />;
                })}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>

        <Basket />
      </div>
    );
  } 
    return (
      <div className={styles.container}>
        <Head title="Product" />
        <NavBar />
        <Basket />
      </div>
    );
  
};

export default ProductId;
