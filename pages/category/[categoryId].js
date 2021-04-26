import { useRouter } from 'next/router';

import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Carousel from '../../components/Carousel';
import Product from '../../components/Product';
import Tag from '../../components/Tag';
import Basket from '../../components/Basket';
import Filter from '../../components/Filter';


import styles from '../../styles/category.module.css';

import Link from 'next/link';
import {useContext, useEffect, useState} from 'react';
import globalContext from '../../src/state/globalStateContext/context';
import Loader from '../../components/Loader.js';

const Post = () => {
    const router = useRouter()
    const { categoryId } = router.query;

    const {state} = useContext(globalContext);

    const [localData, setLocalData] = useState([]); 

    const [loading, setLoading] = useState(true);

    const [tags, setTags] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategoryId] = useState([]);

    useEffect(async () => {
        setTags(state.tags);
    }, [state.tags])


    useEffect(async () => {
        if(categoryId) {
            const newFilter = [...state.filter];
            newFilter.push(['categoryId', categoryId])
            state.setFilterData(newFilter);
            setCategoryId(await state.getCategoryId(categoryId))
        };
    }, [categoryId])

    useEffect(async () => {
        const newFilter = [...state.filter];
        setLocalData(newFilter)
        setLoading(true);
    }, [state.filter]);

    useEffect(async () => {
        if(localData.length && localData.findIndex(item => item[1] === categoryId) != -1){
            setProducts(await state.getProductsByFilter(localData))
            setLoading(false);
        };
    }, [localData]);

    const productCardsRender = () =>{
        return products.map((product,index) => {
            return <Product 
                key={index}
                product={product}
            />
        })
    }

    const tagReset = () => {
        const newFilter = [...state.filter];
        const id = newFilter.findIndex(item => {return item[0] === 'tags'});
        if(id != -1){
            newFilter.splice(id, 1);
            state.setFilterData(newFilter);
        }
    }

    const handleTagClick = async (event) => {
        let target = event.target.closest(`.${styles.dataTag}`);
        let id = target.dataset.tagId;
        let newFilter = [].concat(state.filter);

        if(newFilter.find(item => item[0] === 'tags')){
            newFilter = newFilter.map((item,index) => {
                if(item[0] == 'tags') return ['tags', id];
                else return item;
            })
                state.setFilterData(newFilter)
            }
        else{
            newFilter.push(['tags', id]);
            state.setFilterData(newFilter);
        }
    }
    
    const tagsRender = () => {
        let target = state.filter.find(item => item[0] == 'tags')
        if(target){
            return tags.map((item,index) => {
                return ( 
                    <div key={index} className={styles.dataTag} data-tag-id={item._id} onClick={handleTagClick}>
                        <Tag title={item.name} bgColor={target[1] == item._id ? true : false}/>
                    </div>
                )
            })
        }
        else{
            return tags.map((item,index) => {
                return ( 
                    <div key={index} className={styles.dataTag} data-tag-id={item._id} onClick={handleTagClick}>
                        <Tag title={item.name} bgColor={false}/>
                    </div>
                )
            })
        } 
    }

    function checkCategory(category){
        for(let product of products){
            if(product.categoryId === category._id) return true;
        }
        return false;
    }

    const categoryRender = () => {
        return state.categories.map((category, index) => {
            if(checkCategory(category)){
                return <div key={index} className={styles.category}>
                            {/* <Link href={`/category/${category._id}`} onClick={categoryReset}>
                                <a> */}
                                    <div>
                                        {category.name}
                                    </div> 
                                {/* </a>
                            </Link> */}
                            

                            <Carousel id={`abc${index}`}>
                                {productCardsCategoryRender(category)}
                            </Carousel>
                            
                        </div>  
            }
        })
    }

    const productCardsCategoryRender = (category) => {
        return products.map((product,index) => {
          if(product.categoryId == category._id){
              return <Product
                        key={index}
                        product={product}
                    />
          }
        })
    }


    return (
        <div className={styles.container}>
            <Head title='Category'/>
            <NavBar/>
            
                    
                <div className={styles.main}>
                        <div className={styles.tags}>
                            <div className={styles.title}>
                                Подборки
                            </div>
                            <div className={styles.tagsWrapper}>
                                <Carousel id='asfaca'>
                                    {tagsRender()}
                                </Carousel>
                            </div>
                        </div>
                <div className={styles.breadcrumbs}>
                    <Link href='/'><a>Главная</a></Link> <span>&gt;</span> <a onClick={tagReset}>{category.name}</a>
                </div>

                <div className={styles.filterWrapper}>
                    <Filter/>
                </div>

                <div className={styles.category}>

                    <Link href={`/category/${category._id}`}>
                        <a>
                            <div className={styles.title}>
                                {category.name}
                            </div> 
                        </a>
                    </Link>
                    
                </div>              
            
                {products.length != 0 ? (category.parent_id ? productCardsRender() : categoryRender()) : loading ? <Loader/> : 'К сожалению данного сочетания товара нет'}
                </div>
            
            <Basket/>
        </div>
    )
}

export default Post