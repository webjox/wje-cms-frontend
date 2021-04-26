import { AddCircle } from "@material-ui/icons";
import { useEffect, useState } from "react";
import Header from "../../../components/admin/header";
import PagesList from "../../../components/admin/pages/pagesList";
import api from '../../../server/api';
// import 'suneditor/dist/css/suneditor.min.css';


async function getPages() {
    const result = await api.pages.getPages();
    if(result.status === 200) return result.data;
}

async function addPage(action) {
    const body = {
        meta_title: `Default title`,
        meta_description: `Default description`,
        enabled: false,
        slug: randomString(10)
    }
    await api.pages.addPage(body);
    const updatedPages = await api.pages.getPages();
    if(updatedPages.status === 200) action(updatedPages.data);
}

export default function Pages() {
    const [pages, setPages] = useState([]);
    
    useEffect(async() => {
        setPages(await getPages());
    }, [])

    return (
        <div>
            <Header 
            pageName={"Страницы"}
            />
            <PagesList pagesData={pages} />
            <div onClick={e => addPage(setPages)} style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', marginTop: 10}}><AddCircle color='primary' style={{fontSize: 48}} /></div>
        </div>
    )
}

function randomString(i) {
    let rnd = '';
    while (rnd.length < i) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
};