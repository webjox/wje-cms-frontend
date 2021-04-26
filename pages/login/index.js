import {useState, useContext, useEffect} from 'react';
import {useRouter} from 'next/router';
import config from '../../config';

import Link from "next/link";
import styles from '../../styles/login/login.module.css';

import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Basket from '../../components/Basket';

import { useHttp } from '../../src/hooks/useHttp';

import globalContext from '../../src/state/globalStateContext/context';

export default function index() {
    const {state} = useContext(globalContext);

    const router = useRouter();
    const {request} = useHttp();

    const [error, setError] = useState(false);
    const [result, setResult] = useState(0);

    const confirmedRegistration = async (event) => {
        const req = await request(`${config.serverAJAXurl}/register`, `POST`, {token: router.query.token,});
        if(req.data.status){
            setResult(3)
            setTimeout(() => {setResult(0)},3000)
        }
        else{
            setResult(4)
            setTimeout(() => {setResult(0)},3000)
        }
    }

    useEffect(async () => {
        if(router.query.token) await confirmedRegistration()
    }, [router])
    
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        const form = document.forms[1];  
        const data = {
            email: new FormData(form).get('email'),
            password: new FormData(form).get('password')
        }
        const res = await state.loginUser(data);
        if(await res.token){
            const userData = await state.getUserData(res.token);
            setResult(1)
            state.setUserData(userData)
        }
        else {
            setResult(2)
            setTimeout(() => {setResult(0)},3000)
        }
    }

    useEffect(() => {
        if(result === 1){
            router.push('login/accaunt')
        }
    } , [result])


    return(
        <div className={styles.login}>
            <Head title='Авторизация'/>

            <div className={styles.requestMessage} style={result === 2 || result === 3 || result === 4 ? {transform: 'scale(1) translate(-50%, -50%)'} : {transform: 'scale(0) translate(-50%, -50%)'}}>
                {result === 2 ? 'Вы ввели неверный логин или пароль' : result === 3 ? 'Почта успешно подтвержена' : 'Что то произошло не так :('}
            </div>

            <NavBar/>

            <form onSubmit={handleSubmit}>
                <div className={styles.form}>
                    <h1 className={styles.title}>Личный кабинет</h1>
                    <input name='email' className={styles.input} placeholder={"Электронная почта"}/>
                    <input name='password' type='password' className={styles.input} placeholder={"Пароль"}/>
                    <Link href={'/password-forget'}>
                        <p className={styles.text}>Я не помню пароль</p>
                    </Link>
                    <button type="submit" onClick={handleSubmit} className={styles.send}>Войти</button>
                </div>
                <div className={styles.edit}>
                    <Link href={'/#'}>
                        <p className={styles.text}>У меня еще нет учетной записи</p>
                    </Link>
                    <Link href={'/login/register'}>
                        <p className={styles.text}>зарегистрироваться</p>
                    </Link>
                </div>
            </form>

            <Basket/>
        </div>
    );
};
