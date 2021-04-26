import styles from "../styles/componentStyles/cartCheckout.module.css";
import {useContext, useEffect, useState} from 'react';
import globalContext from '../src/state/globalStateContext/context';


export default function CartCheckout({cartData}) {
    const {state} = useContext(globalContext);
    const altImage = '/PlugProduct.png';

    const [quantity, setQuantity] = useState(1);
    const [product, setProduct]   = useState(null);
    const [productCategory, setProductCategory]   = useState(null);
    const [images, setImages]     = useState(null);

    useEffect(async () => {
        setProduct(await state.getProductById(cartData.isMine ? cartData._id : cartData.product_id));
    },[]);
    useEffect(async () => {
        if(product) setImages(await state.getImagesProductById(product._id));
    },[product]);
    useEffect(async () => {
        if(product) setProductCategory(await state.getCategoryId(product.categoryId));
    },[product]);
    
    useEffect( async () => {
        setQuantity(cartData.quantity);
    },[cartData]);

    const handlerChangeItemCart = async (direction) => {
        let newData = {
            product_id: product._id,
            quantity: direction ? 1 : -1,
        }
        await state.addToCart(newData);
    }

    const handleDelete = async () => {
        await state.deleteItemFromCart(cartData._id);
    }

    if(product && images && productCategory){
        return(
            <div className={styles.productItem}>
                <div className={styles.contentContainer}>
                    <div className={styles.img} >
                        <img src={images.length ? images[0].url : altImage}/>
                    </div>
                    <div className={styles.desc}>
                        <p className={styles.category}>{productCategory.name}</p>
                        <p className={styles.add}>{cartData.name}</p>
                    </div>
                    <div className={styles.count}>
                        <button 
                            onClick={async () => {
                                if(quantity == cartData.stock_quantity) return;
                                setQuantity(quantity + 1)
                                await handlerChangeItemCart(true)
                            }}
                        >
                            <img src='/plus.svg'></img>
                        </button>
                            <p>
                            {quantity}
                            </p>
                        <button
                        onClick={async () => {
                            if(quantity == 1) return;
                            setQuantity(quantity - 1);
                            await handlerChangeItemCart(false)
                        }}
                        >
                        <img src='/minus.svg'></img>
                        </button>
                        </div>
                    <p className={`${styles.amountWarehouse} ${styles.mobileBlock}`}>{product.stock_price}₽</p>
                    <p className={`${styles.amountStore} ${styles.mobileBlock}`}>{product.price}₽</p>

                    <button className={styles.deleteBtn} onClick={handleDelete}>
                        <img src='/close.svg'/>
                    </button>
                </div>
            </div>
        )
    }
    else return <div/>
}
