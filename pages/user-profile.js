import Main from '../components/Main';

import { useContext } from 'react';
import globalState from '../src/state/globalStateContext/context';
import styles from '../styles/user-profile.module.css';
import router from 'next/router';

import Head from '../components/Head';

export default function UserProfile() {
  const { state } = useContext(globalState);
  const userData = state.userData;

  const redirectToMain = () => {
    router.push('/');
  };

  return (
    <Main>
      <div className="container">
        <span className={styles.title}>Welcome {userData.full_name}</span>

        <div className={styles.dataContainer}>
          <div className={styles.personalData}>
            <span className={styles.infoTitle}>Персональная информация</span>
            <span className={styles.infoRow}>
              Дата регистрации: <span style={{ color: '#1d1d1d' }}>{userData.createdAt}</span>{' '}
            </span>
            <span className={styles.infoRow}>
              Имя: <span style={{ color: '#1d1d1d' }}>{userData.first_name}</span>{' '}
            </span>
            <span className={styles.infoRow}>
              Фамилия: <span style={{ color: '#1d1d1d' }}>{userData.last_name}</span>{' '}
            </span>
            <span className={styles.infoRow}>
              Email: <span style={{ color: '#1d1d1d' }}>{userData.email}</span>{' '}
            </span>
          </div>

          <div className={styles.billingData}>
            <span className={styles.infoTitle}>Адрес покупателя</span>
            <span className={styles.infoRow}>Адрес: </span>
            <span className={styles.infoRow}>Адрес (дополнительно): </span>
            <span className={styles.infoRow}>Город: </span>
            <span className={styles.infoRow}>Почтовый индекс: </span>
            <span className={styles.infoRow}>Область: </span>
          </div>

          <div className={styles.shippingData}>
            <span className={styles.infoTitle}>Адрес доставки</span>
            <span className={styles.infoRow}>Адрес: </span>
            <span className={styles.infoRow}>Адрес (дополнительно): </span>
            <span className={styles.infoRow}>Город: </span>
            <span className={styles.infoRow}>Почтовый индекс: </span>
            <span className={styles.infoRow}>Область: </span>
          </div>
        </div>

        <div className={styles.dataContainer}>
          <button>Редактировать</button>
          <button>Продолжить покупки</button>
        </div>
      </div>
    </Main>
  );
}
