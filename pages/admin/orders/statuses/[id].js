import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../../../components/admin/header';
import formStyles from '../../../../styles/admin/form.module.css';
import api from '../../../../server/api';
import { Button, FormControlLabel, TextField, Switch, Chip } from '@material-ui/core';

async function getStatus (id) {
    const result = await api.orderStatuses.getOrderStatusById(id);
    if(result.status === 200) return result.data;
}

async function removeStatus (id) {
    await api.orderStatuses.deleteOrderStatuses(id);
}

async function updateStatus (id, data) {
    const body = {
        name: data.name,
        description: data.description,
        color: data.color,
        bgcolor: data.bgcolor,
        is_public: data.is_public
    }
    await api.orderStatuses.updateOrderStatuses(id, body);
}

export default function EditCategory() {
    const [status, setStatus] = useState();
    const router = useRouter();
    const {id} = router.query;

    useEffect(async() => {
        setStatus(await getStatus(id));
    }, [id])

    const handleChange = (event, key) => {
        setStatus(prevstate => {
            prevstate[key] = event.target.value || event.target.checked;
            return {...prevstate};
        })
    }

    return (
        <div>
        <Header 
            pageName={`Редактирование статуса ${status ? status.name : ''}`} 
            backButton={true}
        />

        {status ? <div>
            <form className={`container ${formStyles.formContainer}`}>
                <TextField type='text' id="name" label="Название" defaultValue={status.name} onChange={e => {handleChange(e, 'name')}} />
                <TextField type='text' id="desciption" label="Описание" defaultValue={status.description} onChange={e => {handleChange(e, 'description')}} />
                <TextField type='text' id="color" label="Цвет текста (hex)" defaultValue={status.color} onChange={e => {handleChange(e, 'color')}} />
                <TextField type='text' id="bgcolor" label="Цвет заднего фона (hex)" defaultValue={status.bgcolor} onChange={e => {handleChange(e, 'bgcolor')}} />
                <FormControlLabel
                className={formStyles.formInput}
                control={
                <Switch
                    checked={status.is_public}
                    onChange={e => handleChange(e, 'is_public')}
                    name="is_public"
                    color="primary"
                />
                }
                label="Публичный статус"
                />
                <span style={{margin: `10px 0px 10px 0px`}}>Предпросмотр: </span>
                <Chip label={status.name} style={{width: 'max-content', color: `${status.color}`, background: `${status.bgcolor}`}} />

                <div className={formStyles.formButtonContainer}>
                    <Button onClick={e => {updateStatus(id, status)}} variant="contained" color="primary">Сохранить</Button>
                </div>
                
            </form>

            <div className={`container`}>
            <Button onClick={e => {
                removeStatus(id);
                router.push('/admin/orders/statuses');
                }} className={formStyles.DeleteButton} variant="contained" color="secondary">Удалить статус</Button>
            </div>
            </div> : <div> </div>}


        </div>
    )
}