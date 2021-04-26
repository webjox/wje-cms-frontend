import {useContext} from 'react';
import Link from "next/link";
import styles from '../../styles/login/accaunt.module.css';
import {Order} from "../../components/Order";

import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Basket from '../../components/Basket';

import globalContext from '../../src/state/globalStateContext/context';

export default function accaunt() {
    const {state} = useContext(globalContext);

    console.log(state.userData)
    return(
        <div className={styles.accaunt}>
            <Head title='Личный кабинет'/>
            <NavBar/>
            <div className={styles.mainWindow}>
                <div className={styles.header}>
                    
                    <Link href={'/login/profile'}>
                        <a>
                            <div className={styles.titleContainer}>
                                <h1 className={styles.title}>Измените имя</h1>
                                <button className={styles.edit}><img src={'/pencil.svg'}></img></button>
                            </div>
                        </a>
                    </Link>
                    
                    <Link href={'/zakaz1'}><button className={styles.wholesale}><img src={'/opt.svg'}/>Опт</button></Link>
                </div>
                <div className={styles.historyBlock}>
                    <h2 className={styles.subtitle}>История покупок</h2>
                    <Order/>
                    <Order/>
                    <Order/>
                </div>
            </div>
            <Basket/>
        </div>
    );
}
