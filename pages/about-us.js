import Main from '../components/Main';

import styles from '../styles/Home.module.css';
import globalState from '../src/state/globalStateContext/context';
import { useContext } from 'react';

import Head from '../components/Head';

export default function aboutus() {
  const { state } = useContext(globalState);
  return (
    <div className={styles.container}>
      <Head title="About us" />
      <Main>Информация о нашей компании {state.userData.email || 'не авторизован'}</Main>
    </div>
  );
}
