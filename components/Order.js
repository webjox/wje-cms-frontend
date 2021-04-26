import React, {useState} from 'react';
import styles from '../styles/componentStyles/order.module.css';
import {CardItem} from "../components/CardItem";

export const Order = () => {


    const [active, setActive] = useState(false);

    const changeHandler = () => {

        setActive(!active);
    }

    return(
        <div className={styles.cards}>

            <div className={active ? `${styles.card} ${styles.cardActive}`: styles.card}>
                <div className={active ? `${styles.cardTitle} ${styles.cardTitleActive}`: styles.cardTitle}>
                    <div className={styles.orderNumber}>Заказ № 000000 от 01.01.2021</div>
                    <div className={styles.price}>
                        <p>111 850p</p>
                        <img src={'/marker.svg'} alt="^" onClick={changeHandler}/>
                    </div>
                </div>
                <div className={active ? `${styles.cardsItemContainer}`:`${styles.cardItemNone}`}>
                    <CardItem count={'100'} add={'Хлопушка с сюрприсом'} amount={'111 300'} category={'Хлопушка'}/>
                    <CardItem count={'100'} add={'Хлопушка с сюрприсом'} amount={'111 300'} category={'Хлопушка'}/>
                </div>
            </div>
        </div>
    );
};
