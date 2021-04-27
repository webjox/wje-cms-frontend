import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styles from '../../styles/admin/table.module.css';

export default function PaginationBar({ data, pageHandler, currentPage }) {
  const renderSelectors = () => {
    if (Array.isArray(data)) {
      return data.map(item => {
        if (item > 0)
          return (
            <span onClick={e => pageHandler(item - 1)} className={styles.paginationItem}>
              {item}
            </span>
          );
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', fontSize: 20 }}>
      <span onClick={e => pageHandler(currentPage - 1)} className={styles.paginationItem}>
        <NavigateBeforeIcon />
      </span>
      {renderSelectors()}
      <span onClick={e => pageHandler(currentPage + 1)} className={styles.paginationItem}>
        <NavigateNextIcon />
      </span>
    </div>
  );
}
