import Link from 'next/link';

import Head from '../../components/Head';
import NavBar from '../../components/NavBar';
import Basket from '../../components/Basket';
import Main from '../../components/Main';

import styles from '../../styles/Home.module.css';

export default function passwordForget() {
  return (
    <div className={styles.container}>
      <Head title="Password forget" />
      <NavBar />
      <Main>
        <h3> Забыли пароль?</h3>
        <br />
        <form>
          <div>
            <input type="text" placeholder="Логин" />
            <Link href="/login/password-restore">
              <input type="submit" value="Восстановить" />
            </Link>
          </div>
        </form>
      </Main>
      <Basket />
    </div>
  );
}
