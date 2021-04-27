import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import globalContext from '../src/state/globalStateContext/context';
import styles from '../styles/componentStyles/basket.module.css';

export default function Cart({ cartData }) {
    const { state } = useContext(globalContext);
    const altImage = '/PlugProduct.png';
  
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [productCategory, setProductCategory] = useState(null);
    const [images, setImages] = useState(null);
  
    useEffect(async () => {
      setProduct(await state.getProductById(cartData.product_id));
    }, []);
    useEffect(async () => {
      if (product) setImages(await state.getImagesProductById(product._id));
      if (product) setProductCategory(await state.getCategoryId(product.categoryId));
    }, [product]);
  
    useEffect(async () => {
      setQuantity(cartData.quantity);
    }, [cartData]);
  
    const handlerChangeItemCart = async direction => {
      const newData = {
        product_id: product._id,
        quantity: direction ? 1 : -1,
      };
      await state.addToCart(newData);
      // state.setCartData(await state.getCartData())
    };
  
    const handleDelete = async () => {
      await state.deleteItemFromCart(cartData._id);
    };
  
    if (product && images && productCategory) {
      return (
        <div className={styles.cartWrapper}>
          <div className={styles.firstColumn}>
            <Link href={`/product/${product.slug}`}>
              <a>
                <img src={images.length ? images[0].url : altImage} />
              </a>
            </Link>
          </div>
  
          <div className={styles.cartPriceName}>Цена</div>
  
          <div className={styles.secondColumn}>
            <div className={styles.cartCategory}>{productCategory.name}</div>
            <div className={styles.cartTitle}>{cartData.name}</div>
          </div>
  
          <div className={styles.cartPrice}>{cartData.price * quantity}₽</div>
  
          <div className={styles.cartCounter}>
            <button
              onClick={async () => {
                if (quantity == cartData.stock_quantity) return;
                setQuantity(quantity + 1);
                await handlerChangeItemCart(true);
              }}
              className={styles.quantityChange}>
              <img src="/plus.svg" />
            </button>
  
            <p className={styles.quantity}>{quantity}</p>
  
            <button
              className={styles.quantityChange}
              onClick={async () => {
                if (quantity == 1) return;
                setQuantity(quantity - 1);
                await handlerChangeItemCart(false);
              }}>
              <img src="/minus.svg" />
            </button>
          </div>
  
          <button className={styles.deleteBtn} onClick={handleDelete}>
            <img src="/close.svg" />
          </button>
        </div>
      );
    } return <div />;
  }