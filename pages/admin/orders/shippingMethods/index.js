import { useEffect, useState } from 'react';
import api from '../../../../server/api';
import Header from "../../../../components/admin/header";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ShippingMethodsList from '../../../../components/admin/orders/shippingMethodsList';

async function getMethods() {
    const result = await api.shippingMethods.getShippingMethods();
    if(result.status === 200) return result.data;
}

async function addMethod(action) {
    await api.shippingMethods.addShippingMethod();
    const result = await getMethods();
    action([...result]);
}

export default function PaymentMethods () {
    const [methods, setMethods] = useState();
    
    useEffect(async () => {
        setMethods(await getMethods());
    }, [])

    return (
        <div>
        <Header 
            pageName={`Методы доставки`} 
            backButton={true}
        />
        <div style={{display: 'flex', justifyContent: 'center'}}><ShippingMethodsList methodsData={methods} /></div>
        <div onClick={e => {addMethod(setMethods)}} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}}><AddCircleIcon color='primary' style={{fontSize: 48}} /></div>

        </div>
    );
}