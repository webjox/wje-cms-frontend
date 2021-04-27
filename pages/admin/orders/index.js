import { useEffect, useState } from 'react';
import ContentContainer from '../../../components/admin/contentContainer';
import Header from '../../../components/admin/header';
import ControllerMenu from '../../../components/admin/orders/controllerMenu';
import OrdersList from '../../../components/admin/orders/ordersList';
import api from '../../../server/api';

async function getOrders(filter) {
  const result = await api.orders.getOrders(filter);
  if (result.status === 200) return result.data;
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({
    draft: false,
    offset: 0,
    limit: 20,
  });

  useEffect(async () => {
    const result = await getOrders(filter);
    setOrders([...result.data]);
  }, [filter]);

  const handleFilters = (event, key) => {
    setFilter(prevstate => {
      prevstate[key] = event.target.value || event.target.checked;
      return { ...prevstate };
    });
  };

  const handlePage = page => {
    setFilter(prevstate => {
      prevstate.offset = page * 20;
      return { ...prevstate };
    });
  };

  return (
    <div>
      <Header pageName={'Заказы'} />
      <div>
        <ContentContainer
          left={<ControllerMenu filters={filter} handleFilters={handleFilters} />}
          right={<OrdersList ordersData={orders} handlePage={handlePage} />}
        />
      </div>
    </div>
  );
}
