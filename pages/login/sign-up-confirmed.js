import Head from '../../components/Head';
import Main from '../../components/Main';
import styles from '../../styles/Home.module.css';

import { useHttp } from '../../src/hooks/useHttp';
import config from '../../config';
import { useEffect } from 'react';
import {useRouter} from 'next/router';

export default function SignUpConfirmed(props) {
    const {request} = useHttp();
    const { query: { token } } = useRouter();


    const confirmedRegistration = async () => {
        try {
            const result = await request(`${config.serverAJAXurl}/register`, `POST`, {token: token,});
            console.log(result)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        confirmedRegistration();
    }, [])

    return (
        <div className={styles.container}>
            <Head title='Sign Up - Confirmed'/>
            <Main>
                Email-адрес был подтверждён
            </Main>
        </div>    
    )
}