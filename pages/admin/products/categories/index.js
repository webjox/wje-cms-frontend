import { useEffect, useState } from 'react';
import Header from '../../../../components/admin/header';
import api from '../../../../server/api';
import { useRouter } from 'next/router';
import ProductCategoriesList from '../../../../components/admin/productCategories/productCategoriesList';
import AddCircleIcon from '@material-ui/icons/AddCircle';

async function getCategories() {
  const result = await api.categories.getCategories();
  if (result.status === 200) {
    return result.data;
  }
}

async function addCategory(action) {
  const body = {
    name: 'Default Category',
    slug: randomString(10),
  };
  const result = await api.categories.addCategory(body);
  if (result.status === 200) {
    action(prevstate => {
      prevstate.push(result.data);
      return [...prevstate];
    });
  }
}

export default function ProductCategories() {
  const [categoriesData, setCategoriesData] = useState([]);
  const router = useRouter();

  useEffect(async () => {
    setCategoriesData(await getCategories());
  }, []);

  return (
    <div>
      <Header pageName={`Список категорий`} backButton={true} />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ProductCategoriesList categoryData={categoriesData} />
      </div>
      <div
        onClick={e => addCategory(setCategoriesData)}
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
        <AddCircleIcon color="primary" style={{ fontSize: 48 }} />
      </div>
    </div>
  );
}

function randomString(i) {
  let rnd = '';
  while (rnd.length < i) rnd += Math.random().toString(36).substring(2);
  return rnd.substring(0, i);
}
