import { TextField, Button } from '@material-ui/core';
import formStyles from '../../../../styles/admin/form.module.css';
import styles from '../../../../styles/admin/options.module.css';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { useState } from 'react';

export default function OptionCard({
  option,
  removeAction,
  updateAction,
  numbers,
  disableName = false,
}) {
  const [name, setName] = useState(option.name);
  const [value, setValue] = useState(option.value);

  const handlerChange = (e, action) => {
    action(e.target.value);
  };

  return (
    <div className={styles.optionCard}>
      <TextField
        className={formStyles.formInput}
        id="option_name"
        disabled={disableName}
        type="text"
        label={numbers ? 'Название магазина' : 'Название опции'}
        defaultValue={option.name}
        onChange={e => handlerChange(e, setName)}
      />
      <TextField
        className={formStyles.formInput}
        id="option_value"
        type={numbers ? 'number' : 'text'}
        label={numbers ? 'Колличество товара' : 'Значение опции'}
        defaultValue={numbers ? option.quantity : option.values[0]}
        onChange={e => handlerChange(e, setValue)}
      />
      <div onClick={e => removeAction(option._id)}>
        <RemoveCircleIcon
          color="secondary"
          style={{
            position: 'relative',
            top: 45,
            cursor: 'pointer',
          }}
        />
      </div>
      <Button
        onClick={e => updateAction(option._id, { name: name, value: value })}
        variant="contained"
        color="primary"
        style={{
          position: 'relative',
          height: 30,
          top: 44,
        }}>
        Сохранить
      </Button>
    </div>
  );
}
