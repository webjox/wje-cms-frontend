import { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styles from '../../styles/login/accaunt.module.css';
import { Order } from '../../components/Order';

import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Basket from '../../components/Basket';

import globalContext from '../../src/state/globalStateContext/context';

export default function Account() {
  const { state } = useContext(globalContext);

  const [user, setUser] = useState({});

  const [fullName, setFullName] = useState('');

  useEffect(() => {
    setUser(state.userData);
    if (state.userData.token) {
      setFullName(state.userData.customer_settings.full_name);
    }
  }, []);

  useEffect(() => {
    if (!state.userData.token) {
      Router.push('/login');
    }
  }, []);

  if (user.token) {
    return (
      <div className={styles.accaunt}>
        <Head title="Личный кабинет" />
        <NavBar />
        <div className={styles.mainWindow}>
          <div className={styles.header}>
            <Link href="/login/profile">
              <a>
                <div className={styles.titleContainer}>
                  {state.userData.customer_settings.first_name.length ||
                  state.userData.customer_settings.last_name.length ? (
                    <h1 className={styles.title}>{fullName}</h1>
                  ) : (
                    <h1 className={styles.title}>Укажите имя</h1>
                  )}
                  <button className={styles.edit}>
                    <img src="/pencil.svg" />
                  </button>
                </div>
              </a>
            </Link>

            {user.customer_settings.wholesaler ? (
              <button className={styles.wholesale}>
                <img src="/opt.svg" />
                Опт
              </button>
            ) : (
              ''
            )}
          </div>
          <div className={styles.historyBlock}>
            <h2 className={styles.subtitle}>История покупок</h2>
            <Order />
            <Order />
            <Order />
          </div>
        </div>
        <Basket />
      </div>
    );
  } 
    return <div />;
  
}
