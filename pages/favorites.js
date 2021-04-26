import styles from '../styles/favorite.module.css';

import Head from '../components/Head';
import Header from '../components/NavBar';
import Main from '../components/Main';
import Product from '../components/Product';
import Basket from '../components/Basket';

import {useContext, useEffect, useState} from 'react';
import globalContext from '../src/state/globalStateContext/context';
import { SortOutlined } from '@material-ui/icons';

export default function Home() {
  const {state} = useContext(globalContext);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState(true);



  useEffect(async () => {
        let featuredProducts = localStorage.getItem('featuredProducts');
        if(!featuredProducts){
            setProducts([]);
        }
        else{
            featuredProducts = JSON.parse(featuredProducts);
            const productsList = [];
            for(let i = 0; i < featuredProducts.length; i++){
                const result = await state.getProductById(featuredProducts[i]);
                productsList.push(result);
            }
            setProducts(productsList);
        }
  }, [])
    const productCardsRender = () =>{
        products.sort((a, b) => {
            if(sort){
                if (a.stock_price > b.stock_price) return 1;
                if (a.stock_price == b.stock_price) return 0; 
                if (a.stock_price < b.stock_price) return -1;
            }
            else{
                if (a.stock_price > b.stock_price) return -1;
                if (a.stock_price == b.stock_price) return 0; 
                if (a.stock_price < b.stock_price) return 1;
            }
        })
        return products.map((product,index) => {
            return <Product 
                key={index}
                product={product}
        />
        })
    }

    const handleSortClick = () => {
        setSort(!sort)
    }

    return (
        <div className={styles.container}>
            <Head title='Home'/>
            <Header/>
                <Main> 
                    <div className={styles.header}>
                        <div className={styles.pageTitle}>Избранное</div>
                        <div className={styles.sort} onClick={handleSortClick}> <img src='sort.svg'/>Сортировка по цене</div>
                    </div>
                    <div className={styles.favoriteList}>
                        {products.length ? productCardsRender() : 'К сожалению вы ничего не добавили в избранное'}
                    </div>
                </Main>
            <Basket/>
        </div>
    )
}
