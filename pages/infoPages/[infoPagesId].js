import { useRouter } from 'next/router';
import {useContext, useEffect, useState} from 'react';
import globalContext from '../../src/state/globalStateContext/context';

import Head from '../../components/Head'; 
import NavBar from '../../components/NavBar';
import Main from '../../components/Main';
import Basket from '../../components/Basket';

import styles from '../../styles/infoPages.module.css';

export default function InfoPagesId() {
    const router = useRouter()
    const { infoPagesId } = router.query;

    const {state} = useContext(globalContext);
    const [page, setPage] = useState(null);

    useEffect(async () => {
        if(infoPagesId){
            setPage(await state.getPageById(infoPagesId));
        } 
    } , [infoPagesId])

    if(page){
        
        function parseHTML() {
            return {__html: page.content};
        }
        function Content() {
            return <div dangerouslySetInnerHTML={{__html: page.content}} />;
        }
    
        return (
            <div className={styles.wrapper}>
                <Head title={page.meta_title}/>
                <NavBar/>
                    <Main>
                        <div className={styles.contentWrapper}>
                            <Content/>
                        </div>
                    </Main>
                <Basket/>
            </div>
        )
    }
    else{
        return (
            <div className={styles.wrapper}>
                <Head title='Информационная страница'/>
                <NavBar/>
                    <Main>
                        Загрузка...
                    </Main>
                <Basket/>
            </div>
        )
    }
    
}
