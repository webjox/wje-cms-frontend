import styles from '../styles/componentStyles/product.module.css';
import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../src/state/globalStateContext/context';
import Link from 'next/link';

export default function Product({ product }) {
  const altImage = '/PlugProduct.png';

  const { state } = useContext(globalContext);

  const [inFeatured, setInFeatured] = useState(false);
  const [inBasket, setInBasket] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(async () => {
    setCategory(await state.getCategoryId(product.categoryId));
  }, []);

  useEffect(() => {
    if (state.cart.createdAt) {
      const id = state.cart.items.findIndex(item => {
        return item.product_id === product._id || item._id === product._id;
      });
      if (id != -1) setInBasket(true);
      else setInBasket(false);
    } else {
      setInBasket(false);
    }
  }, [state.cart]);

  useEffect(() => {
    let featuredProducts = localStorage.getItem('featuredProducts');
    if (featuredProducts) {
      featuredProducts = JSON.parse(featuredProducts);
      const id = featuredProducts.findIndex(item => item === product._id);
      if (id !== -1) {
        setInFeatured(true);
      }
    }
  }, []);

  const handlerAddToCart = async () => {
    setInBasket(true);

    const dataCart = {
      product_id: product._id,
      quantity: 1,
    };
    await state.addToCart(dataCart);
  };

  const handlerFeatured = async () => {
    setInFeatured(!inFeatured);
    if (inFeatured) {
      let featuredProducts = JSON.parse(localStorage.getItem('featuredProducts'));
      const id = featuredProducts.findIndex(item => item === product._id);
      featuredProducts.splice(id, 1);
      localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts));
    } else {
      let featuredProducts = localStorage.getItem('featuredProducts');
      if (!featuredProducts) {
        localStorage.setItem('featuredProducts', `["${product._id}"]`);
      } else {
        featuredProducts = JSON.parse(featuredProducts);
        const id = featuredProducts.findIndex(item => item === product._id);
        if (id === -1) {
          featuredProducts.push(product._id);
          localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts));
        }
      }
    }

    if (state.userData.customer_settings) {
      await state.putUserData({ featured_products: product._id, token: state.userData.token });
    }
  };

  const [images, setImages] = useState(null);

  useEffect(async () => {
    if (product && category) setImages(await state.getImagesProductById(product._id));
  }, [product]);

  if (images && category) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.product}>
          <div className={styles.container}>
            <div
              onClick={handlerFeatured}
              className={styles.favorite}
              style={
                inFeatured
                  ? { backgroundImage: 'url(/wishlist.svg)', backgroundColor: 'red' }
                  : { backgroundImage: 'url(/wishlist.svg)' }
              }
            />
          </div>

          <Link href={`/product/${product.slug}`}>
            <a>
              <div className={styles.container}>
                <div className={styles.preview}>
                  <img src={images.length != 0 ? images[0].url : altImage} />
                </div>

                <div
                  className={styles.toView}
                  style={{ backgroundImage: 'url(/toView.svg)' }}></div>
              </div>
            </a>
          </Link>

          <div className={styles.description}>
            <p className={styles.descriptionCategory}>{category.name}</p>
            <p className={styles.descriptionTitle}>{product.name}</p>
            <p className={styles.descriptionTitle}>{product.sku}</p>
            <p className={styles.descriptionPrice}>
              {product.stock_price}
              <s>{product.price == 0 ? '' : product.price}</s>
            </p>
          </div>

          <button
            onClick={inBasket ? () => {} : handlerAddToCart}
            className={styles.addToBasket}
            style={inBasket ? { background: 'rgb(143 232 202)' } : {}}>
            <p>{inBasket ? `В корзине` : `Добавить в корзину`}</p>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.wrapper}>
        <div className={styles.product}></div>
      </div>
    );
  }
}
