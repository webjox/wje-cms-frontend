import { Checkbox, ListItem } from '@material-ui/core';
import mainStyles from '../../../styles/admin/table.module.css';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

export default function PaymentMethodsList({ methodsData = [] }) {
  const renderColumns = () => {
    const columns = ['', 'Название', 'Онлайн'];
    return columns.map((item, index) => {
      if (index > 0) {
        return <span className={mainStyles.listItem}>{item}</span>;
      } else
        return (
          <span>
            <Checkbox className={mainStyles.listItem} />
          </span>
        );
    });
  };

  const renderItems = methodsData.map((item, index) => {
    return (
      <ListItem key={index}>
        <Checkbox className={mainStyles.listItem} />
        <span className={mainStyles.listItem}>{item.name}</span>
        <span className={mainStyles.listItem}>{item.online_payment.toString()}</span>
        <div style={{ cursor: 'pointer' }}>
          <Link href={`/admin/orders/paymentMethods/${item._id}`}>
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
