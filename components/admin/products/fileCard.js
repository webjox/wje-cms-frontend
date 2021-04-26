import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Link from 'next/link';
import styles from '../../../styles/admin/fileCard.module.css';

export default function FileCard ({file, removeAction}) {

    return (
        <div className={styles.fileCard}>
             <Link targe href={file.url}><a target="_blank">{file.filename}</a></Link>
            <div onClick={e => removeAction(file._id)} ><RemoveCircleIcon color="secondary" /></div>
        </div>
    )
}