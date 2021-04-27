import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../../../components/admin/header';
import formStyles from '../../../../styles/admin/form.module.css';
import api from '../../../../server/api';
import { Button, InputLabel, NativeSelect, TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { DropzoneArea } from 'material-ui-dropzone';
import ImageCard from '../../../../components/admin/products/imageCard';

async function getCategory(id) {
  const result = await api.categories.getCategoryById(id);
  if (result.status === 200) {
    return result.data;
  }
}

async function getCategories() {
  const result = await api.categories.getCategories();
  if (result.status === 200) {
    return result.data;
  }
}

async function deleteCategory(id) {
  await api.categories.deleteCategory(id);
}

async function updateCategoryInfo(id, data) {
  const body = {
    name: data.name,
    description: data.description,
    enabled: data.enabled,
    parent_id: data.parent_id,
  };
  await api.categories.updateCategory(id, body);
}

async function updateCategorySeo(id, data) {
  const body = {
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    slug: data.slug,
  };
  await api.categories.updateCategory(id, body);
}

async function addImage(id, data, action) {
  const formData = new FormData();
  formData.append('file', data[0], data[0].name);
  await api.categories.addImage(id, formData);
  const newImagedata = await getImage(id);
  action({ ...newImagedata });
}

async function getImage(id) {
  const result = await api.categories.getImage(id);
  if (result.status === 200) return result.data;
}

export default function EditCategory() {
  const [category, setCategory] = useState();
  const [categoryImage, setCategoryImage] = useState();
  const [imageData, setImageData] = useState([]); // file states for dropZone
  const [categoriesData, setCategoriesData] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    setCategoriesData(await getCategories());
    setCategory(await getCategory(id));
    setCategoryImage(await getImage(id));
  }, [id]);

  const handleChange = (event, key) => {
    setCategory(prevstate => {
      prevstate[key] = event.target.value || event.target.checked;
      return { ...prevstate };
    });
  };

  const updateImageHandler = async (imageId, data) => {
    await api.categories.updateImage(id, {
      alt: data,
    });
  };

  const removeImageHandler = async () => {
    setCategoryImage('');
    await api.categories.deleteImage(id);
  };

  return (
    <div>
      <Header
        pageName={`Редактирование категории ${category ? category.name : ''}`}
        backButton={true}
      />

      {category ? (
        <div>
          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Основная информация</span>
            <TextField
              className={formStyles.formInput}
              id="name"
              label="Наименование категории"
              defaultValue={category.name}
              onChange={event => {
                handleChange(event, 'name');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="description"
              label="Описание категории"
              defaultValue={category.description}
              onChange={event => {
                handleChange(event, 'description');
              }}
            />
            <FormControlLabel
              className={formStyles.formInput}
              control={
                <Switch
                  checked={category.enabled}
                  onChange={e => handleChange(e, 'enabled')}
                  name="enabled"
                  color="primary"
                />
              }
              label="Enabled"
            />

            <InputLabel className={formStyles.formInput} htmlFor="age-native-helper">
              Родительская категория
            </InputLabel>
            <NativeSelect
              value={category.parent_id}
              onChange={e => handleChange(e, 'parent_id')}
              inputProps={{
                name: 'parent_category',
                id: 'parent_category',
              }}>
              <option aria-label="None" value="" />
              {categoriesData.map((item, index) => {
                if (item._id !== id)
                  return (
                    <option key={index} aria-label={item.name} value={item._id}>
                      {item.name}
                    </option>
                  );
              })}
            </NativeSelect>

            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => {
                  updateCategoryInfo(id, category);
                }}
                variant="contained"
                color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>SEO</span>
            <TextField
              className={formStyles.formInput}
              id="meta_title"
              label="meta_title"
              defaultValue={category.meta_title}
              onChange={event => {
                handleChange(event, 'meta_title');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="meta_description"
              label="meta_description"
              defaultValue={category.meta_description}
              onChange={event => {
                handleChange(event, 'meta_description');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="slug"
              label="slug"
              defaultValue={category.slug}
              onChange={event => {
                handleChange(event, 'slug');
              }}
            />

            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => {
                  updateCategorySeo(id, category);
                }}
                variant="contained"
                color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <form className={`container ${formStyles.formContainer}`}>
            <span>Загруженные изображения: </span>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {categoryImage ? (
                <ImageCard
                  image={categoryImage}
                  updateAlt={updateImageHandler}
                  removeAction={removeImageHandler}
                />
              ) : null}
            </div>
            <DropzoneArea
              onChange={setImageData}
              acceptedFiles={['image/*']}
              dropzoneText={'Перетащите изображение для загрузки'}
              filesLimit={1}
            />
            <Button
              onClick={e => addImage(id, imageData, setCategoryImage)}
              variant="contained"
              color="primary">
              Сохранить
            </Button>
          </form>

          <div className={`container`}>
            <Button
              onClick={e => {
                deleteCategory(id);
                router.push('/admin/products/categories');
              }}
              className={formStyles.DeleteButton}
              variant="contained"
              color="secondary">
              Удалить категорию
            </Button>
          </div>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
