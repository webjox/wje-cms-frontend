import Link from 'next/link';
import styles from '../styles/componentStyles/basket.module.css'
import {useContext, useEffect, useState} from 'react';
import globalContext from '../src/state/globalStateContext/context';
import Checkout from './Checkout';
import CheckoutNext from './CheckoutNext';
import Modal from './Modal';

function Cart({cartData}){
    const {state} = useContext(globalContext);
    const altImage = '/PlugProduct.png';

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct]   = useState(null);
    const [productCategory, setProductCategory]   = useState(null);
    const [images, setImages]     = useState(null);

    useEffect(async () => {
        setProduct(await state.getProductById(cartData.product_id));
    },[]);
    useEffect(async () => {
        if(product) setImages(await state.getImagesProductById(product._id));
    },[product]);
    useEffect(async () => {
        if(product) setProductCategory(await state.getCategoryId(product.categoryId));
    },[product]);
    
    useEffect(async () => {
        setQuantity(cartData.quantity);
    },[cartData]);

    const handlerChangeItemCart = async (direction) => {
        let newData = {
            product_id: product._id,
            quantity: direction ? 1 : -1,
        }
        await state.addToCart(newData);
        // state.setCartData(await state.getCartData())
    }

    const handleDelete = async () => {
        await state.deleteItemFromCart(cartData._id);
    }

    if(product && images && productCategory){
        return (
            <div className={styles.cartWrapper}>
    
                <div className={styles.firstColumn}>
                    <Link href={`/product/${product.slug}`}>
                        <a>
                            <img src={images.length ? images[0].url : altImage}></img>
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
                            if(quantity == cartData.stock_quantity) return;
                            setQuantity(quantity + 1)
                            await handlerChangeItemCart(true)
                        }}
                        className={styles.quantityChange}
                    >
                        <img src='/plus.svg'></img>
                    </button>
    
                    <p className={styles.quantity}>{quantity}</p>
    
                    <button
                        className={styles.quantityChange}
                        onClick={async () => {
                            if(quantity == 1) return;
                            setQuantity(quantity - 1);
                            await handlerChangeItemCart(false)
                        }}
                    >
                        <img src='/minus.svg'></img>
                    </button>

                </div>

                <button className={styles.deleteBtn} onClick={handleDelete}>
                        <img src='/close.svg'/>
                </button>

                
            </div>
        )
    }
    else return <div></div>
    
}

export default function Basket() {
    const {state} = useContext(globalContext);
    const [localData, setLocalData] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const [toBuy, setToBuy] = useState(false);

    const [nextCheckout, setNextCheckout] = useState(false);
    
    useEffect(async () => {
        setLocalData({...state.cart})
    }, [state.cart]);

    useEffect(() => {
        if(localData._id){
            if(localData.items.length) setTotalPrice(localData.items.reduce((a ,b) => a + b.price_total, 0))
            else setTotalPrice(0);
        }
        else setTotalPrice(0);
    }, [localData]);

    useEffect(() => {
        if(toBuy) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
    }, [toBuy])
    
        return (
            <div>
                <div className={styles.wrapper}>
                    <div className={styles.container}>
                        <Link href='#'>
                            <a>
                                <p className={styles.basketLink}>Корзина</p>
                            </a>
                        </Link>
                        
                        <Link href='/favorites'>
                            <a>
                                <p className={styles.favoriteLink}>Избранное</p>
                            </a>
                        </Link>
                    </div>
        
                    <div className={styles.adsWrapper}>
                        <p className={styles.adsTitle}>Подарки от 1000 рублей!</p>
                        <p className={styles.adsDescription}>Совершите покупку на сумму от 1000 рублей и получите подарок</p>
                    </div>
                    
                    <div className={styles.basketWrapper}>
        
                        <div className={styles.cartsList}>
                            {localData._id ? localData.items.map((cart, index) => { 
                                return <Cart key={index} cartData={cart}/>  
                            }) : ''}
                        </div>
                        
                        <div className={styles.makeOrder}>
                            <div className={styles.priceTotal}>
                                <p>Сумма покупок</p>
                                <p>{totalPrice}₽</p>
                            </div>
        
                                <p onClick={localData._id && localData.items.length ? async () => {
                                        // state.setCartData(await state.getCartData())
                                        setToBuy(!toBuy)
                                    } : () => {}} className={styles.orderLink}>
                                    {localData._id && localData.items.length ? `ОФОРМИТЬ ПОКУПКУ` : `ДОБАВЬТЕ ТОВАР В КОРЗИНУ`}
                                </p>
        
                        </div>
                    </div>
        
                </div>

                <Modal title={``} showModal={toBuy} showModalHandler={()=>{setToBuy(!toBuy)}}>
                    {nextCheckout ? <CheckoutNext next={() => {setNextCheckout(!nextCheckout)}} closeModal={() => {setToBuy(!toBuy)}}/> : 
                                    <Checkout next={() => {setNextCheckout(!nextCheckout)}} closeModal={() => {setToBuy(!toBuy)}}/>}
                </Modal>

                <div style={toBuy ? {
                        position: 'absolute',
                        top: '0',
                        height: '10000%',
                        width: '1000%',
                        backgroundColor: '#00000070',
                        left: '0',
                        transition: '.3s'
                } : {
                    transition: '.3s',
                    height: '0%',
                    width: '0%',
                    position: 'absolute',
                }}>
                    
                </div>
            </div>
        )
    
}
