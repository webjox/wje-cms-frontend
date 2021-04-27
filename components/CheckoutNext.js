import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../src/state/globalStateContext/context';

import styles from '../styles/componentStyles/checkoutNext.module.css';
import CartCheckout from './CartCheckout';
import ShopCard from './ShopCard';

export default function CheckoutNext({ next, closeModal }) {
  const { state } = useContext(globalContext);
  const [localData, setLocalData] = useState({});

  const [checked, setChecked] = useState(false);

  const [shops, setShops] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [products, setProducts] = useState([]);

  const [selectedShippingMethod, setSelectedShippingMethod] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');

  const [available, setAvailable] = useState(false);
  const [validate, setValidate] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  const [warehouse, setWarehouse] = useState(false);

  const [request, setRequest] = useState(0);

  useEffect(async () => {
    setLocalData({ ...state.cart });
  }, [state.cart]);

  useEffect(async () => {
    setShops(await state.getShops());
    setShippingMethods(await state.getShippingMethods());
    if(state.checkout.shop) {
      setSelectedShop(state.checkout.shop);
    }
  }, []);

  const changeHandler = evt => {
    const {target} = evt;
    const value = target.checked;
    setChecked(value);
  };

  const changeShipping = e => {
    const {target} = e;
    const {value} = target;
    setSelectedShippingMethod(value);
  };

  const setCheckout = async () => {
    const checkout = { ...state.checkout };
    checkout.shipping_method_id = selectedShippingMethod;
    checkout.shipping_address = {};
    checkout.shipping_address.city = city;
    checkout.shipping_address.street = street;
    checkout.shipping_address.house = house;
    checkout.shipping_address.address = `${street} ${house}`;
    state.setCheckout(checkout);
    await state.putCart(checkout);
  };

  const handleSelectShop = e => {
    const target = e.target.closest(`.${styles.selectShop}`);
    const child = target.firstElementChild;
    if (child.dataset.available == 'true') setAvailable(true);
    else setAvailable(false);
    setSelectedShop(target.dataset.shopId);
    if (target.dataset.warehouse == 'true') setWarehouse(true);
    else setWarehouse(false);
  };

  const handleCheckout = async () => {
    const message = document.querySelector(`.${styles.requestMessage}`);
    document.body.prepend(message);

    await setCheckout();
    const shop_id = {
      shop_id: `${selectedShop}`,
    };
    const result = await state.putCheckout(shop_id);
    closeModal();
    if (result.status === 200) {
      state.setCartData({});
      setTimeout(() => {
        setRequest(1);
      }, 100);
      setTimeout(() => {
        setRequest(0);
      }, 3000);
    } else {
      setTimeout(() => {
        setRequest(2);
      }, 100);
      setTimeout(() => {
        setRequest(0);
      }, 3000);
    }
  };

  useEffect(() => {
    if (localData._id) {
      if (localData.items.length)
        setTotalPrice(
          localData.items.reduce(
            (a, b) => a + (warehouse && !checked ? b.stock_price_total : b.price_total),
            0,
          ),
        );
      else setTotalPrice(0);
    } else setTotalPrice(0);
  }, [localData, warehouse, checked]);

  useEffect(async () => {
    if (localData._id && localData.items.length) {
      const productsList = [];
      for (let i = 0; i < localData.items.length; i += 1) {
        const result = await state.getProductById(localData.items[i].product_id);
        productsList.push(result);
      }
      setProducts(productsList);
    }
  }, [localData]);

  useEffect(() => {
    if (state.checkout.shipping_address && state.checkout.shipping_address.city)
      setCity(state.checkout.shipping_address.city);
    if (state.checkout.shipping_address && state.checkout.shipping_address.street)
      setStreet(state.checkout.shipping_address.street);
    if (state.checkout.shipping_address && state.checkout.shipping_address.house)
      setHouse(state.checkout.shipping_address.house);
    if (state.checkout.shipping_method_id)
      setSelectedShippingMethod(state.checkout.shipping_method_id);
  }, []);

  useEffect(() => {
    if (city.length && street.length && house.length && selectedShippingMethod.length)
      setValidate(true);
    else setValidate(false);
  }, [city, street, house, selectedShippingMethod]);

  if (shops.length && shippingMethods.length && products.length) {
    return (
      <div>
        <div
          className={styles.requestMessage}
          style={
            request
              ? { transform: 'scale(1) translate(-50%, -50%)' }
              : { transform: 'scale(0) translate(-50%, -50%)' }
          }>
          {request === 1
            ? 'Ваша заявка успешно принята'
            : request === 2
            ? 'Что-то пошло не так :('
            : ''}
          {request === 1 ? (
            <div style={{ maxWidth: '45px', marginLeft: '20px' }}>
              <img style={{ width: '100%' }} src="/succes.png" />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className={styles.zacaz1}>
          <div className={styles.header}>
            <h1 className={styles.orderName}>Оформление заказа №{localData.number}</h1>

            <div className={styles.controlerWrapper}>
              <img
                style={{ cursor: 'pointer' }}
                onClick={async () => {
                  setCheckout();
                  next();
                }}
                src="/return.svg"
                alt="<"
              />
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
          </div>
          <div className={styles.contentContainer}>
            <div className={styles.contacts}>
              <div className={styles.diliveryContainer}>
                <h2 className={styles.diliveryTitle}>Нужна доставка?</h2>
                <label>
                  <div
                    className={
                      checked ? `${styles.switch} ${styles.switchActive}` : `${styles.switch}`
                    }>
                    <div
                      className={
                        checked
                          ? `${styles.switchSlider} ${styles.switchSliderActive}`
                          : `${styles.switchSlider}`
                      } />
                  </div>
                  <input
                    className={styles.paramsCheck}
                    onChange={changeHandler}
                    checked={checked}
                    name="lending"
                    type="checkbox"
                  />
                </label>
              </div>
              {(checked && (
                <div className={styles.deliveryContainer}>
                  <input
                    className={styles.input}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Город"
                  />
                  <input
                    className={styles.input}
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    placeholder="Улица"
                  />
                  <input
                    className={styles.input}
                    value={house}
                    onChange={e => setHouse(e.target.value)}
                    placeholder="Дом"
                  />
                  <div className={styles.deliveryPrice}>
                    <p className={styles.priceTitle}>
                      <img src="/car.svg" />
                      Стоимость доставки
                    </p>
                    <div className={styles.selectContainer}>
                      {shippingMethods.map((item, index) => (
                          <div key={index} className={styles.priceContainer}>
                            <label className={styles.payWay}>
                              <input
                                className={styles.radiob}
                                onChange={changeShipping}
                                checked={item._id == selectedShippingMethod}
                                value={item._id}
                                type="radio"
                                name="pay"
                              />
                              {item.name}
                            </label>
                            <p className={styles.price}>{item.price}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className={styles.totalContainer}>
                    <p className={styles.totalTitle}>
                      <img src="/money.svg" />
                      Итого к оплате
                    </p>
                    <p className={styles.total}>{totalPrice}₽</p>
                  </div>
                  <button
                    onClick={
                      validate && state.checkout.online
                        ? () => {
                            console.log('ПЕРЕНАПРАВЛЕНИЕ НА ШЛЮЗ');
                          }
                        : validate
                        ? handleCheckout
                        : () => {}
                    }
                    className={styles.send}>
                    {validate && state.checkout.online
                      ? 'Перейти к оплате'
                      : validate
                      ? 'Оформить заказ'
                      : 'Введите данные'}
                  </button>
                </div>
              )) || (
                <div className={styles.servicePlacesContainer}>
                  <div className={styles.shopsWrapper}>
                    {shops
                      .sort((a, b) => {
                        if (a.warehouse < b.warehouse) return 1;
                        if (a.warehouse == b.warehouse) return 0;
                        if (a.warehouse > b.warehouse) return -1;
                      })
                      .map((shop, index) => (
                          <div
                            key={index}
                            className={`${styles.selectShop} ${
                              selectedShop === shop._id ? styles.selectedShop : ''
                            }`}
                            data-shop-id={shop._id}
                            data-warehouse={shop.warehouse}
                            onClick={handleSelectShop}>
                            <ShopCard products={products} localData={localData.items} shop={shop} />
                          </div>
                        ))}
                  </div>
                  <div className={styles.totalContainer}>
                    <p className={styles.totalTitle}>
                      <img src="/money.svg" />
                      Итого к оплате
                    </p>
                    <p className={styles.total}>{totalPrice}₽</p>
                  </div>
                  <button
                    onClick={
                      state.checkout.online && selectedShop && available
                        ? () => {
                            console.log('ПЕРЕНАПРАВЛЕНИЕ НА ШЛЮЗ');
                          }
                        : selectedShop
                        ? handleCheckout
                        : () => {}
                    }
                    className={styles.send}>
                    {state.checkout.online && selectedShop && available
                      ? 'Перейти к оплате'
                      : selectedShop
                      ? 'Оформить заказ'
                      : 'Выберите магазин'}
                  </button>
                </div>
              )}
            </div>
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
      </div>
    );
  } return <div />;
}
