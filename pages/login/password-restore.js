import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Basket from '../../components/Basket';
import Main from '../../components/Main';

import styles from '../../styles/Home.module.css';

export default function passwordRestore() {
  return (
    <div className={styles.container}>
      <Head title="Password restore" />
      <NavBar />
      <Main>
        <h3>Введите новый пароль</h3>
        <form>
          <div>
            <input type="password" placeholder="Введите новый пароль" />
            <input type="password" placeholder="Повторите пароль" />
            <input type="submit" value="Восстановить" />
          </div>
        </form>
      </Main>
      <Basket />
    </div>
  );
}
