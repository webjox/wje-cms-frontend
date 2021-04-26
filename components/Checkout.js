import {useContext, useEffect, useState} from 'react';
import globalContext from '../src/state/globalStateContext/context';

import styles from '../styles/componentStyles/checkout.module.css'
import CartCheckout from './CartCheckout'

export default function Checkout({next, closeModal}) {
    const {state} = useContext(globalContext);
    const [localData, setLocalData] = useState({});

    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [pay, setPay] = useState('');
    const [online, setOnline] = useState(false);

    const [paymentMethods, setPaymentMethods] = useState([]);

    const [validate, setValidate] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(async () => {
        setLocalData({...state.cart})
    }, [state.cart]);
    
    const fullNameHandler = (evt) => {
        const target = evt.target;
        const value = target.value;
        setFullName(value)
    };
    const mobileHandler = (evt) => {
        const target = evt.target;
        const value = target.value;
        setMobile(value)
    };
    const emailHandler = (evt) => {
        const target = evt.target;
        const value = target.value;
        setEmail(value)
    };
    const payHandler = (evt) => {
        const target = evt.target;
        const value = target.value;
        if(target.dataset.onlineMethod == 'true') setOnline(true);
        else setOnline(false);
        setPay(value);
    }; 
    
    const setCheckout =  async () => {
        const checkout = {...state.checkout};
        checkout.full_name = fullName;
        checkout.mobile = mobile;
        checkout.email = email;
        checkout.payment_method_id = pay;
        checkout.online = online;
        state.setCheckout(checkout);
    }

    useEffect(async () => {
        setPaymentMethods(await state.getPaymentMethods());
    }, [])

    useEffect(() => {
        if(fullName.length && mobile.length && email.length && pay.length) setValidate(true);
        else setValidate(false)
    }, [fullName, mobile,email,pay])

    useEffect(() => {
        if(state.checkout.full_name) setFullName(state.checkout.full_name);
        if(state.checkout.mobile) setMobile(state.checkout.mobile);
        if(state.checkout.email) setEmail(state.checkout.email);
        if(state.checkout.payment_method_id) setPay(state.checkout.payment_method_id);
        if(state.checkout.online) setOnline(true);
    }, [])

    useEffect(() => {
        if(localData._id){
            if(localData.items.length) setTotalPrice(localData.items.reduce((a ,b) => a + b.price_total, 0))
            else setTotalPrice(0);
        }
        else setTotalPrice(0);
    }, [localData]);

    return(
        <div className={styles.zacaz1}>
            <div className={styles.header}>
                <h1 className={styles.orderName}>
                    Оформление заказа №{localData.number}
                </h1>
                <img 
                    style={{cursor:'pointer'}}
                    onClick={async () => {
                        setCheckout();
                        closeModal();
                    }} src="/close.svg" alt="X"/>
            </div>
            <div className={styles.contentContainer}>
                
                    <form className={styles.contacts}>
                        <h2 className={styles.subtitle}>Контактные данные</h2>
                            <input onChange={fullNameHandler} className={styles.input} name='full_name' value={fullName} placeholder={"Иван Иванович"}/>
                            <input onChange={mobileHandler} className={styles.input} name='mobile' value={mobile} placeholder={"+7 428 000 00 00"}/>
                            <input onChange={emailHandler} className={styles.input} name='email' value={email} placeholder={"Электронная почта"}/>
                        <div className={styles.selectContainer}>
                            {paymentMethods.map((item, index) => {
                                if(item.enabled){
                                    return (
                                        <label key={index} className={styles.payWay}>
                                            <input className={styles.radiob} onChange={payHandler} checked={item._id === pay ? true : false} data-online-method={item.online_payment} value={item._id} type="radio" name="pay" />
                                            {item.name}
                                        </label>
                                    ) 
                                }
                            })}
                        </div>
                        <div className={styles.totalContainer}>
                            <p className={styles.totalTitle}>
                                <img src={'/money.svg'}/>
                                Итого к оплате
                            </p>
                            <p className={styles.total}>{totalPrice}₽</p>
                        </div>
                        <button onSubmit={e => e.preventDefault()} onClick={validate ? async (e) => {
                            e.preventDefault()
                            // state.setCartData(await state.getCartData())
                            setCheckout();
                            next();
                        } : (e) => {e.preventDefault()}} className={styles.send}>{validate ? `ПРОДОЛЖИТЬ` : `ВВЕДИТЕ ДАННЫЕ`}</button>
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
                            {localData.createdAt ? localData.items.map((item, index) => {
                                return <CartCheckout key={index} cartData={item}/>
                            }) : ''}
                        </div>
                    </div>
                

            </div>
        </div>
    );
}
