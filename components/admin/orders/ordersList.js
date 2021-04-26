import { Checkbox, ListItem } from "@material-ui/core";
import mainStyles from '../../../styles/admin/table.module.css';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import { useEffect, useState } from "react";
import PaginationBar from "../paginationBar";

function getTotalCost (order) {
    let cost = 0;
    order.items.map(item => {
        cost += item.price_total
    });
    return cost;
}

export default function OrdersList({ordersData, handlePage}) {
    const [page, setPage] = useState(0);
    const [pageBar, setPageBar] = useState([1, 2, 3]);

    useEffect(() => {
        handlePage(page);
        if(page === pageBar[1]) pageBarHandler(true);
        else if (page >= 0) pageBarHandler(false);
    }, [page])

    const renderColumns = () => {
        const columns = ['', 'Номер заказа', 'Заказчик', 'Сумма заказа']
        return columns.map((item, index) => {
            if(index > 0) {
                return <span className={mainStyles.listItem}>{item}</span>
            } else return <Checkbox className={mainStyles.listItem} />
        })
    }
    
    const localPageHandler = (counter) => {
        if(counter < 0) return;
        else setPage(counter);
    }

    const pageBarHandler = (plus) => {
        setPageBar(prevstate => {
            const array = []
            if(prevstate[1] >= 1) {
                prevstate.forEach(item => {
                    if(plus) array.push(item + 1);
                    else array.push(item - 1);
                })
            }
            return [...array];
        })
    }

    const renderItems = ordersData.map((item, index) => {
        return <ListItem key={index}>
            <Checkbox className={mainStyles.listItem} />
            <span className={mainStyles.listItem}>{item.number || 'none'}</span>
            <span className={mainStyles.listItem}>{item.email || 'none'}</span>
            <span className={mainStyles.listItem}>{getTotalCost(item)}</span>
            <div style={{cursor: 'pointer'}}><Link href={`/admin/orders/${item._id}`}><EditIcon /></Link></div>
        </ListItem>
    })

    return (
        <div>
           <div className={mainStyles.headerContainer}>
               <ListItem>{renderColumns()}</ListItem>
            </div>
           {renderItems}
           <div className={mainStyles.paginationContainer}>
               <PaginationBar data={pageBar} pageHandler={localPageHandler} currentPage={page} />
           </div>
        </div>
    )
}