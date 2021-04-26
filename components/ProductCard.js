import styles from '../styles/componentStyles/productCard.module.css';
import {useContext, useEffect, useState} from 'react';
import globalContext from '../src/state/globalStateContext/context';

export default function ProductCard({image,product, shops}) {

    const [quantity, setQuantity] = useState(1);
    const [stock, setStock]     = useState(true);
    const {state} = useContext(globalContext);

    const [inFeatured, setInFeatured] = useState(false);
    const [inBasket, setInBasket] = useState(false);

    useEffect(() => {

    }, [])

    useEffect(() => {
        if(state.cart.createdAt){
            const id = state.cart.items.findIndex(item => {return item.product_id === product._id || item._id === product._id});
            if(id != -1) setInBasket(true);
            else setInBasket(false);
        }  
        else{
            setInBasket(false);
        }
    },[state.cart])

    useEffect(() => {
        let featuredProducts = localStorage.getItem('featuredProducts');
        if(featuredProducts){
            featuredProducts = JSON.parse(featuredProducts);
            const id = featuredProducts.findIndex(item => item === product._id)
            if(id !== -1){
                setInFeatured(true);
            }
        }
    }, [])

    const handlerFeatured = async () => {
        setInFeatured(!inFeatured);
        if(inFeatured){
            let featuredProducts = JSON.parse(localStorage.getItem('featuredProducts'));
            const id = featuredProducts.findIndex(item => item === product._id)
            featuredProducts.splice(id, 1);
            localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts));
        }
        else{
            let featuredProducts = localStorage.getItem('featuredProducts');
            if(!featuredProducts){
                localStorage.setItem('featuredProducts', `["${product._id}"]`);
            }
            else{
                featuredProducts = JSON.parse(featuredProducts);
                const id = featuredProducts.findIndex(item => item === product._id)
                if(id === -1){
                    featuredProducts.push(product._id);
                    localStorage.setItem('featuredProducts', JSON.stringify(featuredProducts));
                }
            }
        }
        
        if(state.userData.customer_settings){
            await state.putUserData({featured_products:product._id, token: state.userData.token});
        }
        
    }

    const handlerAddToCart = () => {
        const dataCart = {
            product_id: product._id,
            quantity: quantity,
        }
        state.addToCart(dataCart);
    }
   
    const countQuantity = (shop) => {
        const result = product.shops.filter(item => shop ? !item.warehouse : item.warehouse);
        if(result.length){ 
            const total = result.reduce((a,b) => a + +b.quantity, 0) 
            return `в наличии ${total} шт.`;
        }
        else return 'нет в наличии'
    }

    return (
        <div>
           <div className={styles.titleWrapper}>
               <p>{product.name}</p>
               <p>арт. {product.sku}</p>
           </div>
           <div className={styles.productWrapper}>
                <div className={styles.imgWrapper}>
                    <img src={image.url ?  image.url : '/PlugProduct.png'}/>

                    <div className={styles.favorite} onClick={handlerFeatured} style={inFeatured ? {backgroundColor: 'red'} : {}}>
                        <img src='/wishlist.svg'/>
                    </div>
                </div>

                {product.options.map((item,index) => {
                    return (
                        <div key={index} className={styles.optionWrapper}>
                            <p>{item.name}</p>
                            <p>{item.values[0]}</p>
                        </div>
                    )
                })}
                
                <div onClick={() => {setStock(true)}} className={styles.price} style={stock ? {background:"#fff"} : {}}>
                    <p className={styles.totalPrice}>{product.stock_price * quantity} <span>₽</span></p>
                    <p className={styles.priceInfo}>цена склада, <span>{countQuantity(false)}</span></p>
                </div>
                <div onClick={() => {setStock(false)}} className={`${styles.price} ${styles.priceB}`} style={stock ? {} : {background:"#fff"}}>
                    <p className={styles.totalPrice}>{product.price * quantity} <span>₽</span></p>
                    <p className={styles.priceInfo}>цена магазинов, <span>{countQuantity(true)}</span></p>
                </div>

                <div className={styles.controlerWrapper}>

                    <div className={styles.cartCounter}>
                        <button
                            className={styles.quantityChange}
                            onClick={() => {
                                if(quantity == 1 || inBasket){
                                    return;
                                }
                                setQuantity(quantity - 1);
                            }}
                        >
                            <img src='/minus.svg'></img>
                        </button>

                        <p className={styles.quantity}>{quantity}</p>
                        
                        <button 
                            onClick={() => {
                                if(inBasket) return;
                                setQuantity(quantity + 1)
                            }}
                            className={styles.quantityChange}
                        >
                            <img src='/plus.svg'></img>
                        </button>  
                    </div>

                    <button style={inBasket ? {background:'rgb(143 232 202)'} : {}} onClick={inBasket ? ()=>{} : handlerAddToCart} className={styles.toBasket}>{inBasket ? `В КОРЗИНЕ` : `В КОРЗИНУ`}</button>
                </div>
           </div>
        </div>
    )
}
