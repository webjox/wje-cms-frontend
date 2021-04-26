import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Header from '../../../../components/admin/header';
import formStyles from '../../../../styles/admin/form.module.css';
import api from '../../../../server/api';
import { Button, FormControlLabel, TextField, Switch } from "@material-ui/core";

async function getMethod(id) {
    const result = await api.shippingMethods.getShippingMethodById(id);
    if(result.status === 200) return result.data; 
}

async function updateMethod(id, data) {
    await api.shippingMethods.updateShippingMethod(id, data);
}

async function deleteMethod(id) {
    await api.shippingMethods.deleteShippingMethod(id);
}

export default function ShippingMethod() {
    const [method, setMethod] = useState();
    const router = useRouter();
    const {id} = router.query;

    useEffect(async () => {
        setMethod(await getMethod(id));
    }, [id])

    const handleChange = (event, key) => {
        setMethod(prevstate => {
            prevstate[key] = event.target.value || event.target.checked;
            return {...prevstate};
        })
    }

    return (
        <div>
        <Header 
            pageName={`Редактирование способа доставки ${method ? method.name : ''} `} 
            backButton={true}
        />

        {
            method ? 
            <div>
                <form className={`container ${formStyles.formContainer}`}>
                    <TextField className={formStyles.formInput} type='text' id="name" label="Название" defaultValue={method.name} onChange={e => {handleChange(e, 'name')}} />
                    <TextField className={formStyles.formInput} multiline type='text' id="description" label="Описание" defaultValue={method.description} onChange={e => {handleChange(e, 'description')}} />
                    <TextField className={formStyles.formInput} type='number' id="position" label="Приоритет" defaultValue={method.position} onChange={e => {handleChange(e, 'position')}} />
                    <TextField className={formStyles.formInput} multiline type='text' id="delivery_time" label="Время доставки" defaultValue={method.delivery_time} onChange={e => {handleChange(e, 'delivery_time')}} />
                    <TextField className={formStyles.formInput} type='number' id="price" label="Стоимость доставки" defaultValue={method.price} onChange={e => {handleChange(e, 'price')}} />

                    <FormControlLabel
                    className={formStyles.formInput}
                    control={
                    <Switch
                        checked={method.enabled}
                        onChange={e => handleChange(e, 'enabled')}
                        name="is_public"
                        color="primary"
                    />
                    }
                    label="Активировать"
                    />
                    <div className={formStyles.formButtonContainer}>
                        <Button onClick={e => {updateMethod(id, method)}} variant="contained" color="primary">Сохранить</Button>
                    </div>
                </form>


                <div className={`container`}>
                <Button onClick={e => {
                deleteMethod(id);
                router.push('/admin/orders/shippingMethods');
                }} className={formStyles.DeleteButton} variant="contained" color="secondary">Удалить метод</Button>
                </div>

            </div>
            :
            <span>Способ не найден</span>
        }

        </div>
    )
}