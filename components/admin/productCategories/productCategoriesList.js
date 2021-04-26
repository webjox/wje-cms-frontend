import { Checkbox, ListItem } from "@material-ui/core";
import mainStyles from '../../../styles/admin/table.module.css';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

export default function CaregoriesList({categoryData}) {

    const renderColumns = () => {
        const columns = ['', 'Название категории', 'Статус', 'url']
        return columns.map((item, index) => {
            if(index > 0) {
                return <span className={mainStyles.listItem}>{item}</span>
            } else return <span><Checkbox className={mainStyles.listItem} /></span>
        })
    }

    const renderItems = categoryData.map((item, index) => {
        return <ListItem key={index}>
            <Checkbox className={mainStyles.listItem} />
            <span className={mainStyles.listItem}>{item.parent_id ? <span style={{color: 'rgb(25, 118, 210)'}}>{item.name} (подкатегория)</span> : <span>{item.name}</span>} </span>
            <span className={mainStyles.listItem}>{item.enabled.toString() || 'none'}</span>
            <span className={mainStyles.listItem}>{item.slug}</span>
            <div style={{cursor: 'pointer'}}><Link href={`/admin/products/categories/${item._id}`}><EditIcon /></Link></div>
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