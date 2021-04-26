import { useEffect, useState } from 'react';
import ContentContainer from '../../../components/admin/contentContainer';
import Header from '../../../components/admin/header';
import ControllerMenu from '../../../components/admin/products/controllerMenu';
import ProductList from '../../../components/admin/products/productList';
import api from '../../../server/api';

async function getProducts(action) {
   const result = await api.products.getProducts();
   if(result.status === 200) return result.data;
}

async function getManufacturers() {
    const result = await api.products.getManufacturers();
    if(result.status === 200) return result.data;
}

export default function Products() {
    const [products, setProducts] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);

    useEffect(async () => {
        setProducts(await getProducts())
        setManufacturers(await getManufacturers())
    }, [])

    return (
    <div>
        <Header 
        pageName={"Товары"}
        />
        <div>
            <ContentContainer 
            left={<ControllerMenu manufacturers={manufacturers} />}
            right={<ProductList productData={products} />}
            />
        </div>
    </div>)
}