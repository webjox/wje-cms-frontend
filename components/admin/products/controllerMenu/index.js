import Link from 'next/link'
import SettingsIcon from '@material-ui/icons/Settings';
import FolderIcon from '@material-ui/icons/Folder';
import {useRouter} from 'next/router';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import api from '../../../../server/api';
import FormDialog from '../../formDialog';
import { useState } from 'react';
import { Select, TextField, InputLabel, MenuItem, Input } from '@material-ui/core';
import formStyles from '../../../../styles/admin/form.module.css';

export default function ControllerMenu({manufacturers}) {
    const router = useRouter();
    const [product, setProduct] = useState({});
    const handleChange = (e, key) => {
        setProduct(prevstate => {
            prevstate[key] = e.target.value;
            return {...prevstate};
        })
    }

    const createProduct = async () => {
        const result = await api.products.addProducts(product);
        console.log(result);
        if(result.status === 200) router.push(`/admin/products/${result.data._id}`)
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column', color: "#1d1d1d"}}>
            <div style={{height: '50px', padding: '20px', display: 'flex', alignItems: 'center'}}><FolderIcon /><Link href="/admin/products">Все Товары</Link></div>
            <div style={{height: '50px', padding: '20px', display: 'flex', alignItems: 'center'}}><SettingsIcon /><Link href="/admin/products/categories">Редактировать группы</Link></div>
            <div style={{height: '50px', padding: '20px', display: 'flex', alignItems: 'center'}}><SettingsIcon /><Link href="/admin/products/tags">Редактировать тэги</Link></div>
            <div style={{height: '50px', padding: '20px', display: 'flex', alignItems: 'center'}}><ImportExportIcon /><Link href="/admin/products/import">Импорт товаров</Link></div>
            <div style={{padding: '20px'}}>
            <FormDialog
                title={'Добавить товар'}
                fields={
                    <div style={{display: 'flex', flexDirection:'column', width: '500px'}}>
                    <TextField type='name' id="name" label="Наименование товара" onChange={e => {handleChange(e, 'name')}} />
                    <br />
                    <TextField type='stu' id="stu" label="Артикул" onChange={e => {handleChange(e, 'sku')}} />
                    <br />
                    <InputLabel className={formStyles.formInput} htmlFor="manufacturer-controller">Производитель</InputLabel>
                    <Select
                    labelId="manufacturer-controller"
                    id="manufacturer-controller"
                    onChange={e => handleChange(e, 'manufacturer')}
                    input={<Input id="manufacturer-controller" />}
                    >
                    {manufacturers.map((manufacturer) => (
                        <MenuItem key={manufacturer} value={manufacturer}>
                        {manufacturer}
                        </MenuItem>
                    ))}
                    </Select>
                    <br />
                    <TextField type='slug' id="slug" label="URL" onChange={e => {handleChange(e, 'slug')}} />
                    </div>
                }
               action={createProduct}
            />
            </div>
        </div>
    )
}