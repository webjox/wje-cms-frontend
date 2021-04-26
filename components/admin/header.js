import SideBar from "./sidebar";
import styles from '../../styles/admin/header.module.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useRouter} from 'next/router';

export default function Header(props) {
    const router = useRouter();

    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerBar}>
            {props.backButton ? <div className={styles.backButton} onClick={e => {router.back()}}><ArrowBackIcon /></div> : <SideBar />}
            <span>{props.pageName}</span>
            </div>
        </div>
    )
}