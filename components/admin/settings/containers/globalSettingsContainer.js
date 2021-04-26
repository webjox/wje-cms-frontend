import { Button, Divider, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import formStyles from '../../../../styles/admin/form.module.css';
import Link from 'next/link';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import api from '../../../../server/api';

async function getSettings () {
    const result = await api.settings.getSettings();
    if(result.status === 200) return result.data;
}

async function updateSettings(data) {
    const body = {
        store_name: data.store_name,
        domain: data.domain,
        order_confirmation_copy_to: data.order_confirmation_copy_to
    }
    await api.settings.updateSettings(body)
}

export default function GlobalSettignsContainer() {
    const [state, setState] = useState();
    
    useEffect( async () => {
        setState(await getSettings());
    }, [])

    const handleChange = (event, key) => {
        setState(prevstate => {
            prevstate[key] = event.target.value || event.target.checked;
            return {...prevstate};
        })
    }

    return (
        <div style={{width: "100%"}}>{state ? 
            <form className={`container ${formStyles.formContainer}`}>
            <a style={{display: 'flex', justifyContent: 'space-between'}} href="/admin/settings/logo">Logo <ChevronRightIcon /></a>
            <Divider />
            <TextField className={formStyles.formInput} defaultValue={state.store_name} id="name" type="text" label="Название магазина" onChange={e => handleChange(e, 'store_name')} />
            <TextField className={formStyles.formInput} defaultValue={state.domain} id="domain" type="url" label="Домен" onChange={e => handleChange(e, 'domain')} />
            <TextField className={formStyles.formInput} defaultValue={state.order_confirmation_copy_to} id="order_confirmation_copy_to" type="email" label="Копировать уведомления на" onChange={e => handleChange(e, 'order_confirmation_copy_to')} />
            <Button onClick={e => {updateSettings(state)}}  variant="contained" color="primary">Сохранить</Button>
            </form>
        :
        <div>ERROR: 500, ОБРАТИТЕСЬ К ВАШЕМУ АДМИНИСТРАТОРУ</div>
        }
        </div>
    )
}