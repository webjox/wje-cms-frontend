import { Checkbox, ListItem } from "@material-ui/core";
import mainStyles from '../../../styles/admin/table.module.css';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import { Edit } from "@material-ui/icons";

export default function CaregoriesList({tagsData, saveAction}) {

    const renderColumns = () => {
        const columns = ['', 'Название тэга', 'Позиция']
        return columns.map((item, index) => {
            if(index > 0) {
                return <span className={mainStyles.listItem}>{item}</span>
            } else return <span><Checkbox className={mainStyles.listItem} /></span>
        })
    }

    const renderItems = tagsData.map((item, index) => {
        return <ListItem key={index}>
            <Checkbox className={mainStyles.listItem} />
            <span className={mainStyles.listItem}>{item.name}</span>
            <span className={mainStyles.listItem}>{item.position}</span>
            <div style={{cursor: 'pointer'}}><Link href={`/admin/products/tags/${item._id}`}><Edit /></Link></div>
        </ListItem>
    })

    return (
        <div>
           <div className={mainStyles.headerContainer}>
               <ListItem>{renderColumns()}</ListItem>
            </div>
           {renderItems}
        </div>
    )
}