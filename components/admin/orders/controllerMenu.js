import Link from 'next/link'
import FolderIcon from '@material-ui/icons/Folder';
import SettingsIcon from '@material-ui/icons/Settings';
import PaymentIcon from '@material-ui/icons/Payment';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import FormDialog from '../formDialog';
import api from '../../../server/api';
import {useRouter} from 'next/router';
import { FormControlLabel, Switch } from '@material-ui/core';
import formStyles from '../../../styles/admin/form.module.css';

export default function ControllerMenu({filters, handleFilters}) {
    const router = useRouter();

    const createOrder = async () => {
        const result = await api.orders.addOrder({});
        if(result.status === 200) router.push(`/admin/orders/${result.data._id}`);
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', color: "#1d1d1d"}}>
            <div style={{height: '50px', padding: '20px', display: 'flex', alignItems: 'center'}}>
                <FolderIcon /><Link href="/admin/orders">Все заказы</Link>
            </div>
            <div style={{height: '50px', padding: '20px', display: 'flex', alignItems: 'center'}}>
                <SettingsIcon /><Link href="/admin/orders/statuses">Менеджер статусов</Link>
            </div>
            <div style={{height: '50px', padding: '20px', display: 'flex', alignItems: 'center'}}>
                <PaymentIcon /><Link href="/admin/orders/paymentMethods">Способы оплаты</Link>
            </div>
            <div style={{height: '50px', padding: '20px', display: 'flex', alignItems: 'center'}}>
                <LocalShippingIcon /><Link href="/admin/orders/shippingMethods">Способы доставки</Link>
            </div>
            <div style={{padding: '20px'}}>
            <FormDialog 
                title={'Создать заказ'}
                action={createOrder}
            />
            </div>

            <div style={{paddingLeft: '20px', display: 'flex', flexDirection: 'column'}}>
            <FormControlLabel
                className={formStyles.formInput}
                control={
                <Switch
                    checked={filters.draft}
                    onChange={e => handleFilters(e, 'draft')}
                    name="draft"
                    color="primary"
                />
                }
                label="Набирается"
            />
            <FormControlLabel
                className={formStyles.formInput}
                control={
                <Switch
                    checked={filters.closed}
                    onChange={e => handleFilters(e, 'closed')}
                    name="closed"
                    color="primary"
                />
                }
                label="Закрытый"
            />
            <FormControlLabel
                className={formStyles.formInput}
                control={
                <Switch
                    checked={filters.paid}
                    onChange={e => handleFilters(e, 'paid')}
                    name="paid"
                    color="primary"
                />
                }
                label="Оплаченный"
            />
            <FormControlLabel
                className={formStyles.formInput}
                control={
                <Switch
                    checked={filters.cancelled}
                    onChange={e => handleFilters(e, 'cancelled')}
                    name="cancelled"
                    color="primary"
                />
                }
                label="Отменённый"
            />
            <FormControlLabel
                className={formStyles.formInput}
                control={
                <Switch
                    checked={filters.delivered}
                    onChange={e => handleFilters(e, 'delivered')}
                    name="delivered"
                    color="primary"
                />
                }
                label="Доставлен"
            />
            <FormControlLabel
                className={formStyles.formInput}
                control={
                <Switch
                    checked={filters.hold}
                    onChange={e => handleFilters(e, 'hold')}
                    name="hold"
                    color="primary"
                />
                }
                label="Заморожен"
            />
            </div>
            </div>
    )
}