import {React, useState, useContext} from 'react';

import Tooltip from '@material-ui/core/Tooltip';

import Link from "next/link";
import styles from "../../styles/login/register.module.css";
import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Basket from '../../components/Basket';

import globalContext from '../../src/state/globalStateContext/context';

export default function register() {
    const {state} = useContext(globalContext);

    const [pers, setPers] = useState(false);
    const [persValid, setPersValid] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [result, setResult] = useState(0);
    const [error, setError] = useState(0);
 

    const persHandler = (evt) => {
        const target = evt.target;
        const value = target.checked;
        setPers(value)
    };

    const changeEmail = (evt) => {
        const target = evt.target;
        const value = target.value;
        setEmail(value)
    };
    const changePassword = (evt) => {
        const target = evt.target;
        const value = target.value;
        setPassword(value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = document.forms[1];
        if(!/@/g.test(email)){
            setValidEmail(true);
            return;
        }
        else{ 
            setValidEmail(false);
        }
        if(!/.{4,20}/g.test(password)){
            setValidPassword(true);
            return;
        }
        else{ 
            setValidPassword(false);
        }
        if(!form.persData.checked){
            setPersValid(true);
            return;
        }
        else{
            setPersValid(false);
        }
            const data = {
                email:    new FormData(form).get('email'),
                password: new FormData(form).get('password')
            }
            const request = await state.registerUser(data);
            console.log(request)
            if(request.data.status) setResult(1);
            else {
                setError(1);
                setTimeout(() => {setError(0)}, 3000);
            };
    }

    switch(result){
        case 0 : return (
            <div className={styles.register}>
            <Head title="Регистрация"/>

            <div className={styles.requestMessage} style={error ? {transform: 'scale(1) translate(-50%, -50%)'} : {transform: 'scale(0) translate(-50%, -50%)'}}>
                На данную почту аккаунт уже зарегистрирован
            </div>

            <NavBar/>
            <form onSubmit={handleSubmit} >
                <div className={styles.form}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>Регистрация</h1>
                    </div>
                    
                    <Tooltip open={validEmail} disableHoverListener title="Введите, пожалуйста, почту">
                        <input name='email' onChange={changeEmail} className={styles.input} placeholder={"Электронная почта"}/>
                    </Tooltip>

                    <Tooltip open={validPassword} disableHoverListener title="Введите, пожалуйста, пароль">
                        <input className={styles.input} onChange={changePassword} name='password' type='password' placeholder={"Пароль"}/>
                    </Tooltip>
                    <div className={styles.persData}>
                        <Tooltip open={persValid} disableHoverListener title="Поставьте, пожалуйста, чекбокс">
                            <input className={styles.check} value={pers} onChange={persHandler} name="persData" type="checkbox"/>
                        </Tooltip>
                        <p>Я согласен с политикой<br/> конфеденциальности</p>
                    </div>
                    <button type="submit" className={styles.send} onClick={handleSubmit}>регистрация</button>
                </div>
            </form>
            <Basket/>
            </div>
        );
        case 1 : return (
            <div className={styles.register}>
            <Head title="Регистрация успешна!"/>
            <NavBar/>
                <div className={styles.registerSuccesWrapper}>
                    <div className={styles.registerSuccesMessage}>
                        На вашу почту было направлено письмо для подтверждения регистрации
                    </div>

                    <Link href='/'>
                        <a>
                            <div className={styles.registerSuccesBtn}>
                                Перейти на главную
                            </div>
                        </a>
                    </Link>
                </div>
            <Basket/>
            </div>
        );
    }
  
}
