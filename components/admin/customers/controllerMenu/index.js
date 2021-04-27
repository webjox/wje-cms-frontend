import Link from 'next/link';
import SettingsIcon from '@material-ui/icons/Settings';
import FolderIcon from '@material-ui/icons/Folder';
import FormDialog from '../../formDialog';
import { Divider, TextField } from '@material-ui/core';
import { useState } from 'react';
import api from '../../../../server/api';
import { useRouter } from 'next/router';

export default function ControllerMenu() {
  const [user, setUser] = useState({});
  const router = useRouter();

  const handleChange = (e, key) => {
    setUser(prevstate => {
      prevstate[key] = e.target.value;
      return { ...prevstate };
    });
  };

  const createUser = async () => {
    const body = {
      full_name: `${user.last_name} ${user.first_name} ${user.third_name}`,
      ...user,
    };
    const result = await api.customers.addCustomer(body);
    if (result.status === 200) router.push(`/admin/customers/${result.data._id}`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', color: '#1d1d1d' }}>
      <div style={{ height: '50px', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <FolderIcon />
        <Link href="/admin/customers">Все клиенты</Link>
      </div>
      <div style={{ height: '50px', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <SettingsIcon />
        <Link href="/admin/customers/groups">Редактировать группы</Link>
      </div>
      <div style={{ padding: '20px' }}>
        <FormDialog
          title={'Создать пользователя'}
          fields={
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px' }}>
              <TextField
                type="email"
                id="email"
                label="Email"
                onChange={e => {
                  handleChange(e, 'email');
                }}
              />
              <br />
              <TextField
                type="password"
                id="password"
                label="Пароль"
                onChange={e => {
                  handleChange(e, 'password');
                }}
              />
              <br />
              <TextField
                id="first_name"
                label="Имя"
                onChange={e => {
                  handleChange(e, 'first_name');
                }}
              />
              <br />
              <TextField
                id="last_name"
                label="Фамилия"
                onChange={e => {
                  handleChange(e, 'last_name');
                }}
              />
              <br />
              <TextField
                id="third_name"
                label="Отчество"
                onChange={e => {
                  handleChange(e, 'third_name');
                }}
              />
              <br />
              <TextField
                id="mobile"
                label="Номер телефона"
                onChange={e => {
                  handleChange(e, 'mobile');
                }}
              />
            </div>
          }
          action={createUser}
        />
      </div>
    </div>
  );
}
