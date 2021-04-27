import { Checkbox, ListItem } from '@material-ui/core';
import mainStyles from '../../../../styles/admin/table.module.css';
import styles from '../../../../styles/admin/customersList.module.css';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

export default function CustomersList({ userData }) {
  const renderColumns = () => {
    const columns = ['', 'email', 'Имя', 'Всего потрачено', 'Заказы'];
    return columns.map((item, index) => {
      if (index > 0) {
        return <span className={mainStyles.listItem}>{item}</span>;
      } else return <Checkbox className={mainStyles.listItem} />;
    });
  };

  const renderItems = userData.map((item, index) => {
    return (
      <ListItem key={index}>
        <Checkbox className={mainStyles.listItem} />
        <span className={mainStyles.listItem}>{item.email}</span>
        <span className={mainStyles.listItem}>{item.full_name}</span>
        <span className={mainStyles.listItem}>{item.total_spent}</span>
        <span className={mainStyles.listItem}>{item.orders_count}</span>
        <div style={{ cursor: 'pointer' }}>
          <Link href={`/admin/customers/${item._id}`}>
            <EditIcon />
          </Link>
        </div>
      </ListItem>
    );
  });

  return (
    <div>
      <div className={mainStyles.headerContainer}>
        <ListItem>{renderColumns()}</ListItem>
      </div>
      {renderItems}
    </div>
  );
}
