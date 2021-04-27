import Header from '../../../components/admin/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../../server/api';
import styles from '../../../styles/admin/orders.module.css';
import formStyles from '../../../styles/admin/form.module.css';
import ContentContainer from '../../../components/admin/contentContainer';
import ProductCard from '../../../components/admin/orders/productCard';
import {
  Button,
  Chip,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from '@material-ui/core';
import FormDialog from '../../../components/admin/formDialog';

async function updateCustomerInfo(id, data) {
  const body = {
    email: data.email,
    mobile: data.mobile,
    shipping_address: data.shipping_address,
  };
  await api.orders.updateOrder(id, body);
}

async function getShippingMethods() {
  const result = await api.shippingMethods.getShippingMethods();
  if (result.status === 200) return result.data;
}

async function getPaymentMethods() {
  const result = await api.paymentMethods.getPaymentMethods();
  if (result.status === 200) return result.data;
}

function getMethodName(Methods, id) {
  let name;
  Methods.map(item => {
    if (item._id === id) name = item.name;
  });
  return name;
}

async function updateOrder(id, data, action) {
  const body = {
    status_id: data.status_id,
    note: data.note,
    date_paid: getDayFromString(data.date_paid).toISOString(),
    payment_method_id: data.payment_method_id,
    shipping_method_id: data.shipping_method_id,
  };
  const result = await api.orders.updateOrder(id, body);
  if (result.status === 200) action({ ...result.data });
}

const leftSideRender = (
  id,
  order,
  setOrder,
  handleChange,
  handleFlagChange,
  statuses,
  paymentMethods,
  shippingMethods,
) => {
  const status = statuses.find(item => item._id === order.status_id);
  let paid_date = null;
  if (order.date_paid) {
    paid_date = order.date_paid;

    if (order.date_paid.length > 10) {
      paid_date = paid_date.substr(0, 10);
    }
  }

  return (
    <div className={styles.infoContainer}>
      <div className={styles.orderInfo}>
        <span className={styles.field}>
          Дата оформления заказа: <span>{formateDate(order.date_placed)}</span>{' '}
        </span>
        <span className={styles.field}>
          Статус:{' '}
          {status ? (
            <Chip
              label={status.name}
              style={{
                width: 'max-content',
                color: `${status.color}`,
                background: `${status.bgcolor}`,
                marginLeft: 10,
              }}
            />
          ) : null}
        </span>
        <span className={styles.field}>
          Дата оплаты заказа: <span>{formateDate(order.date_paid)}</span>
        </span>
        <span className={styles.field}>
          Метод доставки: {getMethodName(shippingMethods, order.shipping_method_id)}{' '}
        </span>
        <span className={styles.field}>
          Метод оплаты: {getMethodName(paymentMethods, order.payment_method_id)}{' '}
        </span>
        <span className={styles.field}>
          Заметка: <span>{order.note}</span>
        </span>
        <FormDialog
          title={'Редактировать заказ'}
          fields={
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
              <TextField
                className={formStyles.formInput}
                type="text"
                id="note"
                label="Заметка"
                defaultValue={order.note}
                onChange={e => handleChange(e, 'note')}
              />
              <InputLabel className={formStyles.formInput} id="demo-mutiple-chip-label">
                Статус
              </InputLabel>
              <Select
                labelId="status-controller"
                id="status-controller"
                value={order.status_id}
                onChange={e => handleChange(e, 'status_id')}
                input={<Input id="statuses-controller" />}>
                {statuses.map(status => (
                  <MenuItem key={status.name} value={status._id}>
                    {status.name}
                  </MenuItem>
                ))}
              </Select>

              <InputLabel className={formStyles.formInput} id="payment-method-controller">
                Способ оплаты
              </InputLabel>
              <Select
                labelId="payment-method-controller"
                id="payment-method-controller"
                value={order.payment_method_id}
                onChange={e => handleChange(e, 'payment_method_id')}
                input={<Input id="payment-method-controller" />}>
                {paymentMethods.map(method => (
                  <MenuItem key={method.name} value={method._id}>
                    {method.name}
                  </MenuItem>
                ))}
              </Select>

              <InputLabel className={formStyles.formInput} id="shipping-method-controller">
                Способ доставки
              </InputLabel>
              <Select
                labelId="shipping-method-controller"
                id="shipping-method-controller"
                value={order.shipping_method_id}
                onChange={e => handleChange(e, 'shipping_method_id')}
                input={<Input id="shipping-method-controller" />}>
                {shippingMethods.map(method => (
                  <MenuItem key={method.name} value={method._id}>
                    {method.name}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                id="date"
                label="Дата оплаты заказа"
                type="date"
                defaultValue={paid_date}
                className={formStyles.formInput}
                onChange={e => handleChange(e, `date_paid`)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          }
          action={e => {
            updateOrder(id, order, setOrder);
          }}
        />
      </div>

      <span>Заказчик</span>
      <div className={styles.customerInfo}>
        {order.customer_id ? (
          <a style={{ color: '#3f51b5' }} href={`/admin/customers/${order.customer_id}`}>
            {order.email}
          </a>
        ) : (
          <span>{order.email}</span>
        )}
        <span className={styles.field}>{order.shipping_address.full_name}</span>
        <span className={styles.field}>{order.mobile}</span>
        <span className={styles.field}>
          Адрес доставки:{' '}
          <span>{`${order.shipping_address.state}, ${order.shipping_address.city}, ${order.shipping_address.address1}, ${order.shipping_address.postal_code}`}</span>
        </span>
        <FormDialog
          title={'Редактировать пользователя'}
          fields={
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
              <TextField
                type="email"
                id="email"
                label="Email-пользователя"
                defaultValue={order.email}
                onChange={e => {
                  handleChange(e, 'email');
                }}
              />
              <br />
              <TextField
                type="text"
                id="full_name"
                label="Имя пользователя"
                defaultValue={order.shipping_address.full_name}
                onChange={e => {
                  handleChange(e, 'shipping_address', 'full_name');
                }}
              />
              <br />
              <TextField
                type="mobile"
                id="mobile"
                label="Номер телефона"
                defaultValue={order.mobile}
                onChange={e => {
                  handleChange(e, 'mobile');
                }}
              />
              <br />
              <span>Адрес доставки:</span>
              <TextField
                type="text"
                id="state"
                label="Регион"
                defaultValue={order.shipping_address.state}
                onChange={e => {
                  handleChange(e, 'shipping_address', 'state');
                }}
              />
              <TextField
                type="text"
                id="city"
                label="Город"
                defaultValue={order.shipping_address.city}
                onChange={e => {
                  handleChange(e, 'shipping_address', 'city');
                }}
              />
              <TextField
                type="text"
                id="address1"
                label="Адрес"
                defaultValue={order.shipping_address.address1}
                onChange={e => {
                  handleChange(e, 'shipping_address', 'address1');
                }}
              />
              <TextField
                type="text"
                id="postal_code"
                label="Почтовый индекс"
                defaultValue={order.shipping_address.postal_code}
                onChange={e => {
                  handleChange(e, 'shipping_address', 'postal_code');
                }}
              />
            </div>
          }
          action={e => updateCustomerInfo(id, order)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControlLabel
          className={formStyles.formInput}
          control={
            <Switch
              checked={order.closed}
              onChange={e => handleFlagChange(e, 'closed')}
              name="closed"
              color="primary"
            />
          }
          label="Закрытый"
        />
        <FormControlLabel
          className={formStyles.formInput}
          control={
            <Switch
              checked={order.paid}
              onChange={e => handleFlagChange(e, 'paid')}
              name="paid"
              color="primary"
            />
          }
          label="Оплаченный"
        />
        <FormControlLabel
          className={formStyles.formInput}
          control={
            <Switch
              checked={order.cancelled}
              onChange={e => handleFlagChange(e, 'cancelled')}
              name="cancelled"
              color="primary"
            />
          }
          label="Отменённый"
        />
        <FormControlLabel
          className={formStyles.formInput}
          control={
            <Switch
              checked={order.delivered}
              onChange={e => handleFlagChange(e, 'delivered')}
              name="delivered"
              color="primary"
            />
          }
          label="Доставлен"
        />
        <FormControlLabel
          className={formStyles.formInput}
          control={
            <Switch
              checked={order.draft}
              onChange={e => handleFlagChange(e, 'draft')}
              name="draft"
              color="primary"
            />
          }
          label="Набирается"
        />
        <FormControlLabel
          className={formStyles.formInput}
          control={
            <Switch
              checked={order.hold}
              onChange={e => handleFlagChange(e, 'hold')}
              name="hold"
              color="primary"
            />
          }
          label="Заморожен"
        />
      </div>
    </div>
  );
};

const rightSideRender = (order, changeQuantity, updateQuantity, deleteItem) => {
  return (
    <div className={styles.infoContainer}>
      <div>
        {order.items.map((item, index) => {
          return (
            <ProductCard
              key={index}
              index={index}
              product={item}
              changeQuantity={changeQuantity}
              updateQuantity={updateQuantity}
              deleteItem={deleteItem}
            />
          );
        })}
      </div>

      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: 20 }}>
        <span>Сумма товаров: {getTotalCost(order)}</span>
        <span>Сумма доставки: {order.shipping_price}</span>
        <span>Итого: {getTotalCost(order) + order.shipping_price}</span>
      </div>
    </div>
  );
};

async function getOrder(id) {
  const result = await api.orders.getOrderById(id);
  if (result.status === 200) return result.data;
}

function getTotalCost(order) {
  let cost = 0;
  order.items.map(item => {
    cost += item.price_total;
  });
  return cost;
}

async function getStatuses() {
  const result = await api.orderStatuses.getOrderStatuses();
  if (result.status === 200) {
    return result.data;
  }
}

function formateDate(date) {
  const result = new Date(date);
  return `${result.getDate()}.${result.getMonth() + 1}.${result.getFullYear()}`;
}

function getDayFromString(string) {
  let stringArray = string.split('-');
  let date = new Date();
  date.setFullYear(stringArray[0]);
  date.setMonth(stringArray[1] - 1);
  date.setDate(stringArray[2]);
  console.log(date);
  return date;
}

export default function Order() {
  const [order, setOrder] = useState();
  const [statuses, setStatuses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    setOrder(await getOrder(id));
    setStatuses(await getStatuses());
    setPaymentMethods(await getPaymentMethods());
    setShippingMethods(await getShippingMethods());
  }, [id]);

  const handleChange = (event, key, secondKey) => {
    setOrder(prevstate => {
      if (secondKey) prevstate[key][secondKey] = event.target.value;
      else prevstate[key] = event.target.value || event.target.checked;
      return { ...prevstate };
    });
  };

  const handleFlagChange = async (event, key) => {
    setOrder(prevstate => {
      prevstate[key] = event.target.checked;
      return { ...prevstate };
    });
    const body = {
      cancelled: order.cancelled,
      paid: order.paid,
      hold: order.hold,
      draft: order.draft,
      delivered: order.delivered,
      closed: order.closed,
    };
    await api.orders.updateOrder(id, body);
  };

  const changeQuantity = (event, index) => {
    setOrder(prevstate => {
      prevstate.items[index].quantity = event.target.value;
      prevstate.items[index].price_total = event.target.value * prevstate.items[index].price;
      return { ...prevstate };
    });
  };

  const updateQuantity = async index => {
    const item = order.items[index];
    const body = {
      quantity: item.quantity,
    };
    await api.orders.updateItem(id, item._id, body);
  };

  const deleteItem = async (itemId, index) => {
    setOrder(prevstate => {
      prevstate.items.splice(index, 1);
      return { ...prevstate };
    });
    await api.orders.deleteItem(id, itemId);
  };

  return (
    <div>
      <Header pageName={`Редактирование заказа ${order ? order.number : ''}`} backButton={true} />
      {order ? (
        <div>
          <ContentContainer
            left={leftSideRender(
              id,
              order,
              setOrder,
              handleChange,
              handleFlagChange,
              statuses,
              paymentMethods,
              shippingMethods,
            )}
            right={rightSideRender(order, setOrder, changeQuantity, updateQuantity, deleteItem)}
          />
        </div>
      ) : (
        <div>Заказ не найден</div>
      )}
    </div>
  );
}
