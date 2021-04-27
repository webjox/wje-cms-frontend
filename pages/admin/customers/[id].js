import Header from '../../../components/admin/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../../server/api';
import { Button, Divider, FormControlLabel, TextField, Switch } from '@material-ui/core';
import formStyles from '../../../styles/admin/form.module.css';

const getUserData = async (id, action) => {
  const result = await api.customers.getCustomerById(id);
  if (result.status === 200) action(result.data);
};

const updateUserData = async user => {
  const body = {
    first_name: user.first_name,
    last_name: user.last_name,
    third_name: user.third_name,
    full_name: `${user.last_name} ${user.first_name} ${user.third_name}`,
    mobile: user.mobile,
    wholesaler_settings: user.wholesaler_settings,
    entity: user.entity,
    wholesaler: user.wholesaler,
  };

  await api.customers.updateCustomer(user._id, body);
};

const updateEmail = async user => {
  const body = {
    email: user.email,
  };
  await api.customers.updateCustomer(user._id, body);
};

const updateAddresses = async user => {
  const userAddresses = user.shipping_address;
  const body = {
    shipping_address: {
      address: userAddresses.address,
      city: userAddresses.city,
      state: userAddresses.state,
      country: userAddresses.country,
      postal_code: userAddresses.postal_code,
    },
  };
  await api.customers.updateCustomer(user._id, body);
};

const deleteUser = async user => {
  await api.customers.deleteCustomer(user._id);
};

export default function EditCustomer() {
  const router = useRouter();
  const { id } = router.query;
  const [userState, setUserState] = useState();

  const handleChange = (event, key, secondKey) => {
    setUserState(prevstate => {
      if (secondKey) prevstate[key][secondKey] = event.target.value;
      else prevstate[key] = event.target.value || event.target.checked;
      return { ...prevstate };
    });
  };

  useEffect(async () => {
    getUserData(id, setUserState);
  }, [id]);

  return (
    <div>
      <Header
        pageName={`Редактировать клиента ${userState ? userState.email : ''}`}
        backButton={true}
      />
      {userState ? (
        <div>
          <form className={`container ${formStyles.formContainer}`}>
            <span>Email</span>
            <TextField
              className={formStyles.formInput}
              id="email"
              label="Email"
              defaultValue={userState.email}
              onChange={event => {
                handleChange(event, 'email');
              }}
            />
            <div className={formStyles.formButtonContainer}>
              <Button onClick={e => updateEmail(userState)} variant="contained" color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span>Основная информация</span>
            {userState.entity ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  className={formStyles.formInput}
                  id="organizationName"
                  label="Название организации"
                  defaultValue={
                    userState.wholesaler_settings
                      ? userState.wholesaler_settings.organizationName
                      : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'organizationName');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  type="Number"
                  id="itn"
                  label="ИНН"
                  defaultValue={
                    userState.wholesaler_settings ? userState.wholesaler_settings.itn : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'itn');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  type="Number"
                  id="bic"
                  label="БИК"
                  defaultValue={
                    userState.wholesaler_settings ? userState.wholesaler_settings.bic : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'bic');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  type="Number"
                  id="correspondingAccount"
                  label="К/С"
                  defaultValue={
                    userState.wholesaler_settings
                      ? userState.wholesaler_settings.correspondingAccount
                      : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'correspondingAccount');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  type="Number"
                  id="currentAccount"
                  label="Р/С"
                  defaultValue={
                    userState.wholesaler_settings
                      ? userState.wholesaler_settings.currentAccount
                      : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'currentAccount');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  type="Number"
                  id="psrn"
                  label="ОГРН"
                  defaultValue={
                    userState.wholesaler_settings ? userState.wholesaler_settings.psrn : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'psrn');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  id="bankName"
                  label="Название банка"
                  defaultValue={
                    userState.wholesaler_settings ? userState.wholesaler_settings.bankName : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'bankName');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  id="legalAddress"
                  label="Юридический адрес"
                  defaultValue={
                    userState.wholesaler_settings
                      ? userState.wholesaler_settings.legalAddress
                      : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'legalAddress');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  id="actualAddress"
                  label="Фактический адрес"
                  defaultValue={
                    userState.wholesaler_settings
                      ? userState.wholesaler_settings.actualAddress
                      : null
                  }
                  onChange={event => {
                    handleChange(event, 'wholesaler_settings', 'actualAddress');
                  }}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  className={formStyles.formInput}
                  id="first_name"
                  label="Имя"
                  defaultValue={userState.first_name}
                  onChange={event => {
                    handleChange(event, 'first_name');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  id="last_name"
                  label="Фамилия"
                  defaultValue={userState.last_name}
                  onChange={event => {
                    handleChange(event, 'last_name');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  id="third_name"
                  label="Отчество"
                  defaultValue={userState.third_name}
                  onChange={event => {
                    handleChange(event, 'third_name');
                  }}
                />
                <TextField
                  className={formStyles.formInput}
                  id="mobile"
                  label="Номер телефона"
                  defaultValue={userState.mobile}
                  onChange={event => {
                    handleChange(event, 'mobile');
                  }}
                />
              </div>
            )}
            <FormControlLabel
              className={formStyles.formInput}
              control={
                <Switch
                  checked={userState.entity}
                  onChange={e => handleChange(e, 'entity')}
                  name="entity"
                  color="primary"
                />
              }
              label="Юридическое лицо"
            />

            <FormControlLabel
              className={formStyles.formInput}
              control={
                <Switch
                  checked={userState.wholesaler}
                  onChange={e => handleChange(e, 'wholesaler')}
                  name="wholesaler"
                  color="primary"
                />
              }
              label="Оптовик"
            />

            <div className={formStyles.formButtonContainer}>
              <Button onClick={e => updateUserData(userState)} variant="contained" color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />

          <div className={`container ${formStyles.formContainer}`}>
            <span>Статистика клиента:</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Всего потрачено: {userState.total_spent}</span>
              <span>Потрачено за год: {userState.year_spent}</span>
              {userState.wholesaler ? <span>Discount: {userState.discount}%</span> : null}
            </div>
          </div>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span>Реквизиты</span>
            <TextField
              className={formStyles.formInput}
              id="address"
              label="Адрес"
              defaultValue={userState.shipping_address.address || ''}
              onChange={event => {
                handleChange(event, 'shipping_address', 'address');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="city"
              label="Город"
              defaultValue={userState.shipping_address.city || ''}
              onChange={event => {
                handleChange(event, 'shipping_address', 'city');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="state"
              label="Регион"
              defaultValue={userState.shipping_address.state || ''}
              onChange={event => {
                handleChange(event, 'shipping_address', 'state');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="country"
              label="Страна"
              defaultValue={userState.shipping_address.country || ''}
              onChange={event => {
                handleChange(event, 'shipping_address', 'country');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="postal_code"
              label="Индекс"
              defaultValue={userState.shipping_address.postal_code || ''}
              onChange={event => {
                handleChange(event, 'shipping_address', 'postal_code');
              }}
            />
            <div className={formStyles.formButtonContainer}>
              <Button onClick={e => updateAddresses(userState)} variant="contained" color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />
          <div className={`container`}>
            <Button
              onClick={e => {
                deleteUser(userState);
                router.push('/admin/customers');
              }}
              className={formStyles.DeleteButton}
              variant="contained"
              color="secondary">
              Удалить пользователя
            </Button>
          </div>
        </div>
      ) : (
        <div className="container">Пользователь не найден</div>
      )}
    </div>
  );
}
