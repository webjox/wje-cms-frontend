import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../src/state/globalStateContext/context';

import styles from '../styles/componentStyles/checkout.module.css';
import CartCheckout from './CartCheckout';

export default function Checkout({ next, closeModal }) {
  const { state } = useContext(globalContext);
  const [localData, setLocalData] = useState({});
  const [requestData, setRequestData] = useState({
    full_name: '',
    mobile: '',
    email: ''
  });
  
  const handleChange = (event, key, secondKey) => {
    setRequestData(prevstate => {
        const result = prevstate;
        if(secondKey) result[key][secondKey] = event.target.value;
        else result[key] = event.target.value || event.target.checked;
        return {...result};
    });
  };

  const [pay, setPay] = useState('');
  const [online, setOnline] = useState(false);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [validate, setValidate] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(async () => {
    setLocalData({ ...state.cart });
  }, [state.cart]);

  const payHandler = evt => {
    const {target} = evt;
    const {value} = target;
    if (target.dataset.onlineMethod === 'true') setOnline(true);
    else setOnline(false);
    setPay(value);
  };

  const setCheckout = async () => {
    const checkout = { ...state.checkout };
    checkout.full_name = requestData.full_name;
    checkout.mobile = requestData.mobile;
    checkout.email = requestData.email;
    checkout.payment_method_id = pay;
    checkout.online = online;
    state.setCheckout(checkout);
  };

  useEffect(async () => {
    setPaymentMethods(await state.getPaymentMethods());
  }, []);

  useEffect(() => {
    if (requestData.full_name.length && requestData.mobile.length && requestData.email.length && pay.length) setValidate(true);
    else setValidate(false);
  }, [requestData, pay]);

  useEffect(() => {
    if (state.checkout.full_name) setRequestData(prevstate => {
      const result = prevstate;
      result.full_name = state.checkout.full_name;
      return {...result};
    });
    if (state.checkout.mobile) setRequestData(prevstate => {
      const result = prevstate;
      result.mobile = state.checkout.mobile;
      return {...result};
    });
    if (state.checkout.email) setRequestData(prevstate => {
      const result = prevstate;
      result.email = state.checkout.email;
      return {...result};
    });
    if (state.checkout.payment_method_id) setPay(state.checkout.payment_method_id);
    if (state.checkout.online) setOnline(true);
  }, []);

  useEffect(() => {
    if (localData._id) {
      if (localData.items.length)
        setTotalPrice(localData.items.reduce((a, b) => a + b.price_total, 0));
      else setTotalPrice(0);
    } else setTotalPrice(0);
  }, [localData]);

  return (
    <div className={styles.zacaz1}>
      <div className={styles.header}>
        <h1 className={styles.orderName}>Оформление заказа №{localData.number}</h1>
        <img
          style={{ cursor: 'pointer' }}
          onClick={async () => {
            setCheckout();
            closeModal();
          }}
          src="/close.svg"
          alt="X"
        />
      </div>
      <div className={styles.contentContainer}>
        <form className={styles.contacts}>
          <h2 className={styles.subtitle}>Контактные данные</h2>
          <input
            onChange={e => handleChange(e, 'full_name')}
            className={styles.input}
            name="full_name"
            value={requestData.full_name}
            placeholder="Иван Иванович"
          />
          <input
            onChange={e => handleChange(e, 'mobile')}
            className={styles.input}
            name="mobile"
            value={requestData.mobile}
            placeholder="+7 428 000 00 00"
          />
          <input
            onChange={e => handleChange(e, 'email')}
            className={styles.input}
            name="email"
            value={requestData.email}
            placeholder="Электронная почта"
          />
          <div className={styles.selectContainer}>
            {paymentMethods.map((item, index) => {
              if (item.enabled) {
                return (
                  <label key={index} className={styles.payWay}>
                    <input
                      className={styles.radiob}
                      onChange={payHandler}
                      checked={item._id === pay}
                      data-online-method={item.online_payment}
                      value={item._id}
                      type="radio"
                      name="pay"
                    />
                    {item.name}
                  </label>
                );
              }
            })}
          </div>
          <div className={styles.totalContainer}>
            <p className={styles.totalTitle}>
              <img src="/money.svg" />
              Итого к оплате
            </p>
            <p className={styles.total}>{totalPrice}₽</p>
          </div>
          <button
            type="submit"
            onSubmit={e => e.preventDefault()}
            onClick={
              validate
                ? async e => {
                    e.preventDefault();
                    // state.setCartData(await state.getCartData())
                    setCheckout();
                    next();
                  }
                : e => {
                    e.preventDefault();
                  }
            }
            className={styles.send}>
            {validate ? `ПРОДОЛЖИТЬ` : `ВВЕДИТЕ ДАННЫЕ`}
          </button>
        </form>

        <div className={styles.basket}>
          <div className={styles.titleContainer}>
            <h2 className={styles.subitle}>Корзина</h2>
            <div className={`${styles.prices} ${styles.mobileBlock}`}>
              <p>Цена склада</p>
              <p>Цена магазина</p>
            </div>
          </div>
          <div className={styles.productsContainer}>
            {localData.createdAt
              ? localData.items.map((item, index) => <CartCheckout key={index} cartData={item} />)
              : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
