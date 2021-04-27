import { AddCircle } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import Header from '../../../components/admin/header';
import api from '../../../server/api';
import ShopsList from '../../../components/admin/shops/shopList';

async function getShops() {
  const result = await api.shops.getShop();
  if (result.status === 200) {
    return result.data;
  }
}

async function addShop(action) {
  await api.shops.addShop();
  const updatedData = await getShops();
  action(updatedData);
}

export default function Shops() {
  const [shops, setShops] = useState([]);

  useEffect(async () => {
    setShops(await getShops());
  }, []);

  return (
    <div>
      <Header pageName={'Магазины'} />
      <div>
        <ShopsList shopsData={shops} />{' '}
      </div>
      <div
        onClick={e => addShop(setShops)}
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer', marginTop: 10 }}>
        <AddCircle color="primary" style={{ fontSize: 48 }} />
      </div>
    </div>
  );
}
