import styles from '../../../styles/admin/ordersProductCard.module.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormDialog from '../formDialog';
import { Button, Popover, TextField } from '@material-ui/core';
import api from '../../../server/api';
import { useEffect, useState } from 'react';

async function getProductImage(id) {
  const result = await api.products.getProductImages(id);
  if (result.status === 200) return result.data;
}

export default function ProductCard({
  product,
  index,
  changeQuantity,
  updateQuantity,
  deleteItem,
}) {
  const [productImage, setProductImage] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(async () => {
    const imageObject = await getProductImage(product._id);
    setProductImage(imageObject.url);
  }, [product]);

  return (
    <div className={styles.ProductCard}>
      <img height="100%" src={productImage ? productImage : ''} />
      <div className={styles.productName}>
        <span>{product.name}</span>
        <span>SKU: {product.sku}</span>
      </div>

      <div className={styles.priceContainer}>
        <span>₽{product.price}</span>
        <span>x{product.quantity}</span>

        <span>₽{product.price_total}</span>

        <span style={{ cursor: 'pointer' }} onClick={handleClick}>
          <MoreVertIcon />
        </span>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <FormDialog
              title="Изменить количество товара"
              fields={
                <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
                  <TextField
                    type="number"
                    id="quantity"
                    label="quantity"
                    defaultValue={product.quantity}
                    onChange={e => changeQuantity(e, index)}
                  />
                </div>
              }
              action={e => updateQuantity(index)}
            />
            <Button onClick={e => deleteItem(product._id, index)} color="secondary">
              Удалить товар
            </Button>
          </div>
        </Popover>
      </div>
    </div>
  );
}
