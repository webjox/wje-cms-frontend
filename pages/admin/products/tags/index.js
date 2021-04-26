import { AddCircle } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Header from "../../../../components/admin/header";
import api from "../../../../server/api";
import ProductTagsList from '../../../../components/admin/productTags/productTagsList';

async function getTags () {
    const result = await api.productTags.getProductTags();
    if(result.status === 200) {
        return result.data;
    }
}

async function createTag (action) {
    const body = {
        name: 'defaultName'
    };
    const result = await api.productTags.addProductTag(body);
    if(result.status === 200) {
        action(prevstate => {
            prevstate.push(result.data);
            return [...prevstate]
        })
    }
}

export default function ProductTags( ) {
    const [tags, setTags] = useState([]);
    
    useEffect(async () => {
        setTags(await getTags())
    }, [])

    return (
        <div>
        <Header 
            pageName={`Список тэгов`} 
            backButton={true}
        />
        <div style={{display: 'flex', justifyContent: 'center'}}><ProductTagsList tagsData={tags} /> </div>
        <div onClick={e => createTag(setTags)} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer'}}><AddCircle color='primary' style={{fontSize: 48}} /></div>
        </div>
    )
}