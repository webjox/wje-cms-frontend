import { useEffect, useState, useRef } from 'react';
import Header from '../../../components/admin/header';
import api from '../../../server/api';
import { useRouter } from 'next/router';
import formStyles from '../../../styles/admin/form.module.css';
import { Button, FormControlLabel, Switch, TextField } from '@material-ui/core';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { DropzoneArea } from 'material-ui-dropzone';
import ImageCard from '../../../components/admin/products/imageCard';

async function getPage(id) {
  const result = await api.pages.getPageById(id);
  if (result.status === 200) return result.data;
}

async function updatePage(id, data) {
  const body = {
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    slug: data.slug,
    enabled: data.enabled,
    content: data.content,
    card_name: data.card_name,
    in_the_sidebar: data.in_the_sidebar,
  };
  await api.pages.updatePage(id, body);
}

async function uploadImage(id, data, action) {
  const formData = new FormData();
  formData.append('file', data[0], data[0].name);
  await api.pages.uploadImage(id, formData);
  const updatedPage = await getPage(id);
  action(updatedPage);
}

async function deletePage(id) {
  await api.pages.deletePage(id);
}

export default function Page() {
  const editorRef = useRef();
  const [page, setPage] = useState();
  const [imageData, setImageData] = useState([]); // for dropZone
  const router = useRouter();
  const { id } = router.query;

  useEffect(async () => {
    setPage(await getPage(id));
  }, [id]);

  const handleChange = (event, key) => {
    setPage(prevstate => {
      prevstate[key] = event.target.value || event.target.checked;
      return { ...prevstate };
    });
  };

  const handleWysiwigChange = content => {
    setPage(prevstate => {
      prevstate.content = content;
      return { ...prevstate };
    });
  };

  const removeImageHandler = async () => {
    setPage(prevstate => {
      prevstate.card_image = null;
      return { ...prevstate };
    });
    await api.pages.deleteImage(id);
  };

  const updateImageHandler = async (imageId, data) => {
    await api.pages.updateImage(id, data);
  };

  return (
    <div>
      <Header
        pageName={`Редактирование страницы ${page ? page.meta_title : ''}`}
        backButton={true}
      />

      {page ? (
        <div>
          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Основная информация</span>
            <TextField
              className={formStyles.formInput}
              id="meta_title"
              label="Meta title"
              defaultValue={page.meta_title}
              onChange={event => {
                handleChange(event, 'meta_title');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="meta_description"
              label="Meta description"
              defaultValue={page.meta_description}
              onChange={event => {
                handleChange(event, 'meta_description');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="slug"
              label="slug"
              defaultValue={page.slug}
              onChange={event => {
                handleChange(event, 'slug');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="card_name"
              label="Card name"
              defaultValue={page.card_name}
              onChange={event => {
                handleChange(event, 'card_name');
              }}
            />
            <FormControlLabel
              className={formStyles.formInput}
              control={
                <Switch
                  checked={page.enabled}
                  onChange={e => handleChange(e, 'enabled')}
                  name="enabled"
                  color="primary"
                />
              }
              label="Enabled"
            />
            <FormControlLabel
              className={formStyles.formInput}
              control={
                <Switch
                  checked={page.in_the_sidebar}
                  onChange={e => handleChange(e, 'in_the_sidebar')}
                  name="in_the_sidebar"
                  color="primary"
                />
              }
              label="В боковом меню"
            />
            <SunEditor
              ref={editorRef}
              setOptions={{
                buttonList: [
                  ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
                  [
                    'bold',
                    'underline',
                    'italic',
                    'strike',
                    'subscript',
                    'superscript',
                    'removeFormat',
                  ],
                  [
                    'fontColor',
                    'hiliteColor',
                    'outdent',
                    'indent',
                    'align',
                    'horizontalRule',
                    'list',
                    'table',
                  ],
                  [
                    'link',
                    'image',
                    'video',
                    'fullScreen',
                    'showBlocks',
                    'codeView',
                    'preview',
                    'print',
                    'save',
                  ],
                ],
              }}
              height={400}
              onChange={handleWysiwigChange}
              defaultValue={page.content}
            />
            <div className={formStyles.formButtonContainer}>
              <Button onClick={e => updatePage(id, page)} variant="contained" color="primary">
                Сохранить
              </Button>
            </div>

            <br />
            <span>Загруженные изображения: </span>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {page.card_image ? (
                <ImageCard
                  image={page.card_image}
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
                onClick={e => uploadImage(id, imageData, setPage)}
                variant="contained"
                color="primary">
                Загрузить изображение
              </Button>
            </div>
          </form>

          {!page.is_system ? (
            <div className={`container`}>
              <Button
                onClick={e => {
                  deletePage(id);
                  router.push('/admin/pages');
                }}
                className={formStyles.DeleteButton}
                variant="contained"
                color="secondary">
                Удалить страницу
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <div>Страница не найдена</div>
      )}
    </div>
  );
}
