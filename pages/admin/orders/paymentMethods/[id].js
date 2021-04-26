import { useEffect, useState } from "react";
import {useRouter} from 'next/router';
import Header from '../../../../components/admin/header';
import formStyles from '../../../../styles/admin/form.module.css';
import api from '../../../../server/api';
import { Button, FormControlLabel, TextField, Switch } from "@material-ui/core";

async function getMethod(id) {
    const result = await api.paymentMethods.getPaymentMethodById(id);
    if(result.status === 200) return result.data; 
}

async function updateMethod(id, data) {
    await api.paymentMethods.updatePaymentMethod(id, data);
}

async function deleteMethod(id) {
    await api.paymentMethods.deletePaymentMethod(id);
}

export default function PaymentMethod() {
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
            pageName={`Редактирование способа оплаты ${method ? method.name : ''} `} 
            backButton={true}
        />

        {
            method ? 
            <div>
                <form className={`container ${formStyles.formContainer}`}>
                    <TextField className={formStyles.formInput} type='text' id="name" label="Название" defaultValue={method.name} onChange={e => {handleChange(e, 'name')}} />
                    <FormControlLabel
                    className={formStyles.formInput}
                    control={
                    <Switch
                        checked={method.online_payment}
                        onChange={e => handleChange(e, 'online_payment')}
                        name="is_public"
                        color="primary"
                    />
                    }
                    label="Онлайн оплата"
                    />
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
                router.push('/admin/orders/paymentMethods');
                }} className={formStyles.DeleteButton} variant="contained" color="secondary">Удалить метод</Button>
                </div>

            </div>
            :
            <span>Способ не найден</span>
        }

        </div>
    )
}