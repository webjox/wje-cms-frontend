import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/componentStyles/basket.module.css';
import globalContext from '../src/state/globalStateContext/context';
import Checkout from './Checkout';
import CheckoutNext from './CheckoutNext';
import Modal from './Modal';
import Cart from './BasketCart';

export default function Basket() {
  const { state } = useContext(globalContext);
  const [localData, setLocalData] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const [toBuy, setToBuy] = useState(false);

  const [nextCheckout, setNextCheckout] = useState(false);

  useEffect(async () => {
    setLocalData({ ...state.cart });
  }, [state.cart]);

  useEffect(() => {
    if (localData._id) {
      if (localData.items.length)
        setTotalPrice(localData.items.reduce((a, b) => a + b.price_total, 0));
      else setTotalPrice(0);
    } else setTotalPrice(0);
  }, [localData]);

  useEffect(() => {
    if (toBuy) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }, [toBuy]);

  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <Link href="#">
            <a>
              <p className={styles.basketLink}>Корзина</p>
            </a>
          </Link>

          <Link href="/favorites">
            <a>
              <p className={styles.favoriteLink}>Избранное</p>
            </a>
          </Link>
        </div>

        <div className={styles.adsWrapper}>
          <p className={styles.adsTitle}>Подарки от 1000 рублей!</p>
          <p className={styles.adsDescription}>
            Совершите покупку на сумму от 1000 рублей и получите подарок
          </p>
        </div>

        <div className={styles.basketWrapper}>
          <div className={styles.cartsList}>
            {localData._id
              ? localData.items.map((cart, index) => <Cart key={index} cartData={cart} />)
              : ''}
          </div>

          <div className={styles.makeOrder}>
            <div className={styles.priceTotal}>
              <p>Сумма покупок</p>
              <p>{totalPrice}₽</p>
            </div>

            <p
              onClick={
                localData._id && localData.items.length
                  ? async () => {
                      // state.setCartData(await state.getCartData())
                      setToBuy(!toBuy);
                    }
                  : () => {}
              }
              className={styles.orderLink}>
              {localData._id && localData.items.length
                ? `ОФОРМИТЬ ПОКУПКУ`
                : `ДОБАВЬТЕ ТОВАР В КОРЗИНУ`}
            </p>
          </div>
        </div>
      </div>

      <Modal
        title=""
        showModal={toBuy}
        showModalHandler={() => {
          setToBuy(!toBuy);
        }}>
        {nextCheckout ? (
          <CheckoutNext
            next={() => {
              setNextCheckout(!nextCheckout);
            }}
            closeModal={() => {
              setToBuy(!toBuy);
            }}
          />
        ) : (
          <Checkout
            next={() => {
              setNextCheckout(!nextCheckout);
            }}
            closeModal={() => {
              setToBuy(!toBuy);
            }}
          />
        )}
      </Modal>

      <div
        style={
          toBuy
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
    </div>
  );
}
