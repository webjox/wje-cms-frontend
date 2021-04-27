import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../../../components/admin/header';
import formStyles from '../../../../styles/admin/form.module.css';
import api from '../../../../server/api';
import { Button, TextField } from '@material-ui/core';

async function getTag(id) {
  const result = await api.productTags.getProductTagById(id);
  if (result.status === 200) {
    return result.data;
  }
}

async function updateTag(id, data) {
  await api.productTags.updateProductTag(id, data);
}

async function removeTag(id) {
  await api.productTags.deleteProductTag(id);
}

export default function EditTag() {
  const [tag, setTag] = useState();

  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    setTag(await getTag(id));
  }, [id]);

  const handleChange = (event, key) => {
    setTag(prevstate => {
      prevstate[key] = event.target.value || event.target.checked;
      return { ...prevstate };
    });
  };

  return (
    <div>
      <Header pageName={`Редактирование тэга ${tag ? tag.name : ''}`} backButton={true} />

      {tag ? (
        <div>
          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Основная информация</span>
            <TextField
              className={formStyles.formInput}
              id="name"
              label="Наименование тэга"
              defaultValue={tag.name}
              onChange={event => {
                handleChange(event, 'name');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="position"
              type="number"
              label="Позиция"
              defaultValue={tag.position}
              onChange={event => {
                handleChange(event, 'position');
              }}
            />
            <Button
              onClick={e => {
                updateTag(id, tag);
              }}
              className={formStyles.formInput}
              variant="contained"
              color="primary">
              Сохранить
            </Button>
          </form>
          <div className={`container`}>
            <Button
              onClick={e => {
                removeTag(id);
                router.push('/admin/products/tags');
              }}
              className={formStyles.DeleteButton}
              variant="contained"
              color="secondary">
              Удалить категорию
            </Button>
          </div>
        </div>
      ) : (
        <div> Тэг не найден </div>
      )}
    </div>
  );
}
