import {useState, useEffect} from 'react'
import styles from '../styles/componentStyles/shopCard.module.css';

export default function ShopCard({shop, product,products, localData}) {

    const [available, setAvailable] = useState(false);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if(product){
            // for(let item of product.shops){
                const shopId = product.shops.findIndex(localItemShop => localItemShop.shop_id == shop._id);
                if(shopId != -1){ 
                    setQuantity(+product.shops[shopId].quantity)
                    setAvailable(true)
                }
                else setAvailable(false)
            // }
        }
        if(products){
            const array = [];
            for(let item of products){
                const shopId = item.shops.findIndex(localItemShop => localItemShop.shop_id == shop._id);
                if(shopId != -1){
                    const id = localData.findIndex(localDataItem => localDataItem.product_id == item._id);
                    if(+item.shops[shopId].quantity >= localData[id].quantity) array.push(true) // setAvailable(true);
                    else array.push(false)  // setAvailable(false); 
                }
                else array.push(false) // setAvailable(false);

                // for(let shopItem of item.shops){
                   
                //     if(shopItem.shop_id != shop._id) array.push(false) //setAvailable(false);
                //     else {
                //         if(+shopItem.quantity >= localData[id].quantity) array.push(true)   //setAvailable(true)
                //         else array.push(false) // setAvailable(false)
                //     }
                // }
            }
            for(let arr of array){
                if(!arr){
                    setAvailable(false);
                    break;
                }
                else setAvailable(true);
            }
        }
    }, [product, products])
    
    const checkShop = () => {
        if(product){
            if(available) return <p className={styles.quantity} style={{textAlign:'right'}}>{quantity} шт.</p>
            else return <div className={styles.notAvailable}></div>;
        }
        if(products){
            if(!available) return   <div className={styles.notAvailable}></div>;
            else return <div className={styles.available}></div>;
        }
        else return "WARN"
    }

    return (
        <div data-available={available} className={styles.wrapper}>
            <div className={styles.row}>
                <p className={styles.name}>{shop.name}</p>
                {checkShop()}

                <div className={`${styles.popap}`}>
                    {available ? "Товар есть в наличии" : "Вы можете оформить заявку под заказ"}
                </div>
            </div>
            <div className={styles.row}>
                <p className={styles.phone}>{shop.phone ? shop.phone : ''}</p>
            </div>
            <div className={styles.row}>
                <p className={styles.address}>{shop.location.full_address}</p>
                <p className={styles.time}>{shop.work_time}</p>
            </div>
        </div>
    )
}
