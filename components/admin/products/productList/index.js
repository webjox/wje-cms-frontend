import { Checkbox, ListItem } from '@material-ui/core';
import mainStyles from '../../../../styles/admin/table.module.css';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import api from '../../../../server/api';

function getProductQuantity(product) {
  let quantity = 0;
  product.shops.map(item => {
    quantity += parseInt(item.quantity);
  });
  return quantity;
}

export default function ProductList({ productData }) {
  const renderColumns = () => {
    const columns = ['', 'Название товара', 'Артикул', 'Количество', 'Цена'];
    return columns.map((item, index) => {
      if (index > 0) {
        return <span className={mainStyles.listItem}>{item}</span>;
      } else return <Checkbox className={mainStyles.listItem} />;
    });
  };

  const renderItems = productData.map((item, index) => {
    return (
      <ListItem key={index}>
        <Checkbox className={mainStyles.listItem} />
        <span className={mainStyles.listItem}>{item.name || 'none'}</span>
        <span className={mainStyles.listItem}>{item.sku || 'none'}</span>
        <span className={mainStyles.listItem}>{getProductQuantity(item)}</span>
        <span className={mainStyles.listItem}>{item.price}</span>
        <div style={{ cursor: 'pointer' }}>
          <Link href={`/admin/products/${item._id}`}>
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
