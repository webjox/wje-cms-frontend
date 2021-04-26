import styles from '../../../styles/admin/selectList.module.css';
import LockIcon from '@material-ui/icons/Lock';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Link from 'next/link';

export default function PagesList({pagesData}) {

    const renderCards = () => {
        return pagesData.map((item, index) => {
            return (
                <Link href={`/admin/pages/${item._id}`}>
                <div key={index} className={styles.item}>
                    <div className={styles.itemName}>
                    {item.is_system ? <LockIcon /> : ""}
                     <span>{item.meta_title}</span>
                     </div>
                    <ChevronRightIcon />
                </div>
                </Link>
            )
        })
    }

    return (
        <div className="container">
            <div className={styles.itemContainer}>
           {renderCards()}
           </div>
        </div>
    )
}