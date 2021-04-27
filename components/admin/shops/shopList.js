import styles from '../../../styles/admin/selectList.module.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Link from 'next/link';

export default function ShopsList({ shopsData }) {
  const renderCards = () => {
    return shopsData.map((item, index) => {
      return (
        <Link href={`/admin/shops/${item._id}`}>
          <div key={index} className={styles.item}>
            <div className={styles.itemName}>
              {item.is_system ? <LockIcon /> : ''}
              <span>{item.name}</span>
            </div>
            <ChevronRightIcon />
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="container">
      <div className={styles.itemContainer}>{renderCards()}</div>
    </div>
  );
}
