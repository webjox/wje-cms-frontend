import { useEffect, useState } from 'react';
import ContentContainer from '../../../components/admin/contentContainer';
import ControllerMenu from '../../../components/admin/customers/controllerMenu';
import CustomersList from '../../../components/admin/customers/customersList';
import Header from '../../../components/admin/header';
import api from '../../../server/api';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const getCustomerData = async () => {
    const response = await api.customers.getCustomers();
    if (response.status === 200) setCustomers(response.data.data);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  return (
    <div>
      <Header pageName={'Клиенты'} />
      <div>
        <ContentContainer
          left={<ControllerMenu />}
          right={<CustomersList userData={customers} />}
        />
      </div>
    </div>
  );
}
