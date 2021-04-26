import styles from '../styles/componentStyles/navbar.module.css';
import Link from 'next/link';
import {useContext, useEffect, useState} from 'react';
import globalContext from '../src/state/globalStateContext/context';
import Router from 'next/router';

export default function NavBar() {
    const {state} = useContext(globalContext);

    const [pages, setPages] = useState([]);
    const [searchString, setSearchString] = useState('');

    useEffect(async () => {
        setPages(await state.getPages());
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        state.setSearchData(searchString.replace(' ', '%20'))
        Router.push('/search');
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.container}>
                <Link href='/'>
                    <a style={{width:'50px'}}>
                        <img src='/logo.png' alt='LOGO'></img>
                    </a>
                </Link>

                <form onSubmit={handleSubmit} style={{position:'relative', display:'flex'}}>          
                    <input name='search' onChange={(event) => {setSearchString(event.target.value)}} className={styles.search} type='search' placeholder='Например: Салют'></input>
                    <button style={{backgroundImage:'url(/search.svg)'}} className={styles.submit} type="submit"></button>
                </form>
            </div>

            <div className={styles.container}>
                <div className={styles.nav}>
                    <Link href='/login'>
                        <a style={{display:'flex', alignItems:'center'}}>
                            <div className={styles.icon} style={{backgroundImage:'url(/profile.svg)'}}></div>
                            <div>Личный кабинет</div>
                        </a>
                    </Link>
                </div>
                
                <div className={styles.nav}>
                    <Link href='/'>
                        <a style={{display:'flex', alignItems:'center'}}>
                            <div className={styles.icon} style={{backgroundImage:'url(/callback.svg)'}}></div>
                            <div>Заказать звонок</div>
                        </a>
                    </Link>
                </div>

                <div className={styles.nav}>
                    <Link href='/'>
                        <a style={{display:'flex', alignItems:'center'}}>
                            <div className={styles.icon} style={{backgroundImage:'url(/shops.svg)'}}></div>
                            <div>Магазины</div>
                        </a>
                    </Link>
                </div>
                
                {pages.length ? pages.map((item, index) => {
                    if(item.in_the_sidebar && item.enabled){
                        return (
                            <div key={index} className={styles.nav}>
                                <Link href={`/infoPages/${item._id}`}>
                                    <a style={{display:'flex', alignItems:'center'}}>
                                        <div className={styles.icon}>
                                            <img src={item.card_image ? item.card_image.url : '/shops.svg'}/>
                                        </div>
                                        <div>{item.meta_title}</div>
                                    </a>
                                </Link>
                            </div>
                        )
                    }
                }) : ''}
                

            </div>

            <div className={styles.container}>
                <Link href='/'>
                    <a>
                        <p className={styles.userAgreement}>Политика конфеденциальности и пользовательского соглашения</p>
                    </a>
                </Link>

                <p className={styles.userAgreement}>          
                    © ООО “Пиро-Дон” 2021 г.
                </p>
            </div>

        </div>
    )
}
