import { useEffect, useState } from 'react';
import api from '../../../../server/api';
import Header from '../../../../components/admin/header';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PaymentMethodsList from '../../../../components/admin/orders/paymentMethodsList';

async function getMethods() {
  const result = await api.paymentMethods.getPaymentMethods();
  if (result.status === 200) return result.data;
}

async function addMethod(action) {
  await api.paymentMethods.addPaymentMethod();
  action(await getMethods());
}

export default function PaymentMethods() {
  const [methods, setMethods] = useState();

  useEffect(async () => {
    setMethods(await getMethods());
  }, []);

  return (
    <div>
      <Header pageName={`Методы оплаты`} backButton={true} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PaymentMethodsList methodsData={methods} />
      </div>
      <div
        onClick={e => {
          addMethod(setMethods);
        }}
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
        <AddCircleIcon color="primary" style={{ fontSize: 48 }} />
      </div>
    </div>
  );
}
