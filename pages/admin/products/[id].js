import Header from '../../../components/admin/header';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import api from '../../../server/api';
import {
  Button,
  Chip,
  Divider,
  Input,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
  Menu,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import formStyles from '../../../styles/admin/form.module.css';
import { DropzoneArea } from 'material-ui-dropzone';
import OptionsContainer from '../../../components/admin/products/options/optionsContainer';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ImageCard from '../../../components/admin/products/imageCard';
import FileCard from '../../../components/admin/products/fileCard';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

async function getProductData(id, action) {
  const result = await api.products.getProductsById(id);
  if (result.status === 200) action(result.data);
}

async function getTags() {
  const result = await api.productTags.getProductTags();
  if (result.status === 200) return result.data;
}

async function getCategories() {
  const result = await api.categories.getCategories();
  if (result.status === 200) {
    return result.data;
  }
}

async function getShops() {
  const result = await api.shops.getShop();
  if (result.status === 200) {
    return result.data;
  }
}

async function updateTags(id, data) {
  await api.products.updateProducts(id, { tags: data });
}

async function deleteProduct(id) {
  await api.products.deleteProducts(id);
}

function getProductQuantity(product) {
  let quantity = 0;
  product.shops.map(item => {
    quantity += parseInt(item.quantity);
  });
  return quantity;
}

async function updateMainInfo(id, data) {
  const body = {
    name: data.name,
    sku: data.sku,
    manufacturer: data.manufacturer,
    categoryId: data.categoryId,
    enabled: data.enabled,
    effects: data.effects,
    volleys: data.volleys,
  };
  await api.products.updateProducts(id, body);
}

async function updateDescription(id, data) {
  const body = {
    description: data.description,
  };
  await api.products.updateProducts(id, body);
}

async function updateVideo(id, data) {
  const body = {
    video: data.video,
  };
  await api.products.updateProducts(id, body);
}

async function updateQuantity(id, data) {
  const body = {
    stock_quantity: data.stock_quantity,
    shop_quantity: data.shop_quantity,
    package_quantity: data.package_quantity,
  };
  await api.products.updateProducts(id, body);
}

async function updateCost(id, data) {
  const body = {
    price: data.price,
    stock_price: data.stock_price,
  };
  await api.products.updateProducts(id, body);
}

async function updateMeta(id, data) {
  const body = {
    meta_title: data.meta_title,
    meta_description: data.meta_description,
    slug: data.slug,
  };
  await api.products.updateProducts(id, body);
}

async function addImage(id, data, action) {
  const formData = new FormData();
  formData.append('file', data[0], data[0].name);
  await api.products.addProductImages(id, formData);
  const newImagedata = await getImages(id);
  action([...newImagedata]);
}

async function getImages(id) {
  const result = await api.products.getProductImages(id);
  if (result.status === 200) return result.data;
}

async function addFile(id, data, action) {
  const formData = new FormData();
  formData.append('file', data[0], data[0].name);
  await api.products.addProductFiles(id, formData);
  const newFileData = await getFiles(id);
  action([...newFileData]);
}

async function getFiles(id) {
  const result = await api.products.getProductFiles(id);
  if (result.status === 200) return result.data;
}

async function getEffects() {
  const result = await api.products.getEffects();
  if (result.status === 200) return result.data;
}

async function getManufacturers() {
  const result = await api.products.getManufacturers();
  if (result.status === 200) return result.data;
}

export default function EditProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState();
  const [productImages, setProductImages] = useState([]);
  const [productFiles, setProductFiles] = useState([]);
  const [imageData, setImageData] = useState([]); // file states for dropZone
  const [fileData, setFileData] = useState([]); // file states for dropZone
  const [categoriesData, setCategoriesData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [shopsData, setShopsData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [effects, setEffects] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const editorRef = useRef();

  const handleChange = (event, key) => {
    setProduct(prevstate => {
      prevstate[key] = event.target.value || event.target.checked;
      return { ...prevstate };
    });
  };

  const handleWysiwigChange = content => {
    setProduct(prevstate => {
      prevstate.description = content;
      return { ...prevstate };
    });
  };

  const addOptionHandler = async () => {
    const result = await api.products.addProductOption(id, {
      name: 'defaultName',
      values: ['defaultValue'],
    });
    if (result.status === 200) {
      setProduct(prevstate => {
        prevstate.options = result.data;
        return { ...prevstate };
      });
    }
  };

  const removeOptionHandler = async optionId => {
    const result = await api.products.deleteProductOption(id, optionId);
    if (result.status === 200) {
      setProduct(prevstate => {
        prevstate.options = result.data;
        return { ...prevstate };
      });
    }
  };

  const updateOptionHandler = async (optionId, data) => {
    await api.products.updateProductOption(id, optionId, {
      name: data.name,
      values: [data.value],
    });
  };

  const addShopHandler = async item => {
    const result = await api.products.addProductShop(id, {
      shop_id: item._id,
      name: item.name,
      quantity: 0,
    });
    if (result.status === 200) {
      setProduct(prevstate => {
        prevstate.shops = result.data;
        return { ...prevstate };
      });
    }
  };

  const removeShopHandler = async shopId => {
    const result = await api.products.deleteProductShop(id, shopId);
    if (result.status === 200) {
      setProduct(prevstate => {
        prevstate.shops = result.data;
        return { ...prevstate };
      });
    }
  };

  const updateShopHandler = async (shopId, data) => {
    const result = await api.products.updateProductShop(id, shopId, {
      name: data.name,
      quantity: data.value,
    });
    if (result.status === 200) {
      setProduct(prevstate => {
        prevstate.shops = result.data;
        return { ...prevstate };
      });
    }
  };

  const removeImageHandler = async imageId => {
    const array = [...productImages];
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === imageId) {
        array.splice(i, 1);
      }
    }
    setProductImages(array);
    await api.products.deleteProductImages(id, imageId);
  };

  const removeFileHandler = async fileId => {
    const array = [...productFiles];
    for (let i = 0; i < array.length; i++) {
      if (array[i]._id === fileId) {
        array.splice(i, 1);
      }
    }
    setProductFiles(array);
    await api.products.deleteProductFiles(id, fileId);
  };

  const updateImageHandler = async (imageId, data) => {
    await api.products.updateProductImages(id, imageId, {
      alt: data,
    });
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(async () => {
    getProductData(id, setProduct);
    setProductImages(await getImages(id));
    setProductFiles(await getFiles(id));
    setCategoriesData(await getCategories());
    setTagsData(await getTags());
    setShopsData(await getShops());
    setEffects(await getEffects());
    setManufacturers(await getManufacturers());
  }, [id]);

  return (
    <div>
      <Header pageName={`Редактирование товара ${product ? product.name : ''}`} backButton={true} />
      {product ? (
        <div>
          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Основная информация</span>
            <TextField
              className={formStyles.formInput}
              id="name"
              label="Наименование товара"
              defaultValue={product.name}
              onChange={event => {
                handleChange(event, 'name');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="sku"
              label="Артикул"
              defaultValue={product.sku}
              onChange={event => {
                handleChange(event, 'sku');
              }}
            />
            <InputLabel className={formStyles.formInput} htmlFor="manufacturer-controller">
              Производитель
            </InputLabel>
            <Select
              labelId="manufacturer-controller"
              id="manufacturer-controller"
              value={product.manufacturer}
              onChange={e => handleChange(e, 'manufacturer')}
              input={<Input id="manufacturer-controller" />}>
              {manufacturers.map(manufacturer => (
                <MenuItem key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </MenuItem>
              ))}
            </Select>
            <InputLabel className={formStyles.formInput} htmlFor="category">
              Родительская категория
            </InputLabel>
            <NativeSelect
              value={product.categoryId}
              onChange={e => handleChange(e, 'categoryId')}
              inputProps={{
                name: 'categoryId',
                id: 'categoryId',
              }}>
              <option aria-label="None" value="" />
              {categoriesData.map((item, index) => {
                return (
                  <option key={index} aria-label={item.name} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </NativeSelect>
            <FormControlLabel
              className={formStyles.formInput}
              control={
                <Switch
                  checked={product.enabled}
                  onChange={e => handleChange(e, 'enabled')}
                  name="enabled"
                  color="primary"
                />
              }
              label="Enabled"
            />
            <InputLabel className={formStyles.formInput} htmlFor="tags-controller">
              Эффекты
            </InputLabel>
            <Select
              labelId="tags-controller"
              id="tags-controller"
              multiple
              value={product.effects}
              onChange={e => handleChange(e, 'effects')}
              input={<Input id="tags-controller" />}>
              {effects.map(effect => (
                <MenuItem key={effect.name} value={effect.name}>
                  {effect.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              className={formStyles.formInput}
              id="volleys"
              label="Количество залпов (опционально)"
              defaultValue={product.volleys}
              onChange={event => {
                handleChange(event, 'volleys');
              }}
            />
            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => {
                  updateMainInfo(id, product);
                }}
                variant="contained"
                color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Описание товара</span>
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
              defaultValue={product.description}
            />
            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => {
                  updateDescription(id, product);
                }}
                variant="contained"
                color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Тэги товара</span>
            <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
            <Select
              labelId="tags-controller"
              id="tags-controller"
              multiple
              value={product.tags}
              onChange={e => handleChange(e, 'tags')}
              input={<Input id="tags-controller" />}>
              {tagsData.map(tag => (
                <MenuItem key={tag.name} value={tag._id}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => {
                  updateTags(id, product.tags);
                }}
                variant="contained"
                color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Наличие товара</span>
            <span style={{ marginTop: 20 }}>
              Общее количество товара: {getProductQuantity(product)}
            </span>
            <span style={{ marginTop: 20 }}>Товар в магазинах</span>

            <Button aria-controls="add-shop" aria-haspopup="true" onClick={handleClick}>
              <AddCircleIcon color="primary" style={{ fontSize: 48 }} />
            </Button>
            <Menu
              id="add-shop"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              {shopsData.map(item => {
                const existShop = [];
                product.shops.map(shop => {
                  if (shop.shop_id === item._id) existShop.push(item);
                });
                if (existShop.length === 0)
                  return (
                    <MenuItem
                      onClick={e => {
                        addShopHandler(item);
                        handleClose();
                      }}>
                      {item.name}
                    </MenuItem>
                  );
              })}
            </Menu>

            <OptionsContainer
              data={product.shops}
              disableName={true}
              removeAction={removeShopHandler}
              updateAction={updateShopHandler}
              numbers={true}
            />

            <TextField
              className={formStyles.formInput}
              id="package_quantity"
              label="Количество товара в упаковке"
              defaultValue={product.package_quantity}
              onChange={event => {
                handleChange(event, 'package_quantity');
              }}
            />
            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => {
                  updateQuantity(id, product);
                }}
                variant="contained"
                color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Стоимость товара</span>
            <TextField
              className={formStyles.formInput}
              id="stock_price"
              type="number"
              label="Стоимость товара со склада"
              defaultValue={product.stock_price}
              onChange={event => {
                handleChange(event, 'stock_price');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="price"
              type="number"
              label="Стоимость товара в магазинах"
              defaultValue={product.price}
              onChange={event => {
                handleChange(event, 'price');
              }}
            />
            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => {
                  updateCost(id, product);
                }}
                variant="contained"
                color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Свойства товара</span>
            <OptionsContainer
              data={product.options}
              removeAction={removeOptionHandler}
              updateAction={updateOptionHandler}
            />
            <div
              onClick={e => {
                addOptionHandler();
              }}
              style={{ alignSelf: 'center', cursor: 'pointer' }}>
              <AddCircleIcon color="primary" style={{ fontSize: 48 }} />
            </div>
          </form>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>SEO товара</span>
            <TextField
              className={formStyles.formInput}
              id="meta_title"
              label="Meta title"
              defaultValue={product.meta_title}
              onChange={event => {
                handleChange(event, 'meta_title');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="meta_description"
              label="Meta description"
              defaultValue={product.meta_description}
              onChange={event => {
                handleChange(event, 'meta_description');
              }}
            />
            <TextField
              className={formStyles.formInput}
              id="slug"
              label="URL"
              defaultValue={product.slug}
              onChange={event => {
                handleChange(event, 'slug');
              }}
            />
            <div className={formStyles.formButtonContainer}>
              <Button
                onClick={e => {
                  updateMeta(id, product);
                }}
                variant="contained"
                color="primary">
                Сохранить
              </Button>
            </div>
          </form>

          <Divider />

          <form className={`container ${formStyles.formContainer}`}>
            <span className={formStyles.formTitle}>Другое</span>

            <span>Загруженные изображения: </span>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {productImages.map((item, index) => {
                return (
                  <ImageCard
                    key={index}
                    image={item}
                    removeAction={removeImageHandler}
                    updateAlt={updateImageHandler}
                  />
                );
              })}
            </div>

            <DropzoneArea
              onChange={setImageData}
              acceptedFiles={['image/*']}
              dropzoneText={'Перетащите изображение для загрузки'}
              initialFiles={product.images}
              filesLimit={1}
            />
            <Button
              onClick={e => {
                addImage(id, imageData, setProductImages);
              }}
              variant="contained"
              color="primary">
              Сохранить
            </Button>

            <span style={{ marginTop: 50 }}>Загруженные файлы:</span>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {productFiles.map((item, index) => {
                return <FileCard key={index} file={item} removeAction={removeFileHandler} />;
              })}
            </div>
            <DropzoneArea
              onChange={setFileData}
              acceptedFiles={['application/pdf']}
              dropzoneText={'Перетащите документы для загрузки'}
              initialFiles={product.files}
            />
            <Button
              onClick={e => {
                addFile(id, fileData, setProductFiles);
              }}
              variant="contained"
              color="primary">
              Сохранить
            </Button>
            <span style={{ marginTop: 30 }}>Видео</span>
            <TextField
              className={formStyles.formInput}
              id="video"
              label="youtube video"
              defaultValue={product.video}
              onChange={event => {
                handleChange(event, 'video');
              }}
            />
            <Button
              onClick={e => {
                updateVideo(id, product);
              }}
              variant="contained"
              color="primary">
              Сохранить
            </Button>
          </form>

          <Divider />

          <div className={`container`}>
            <Button
              onClick={e => {
                deleteProduct(id);
                router.push('/admin/products');
              }}
              className={formStyles.DeleteButton}
              variant="contained"
              color="secondary">
              Удалить товар
            </Button>
          </div>
        </div>
      ) : (
        <div className="container">Продукт не найден</div>
      )}
    </div>
  );
}
