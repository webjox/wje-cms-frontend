import { useEffect, useState } from 'react';
import Header from '../../../../components/admin/header';
import api from '../../../../server/api';
import { useRouter } from 'next/router';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import StatusesList from '../../../../components/admin/orders/statusesList';

async function getStatuses() {
  const result = await api.orderStatuses.getOrderStatuses();
  if (result.status === 200) return result.data;
}

export default function ProductCategories() {
  const [statuses, setStatusesData] = useState([]);

  useEffect(async () => {
    setStatusesData(await getStatuses());
  }, []);

  const addStatus = async () => {
    const body = {
      name: 'Default name',
    };
    const result = await api.orderStatuses.addOrderStatuses(body);
    if (result.status === 200) {
      setStatusesData(prevstate => {
        prevstate.push(result.data);
        return [...prevstate];
      });
    }
  };

  return (
    <div>
      <Header pageName={`Список статусов`} backButton={true} />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StatusesList statusesData={statuses} />
      </div>
      <div
        onClick={e => {
          addStatus();
        }}
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
        <AddCircleIcon color="primary" style={{ fontSize: 48 }} />
      </div>
    </div>
  );
}
