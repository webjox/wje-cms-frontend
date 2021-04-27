import React, { useEffect, useContext, useState } from 'react';
import Router from 'next/router';
import styles from '../../styles/login/profile.module.css';

import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Basket from '../../components/Basket';

import globalContext from '../../src/state/globalStateContext/context';

export default function profile() {
  const { state } = useContext(globalContext);

  const [user, setUser] = useState({});

  const [fullName, setFullName] = useState('');

  const [requestData, setRequestData] = useState({});

  const handleChange = (event, key, secondKey) => {
    setRequestData(prevstate => {
        const result = prevstate;
        if(secondKey) result[key][secondKey] = event.target.value;
        else result[key] = event.target.value || event.target.checked;
        return {...result};
    });
  };

  const submit = async () => {
    const putData = {
      token: user.token,
      email: requestData.email || null,
      mobile: requestData.mobile || null,
      password: requestData.password || null,
      full_name: requestData.full_name || null,
      wholesaler_settings: requestData.wholesaler_settings || null
    };
    await state.putUserData(putData);
  };

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
      <div className={styles.profile}>
        <Head title="Профиль" />
        <NavBar />
        <div className={styles.mainWindow}>
          <div className={styles.header}>
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
            {user.customer_settings.wholesaler ? (
              <button className={styles.wholesale}>
                <img src="/opt.svg" />
                Опт
              </button>
            ) : (
              ''
            )}
          </div>
          <div className={styles.block}>
            <h2 className={styles.subtitle}>Основные данные</h2>
            <div className={styles.fields}>
              <label className={styles.field}>
                ФИО или название организации
                <br />
                <input
                  type="text"
                  value={requestData.full_name}
                  onChange={e => {
                    handleChange(e, "full_name");
                  }}
                />
              </label>
              <label className={styles.field}>
                Новый пароль
                <br />
                <input
                  type="password"
                  value={requestData.password}
                  onChange={e => {
                    handleChange(e, 'password');
                  }}
                />
              </label>
              <label className={styles.field}>
                Телефон
                <br />
                <input
                  type="text"
                  value={requestData.mobile}
                  onChange={e => {
                    handleChange(e, 'mobile');
                  }}
                />
              </label>
              <label className={styles.field}>
                Электронная почта
                <br />
                <input
                  type="text"
                  value={requestData.email}
                  onChange={e => {
                    handleChange(e, 'email');
                  }}
                />
              </label>
            </div>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subtitle}>Банковские реквизиты</h2>
            <div className={styles.fields}>
              <label className={styles.field}>
                ИНН
                <br />
                <input
                  type="text"
                  value={requestData.wholesaler_settings ? requestData.wholesaler_settings.itn : null}
                  onChange={e => {
                    handleChange(e, 'wholesaler_settings','itn');
                  }}
                />
              </label>
              <label className={styles.field}>
                ОГРН
                <br />
                <input
                  type="text"
                  value={requestData.wholesaler_settings ? requestData.wholesaler_settings.psrn : null}
                  onChange={e => {
                    handleChange(e, 'wholesaler_settings','psrn');
                  }}
                />
              </label>
              <label className={styles.field}>
                БИК
                <br />
                <input
                  type="text"
                  value={requestData.wholesaler_settings ? requestData.wholesaler_settings.bic : null}
                  onChange={e => {
                    handleChange(e, 'wholesaler_settings','bic');
                  }}
                />
              </label>
              <label className={styles.field}>
                Наименоваие Банка
                <br />
                <input
                  type="text"
                  value={requestData.wholesaler_settings ? requestData.wholesaler_settings.bankName : null}
                  onChange={e => {
                    handleChange(e, 'wholesaler_settings','bankName');
                  }}
                />
              </label>
              <label className={styles.field}>
                К/С
                <br />
                <input
                  type="text"
                  value={requestData.wholesaler_settings ? requestData.wholesaler_settings.correspondingAccount : null}
                  onChange={e => {
                    handleChange(e, 'wholesaler_settings','correspondingAccount');
                  }}
                />
              </label>
              <label className={styles.field}>
                Р/С
                <br />
                <input
                  type="text"
                  value={requestData.wholesaler_settings ? requestData.wholesaler_settings.currentAccount : null}
                  onChange={e => {
                    handleChange(e, 'wholesaler_settings','currentAccount');
                  }}
                />
              </label>
            </div>
          </div>
          <div className={styles.block}>
            <h2 className={styles.subtitle}>Адреса</h2>
            <div className={styles.fields}>
              <label className={styles.field}>
                Юридический Адрес
                <br />
                <input
                  type="text"
                  value={requestData.wholesaler_settings ? requestData.wholesaler_settings.legalAddress : null}
                  onChange={e => {
                    handleChange(e, 'wholesaler_settings','legalAddress');
                  }}
                />
              </label>
              <label className={styles.field}>
                Фактический Адрес
                <br />
                <input
                  type="text"
                  value={requestData.wholesaler_settings ? requestData.wholesaler_settings.actualAddress : null}
                  onChange={e => {
                    handleChange(e, 'wholesaler_settings','actualAddress');
                  }}
                />
              </label>
            </div>
          </div>
          <button onClick={submit} className={styles.send}>
            Сохранить
          </button>
        </div>
        <Basket />
      </div>
    );
  } return <div />;
}
