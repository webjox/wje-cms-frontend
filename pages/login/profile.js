import React from 'react';
import styles from '../../styles/login/profile.module.css';
import Link from "next/link";

export default function profile() {


    return(
        <div className={styles.profile}>
            <div className={styles.mainWindow}>
                <div className={styles.header}>
                    <div className={styles.titleContainer}>
                        <Link href={'/profile'}><h1 className={styles.title}>Иванов Иван Иванович</h1></Link>
                        <button className={styles.edit}><img src={'/pencil.svg'}></img></button>
                    </div>
                    <button className={styles.wholesale}><img src={'/opt.svg'}/>Опт</button>
                </div>
                <div className={styles.block}>
                    <h2 className={styles.subtitle}>Основные данные</h2>
                    <div className={styles.fields}>
                        <label className={styles.field}>
                            ФИО или название организации<br/>
                            <input type={'text'}/>
                        </label>
                        <label className={styles.field}>
                            Новый пароль<br/>
                            <input type={'text'}/>
                        </label>
                        <label className={styles.field}>
                            Телефон<br/>
                            <input type={'text'}/>
                        </label>
                        <label className={styles.field}>
                            Электропочта<br/>
                            <input type={'text'}/>
                        </label>
                    </div>
                </div>
                <div className={styles.block}>
                    <h2 className={styles.subtitle}>Банковские реквизиты</h2>
                    <div className={styles.fields}>
                        <label className={styles.field}>
                            ИНН<br/>
                            <input type={'text'}/>
                        </label>
                        <label className={styles.field}>
                            ОГРН<br/>
                            <input type={'text'}/>
                        </label>
                        <label className={styles.field}>
                            БИК<br/>
                            <input type={'text'}/>
                        </label>
                        <label className={styles.field}>
                            Наименоваие Банка<br/>
                            <input type={'text'}/>
                        </label>
                        <label className={styles.field}>
                            К/С<br/>
                            <input type={'text'}/>
                        </label>
                        <label className={styles.field}>
                            Р/С<br/>
                            <input type={'text'}/>
                        </label>
                    </div>
                </div>
                <div className={styles.block}>
                    <h2 className={styles.subtitle}>Адреса</h2>
                    <div className={styles.fields}>
                        <label className={styles.field}>
                            Юридический<br/>
                            <input type={'text'} placeholder='Город'/>
                            <input type={'text'} placeholder='Улица'/>
                            <div className={styles.min}>
                                <input type={'text'} placeholder='Дом'/>
                                <input type={'text'} placeholder='Офис'/>
                            </div>
                        </label>
                        <label className={styles.field}>
                            Фактический<br/>
                            <input type={'text'} placeholder='Город'/>
                            <input type={'text'} placeholder='Улица'/>
                            <div className={styles.min}>
                                <input type={'text'} placeholder='Дом'/>
                                <input type={'text'} placeholder='Офис'/>
                            </div>
                        </label>
                    </div>
                </div>
                <Link href={'/accaunt'}><button className={styles.send}>Войти</button></Link>
            </div>
        </div>
    );
};
