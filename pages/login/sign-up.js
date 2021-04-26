import Head from '../../components/Head';
import Main from '../../components/Main';

import styles from '../../styles/Home.module.css';
import { useHttp } from '../../src/hooks/useHttp';
import { useState } from 'react';
import config from '../../config';

export default function SignUp() {
    const {request, loading} = useHttp();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [registerStatus, setRegisterStatus] = useState(false);

    const signUp = async () => {
        try {
            const userData = await request(`${config.serverAJAXurl}/register`, `POST`, {
                email: email,
                password: password
            });
            if(userData.status === true) {
                setRegisterStatus(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <Head title='Sign Up'/>
            <Main>
                {registerStatus === true ? <div><span>Для окончания регистрации подтвердите её с помощью письма, которое было отправлено на ваш email-адрес {email}</span></div>
                :
                <div>
                <h3>Зарегистрироваться</h3>
                <form>
                    <div>
                        <input type='email' placeholder='Enter your email' getValue={setEmail} />
                        <input type='password' placeholder='Input password' getValue={setPassword} />
                        <button type='button' onClick={signUp}>Sign Up</button>
                    </div>
                </form>
                </div>
                }
            </Main>
        </div>
    )
}
