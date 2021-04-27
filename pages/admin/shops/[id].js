import { useEffect, useState } from 'react';
import Header from '../../../components/admin/header';
import api from '../../../server/api';
import { useRouter } from 'next/router';
import formStyles from '../../../styles/admin/form.module.css';
import { Button, FormControlLabel, TextField, Switch } from '@material-ui/core';
import styles from '../../../styles/admin/shop.module.css';
import { DropzoneArea } from 'material-ui-dropzone';
import ImageCard from '../../../components/admin/products/imageCard';

async function getShop(id) {
  const result = await api.shops.getShopById(id);
  if (result.status === 200) return result.data;
}

async function updateShop(id, data) {
  await api.shops.updateShop(id, data);
}

async function deleteShop(id) {
  await api.shops.deleteShop(id);
}

async function uploadImage(id, data, action) {
  const formData = new FormData();
  formData.append('file', data[0], data[0].name);
  await api.shops.uploadImage(id, formData);
  const updatedShop = await getShop(id);
  action(updatedShop);
}

export default function Shop() {
  const [shop, setShop] = useState();
  const router = useRouter();
  const { id } = router.query;
  const [imageData, setImageData] = useState([]); // for dropZone

  useEffect(async () => {
    setShop(await getShop(id));
  }, [id]);

  const handleChange = (event, key, secondKey, thirdKey) => {
    setShop(prevstate => {
      if (thirdKey) prevstate[key][secondKey][thirdKey] = event.target.value;
      else if (secondKey) prevstate[key][secondKey] = event.target.value;
      else prevstate[key] = event.target.value || event.target.checked;
      return { ...prevstate };
    });
  };

  const removeImageHandler = async () => {
    setShop(prevstate => {
      prevstate.image = null;
      return { ...prevstate };
    });
    await api.shops.deleteImage(id);
  };

  const updateImageHandler = async (imageId, data) => {
    await api.shops.updateImage(id, data);
  };

  return (
    <div>
      <Header pageName={`Редактирование магазина ${shop ? shop.name : ''}`} backButton={true} />

      {shop ? (
        <div>
          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Основная информация</span>
            <TextField
              className={formStyles.formInput}
              id="name"
              label="Название магазина"
              defaultValue={shop.name}
              onChange={event => {
                handleChange(event, 'name');
              }}
            />
            <TextField
              className={formStyles.formInput}
              multiline
              id="description"
              label="Описание магазина"
              defaultValue={shop.description}
              onChange={event => {
                handleChange(event, 'description');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="video"
              label="Видео"
              defaultValue={shop.video}
              onChange={event => {
                handleChange(event, 'video');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="phone"
              label="Номер телефона"
              defaultValue={shop.phone}
              onChange={event => {
                handleChange(event, 'phone');
              }}
            />
            <TextField
              className={formStyles.formInput}
              multiline
              id="work_time"
              label="Время работы"
              defaultValue={shop.work_time}
              onChange={event => {
                handleChange(event, 'work_time');
              }}
            />
            <div className={styles.coordsContainer}>
              <span>Адрес: </span>
              <div className={styles.coords}>
                <TextField
                  className={formStyles.formInput}
                  id="full_address"
                  label="Полный адрес"
                  defaultValue={shop.location.full_address}
                  onChange={event => {
                    handleChange(event, 'location', 'full_address');
                  }}
                />
                <TextField
                  type="number"
                  className={formStyles.formInput}
                  id="lat"
                  label="lat"
                  defaultValue={shop.location.coords.lat}
                  onChange={event => {
                    handleChange(event, 'location', 'coords', 'lat');
                  }}
                />
                <TextField
                  type="number"
                  className={formStyles.formInput}
                  id="lng"
                  label="lng"
                  defaultValue={shop.location.coords.lng}
                  onChange={event => {
                    handleChange(event, 'location', 'coords', 'lng');
                  }}
                />
              </div>
            </div>
            <FormControlLabel
              className={formStyles.formInput}
              control={
                <Switch
                  checked={shop.warehouse}
                  onChange={e => handleChange(e, 'warehouse')}
                  name="warehouse"
                  color="primary"
                />
              }
              label="Склад"
            />
            <div className={formStyles.formButtonContainer}>
              <Button onClick={e => updateShop(id, shop)} variant="contained" color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <div className={`container ${formStyles.formContainer}`}>
            <span>Загруженные изображения: </span>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {shop.image && shop.image.filename ? (
                <ImageCard
                  image={shop.image}
                  removeAction={removeImageHandler}
                  updateAlt={updateImageHandler}
                />
              ) : null}
            </div>
            <DropzoneArea
              onChange={setImageData}
              acceptedFiles={['image/*']}
              dropzoneText={'Перетащите изображение для загрузки'}
              filesLimit={1}
            />
            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => uploadImage(id, imageData, setShop)}
                variant="contained"
                color="primary">
                Загрузить изображение
              </Button>
            </div>
          </div>

          <div className={`container`}>
            <Button
              onClick={e => {
                deleteShop(id);
                router.push('/admin/shops');
              }}
              className={formStyles.DeleteButton}
              variant="contained"
              color="secondary">
              Удалить магазин
            </Button>
          </div>
        </div>
      ) : (
        <div>Страница не найдена</div>
      )}
    </div>
  );
}
