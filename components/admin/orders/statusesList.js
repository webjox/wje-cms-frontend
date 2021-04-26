import { Checkbox, ListItem } from "@material-ui/core";
import mainStyles from '../../../styles/admin/table.module.css';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';

export default function StatusesList({statusesData}) {

    const renderColumns = () => {
        const columns = ['', 'Название', 'Публичность']
        return columns.map((item, index) => {
            if(index > 0) {
                return <span className={mainStyles.listItem}>{item}</span>
            } else return <span><Checkbox className={mainStyles.listItem} /></span>
        })
    }

    const renderItems = statusesData.map((item, index) => {
        return <ListItem key={index}>
            <Checkbox className={mainStyles.listItem} />
            <span className={mainStyles.listItem}>{item.name}</span>
            <span className={mainStyles.listItem}>{item.is_public.toString()}</span>
            <div style={{cursor: 'pointer'}}><Link href={`/admin/orders/statuses/${item._id}`}><EditIcon /></Link></div>
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