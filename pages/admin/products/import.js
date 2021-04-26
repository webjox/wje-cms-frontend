import { Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { useEffect, useState } from "react";
import Header from "../../../components/admin/header";
import api from "../../../server/api";

async function sendXml(data, action) {
    const formData = new FormData();
    formData.append('file', data[0], data[0].name);
    const result = await api.productImport.importProducts(formData);
    if(result.status === 200) {
        action(result.data);
    }
}

export default function Import() {
    const [importStatus, setImportStatus] = useState({});
    const [file, setFile] = useState();


    return (
        <div>
            <Header 
            pageName={"Импорт товаров"}
            backButton
            />

            <div className='container'>
            <DropzoneArea
            onChange={setFile}
            acceptedFiles={['text/xml']}
            filesLimit={1}
            dropzoneText={"Перетащите xml для загрузки"}
            />
            <Button onClick={e => sendXml(file, setImportStatus)} variant="contained" color="primary">Сохранить</Button>
            <div style={{display: 'flex', justifyContent: "center"}}>
                <span style={{margin: 20, fontSize: 25, color: 'green'}}>Success: {importStatus.success_added}</span>
                <span style={{margin: 20, fontSize: 25, color: 'red'}}>Failure: {importStatus.failure_added}</span>
            </div>

            </div>
        </div>
    )
}