import { Button, TextField } from '@material-ui/core';
import styles from '../../../styles/admin/imageCard.module.css';
import formStyles from '../../../styles/admin/form.module.css';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useState } from 'react';

export default function ImageCard({ image, removeAction, updateAlt }) {
  const [alt, setAlt] = useState();

  const handlerChange = e => {
    setAlt(e.target.value);
  };

  return (
    <div className={styles.imageCard}>
      <div onClick={e => removeAction(image._id)}>
        <RemoveCircleIcon
          color="secondary"
          style={{
            position: 'relative',
            top: 45,
            left: '86%',
            cursor: 'pointer',
          }}
        />
      </div>
      <img src={image.url} />
      <TextField
        className={formStyles.formInput}
        label="alt"
        defaultValue={image.alt}
        onChange={handlerChange}
      />
      <Button
        style={{ margin: 10 }}
        onClick={e => updateAlt(image._id, alt)}
        variant="contained"
        color="primary">
        Сохранить
      </Button>
    </div>
  );
}
