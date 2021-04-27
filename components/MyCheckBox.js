import Checkbox from '@material-ui/core/Checkbox';
import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../src/state/globalStateContext/context';
import styles from '../styles/componentStyles/filter.module.css';

const MyCheckBox = ({ name, filterName }) => {
    const { state } = useContext(globalContext);
  
    const [checked, setChecked] = useState(false);
  
    useEffect(() => {
      for (const item of state.filter) {
        if (name === item[1]) {
          setChecked(true);
          break;
        } else setChecked(false);
      }
    }, [state.filter]);
  
    const changeFilters = event => {
      const data = event.target.dataset.value;
      const {name} = event.target;
      const prevFilter = state.filter;
      const newFilter = [].concat(prevFilter);
      if (event.target.checked) {
        newFilter.push([data, name]);
        state.setFilterData(newFilter);
      } else {
        const i = newFilter.findIndex(item => item[1] === name);
        newFilter.splice(i, 1);
        state.setFilterData(newFilter);
      }
      setChecked(!checked);
    };
  
    return (
      <Checkbox
        checked={checked}
        name={name}
        inputProps={{ 'data-value': filterName }}
        onChange={changeFilters}
        icon={<div className={styles.icon} />}
        checkedIcon={
          <div className={styles.icon}>
            <div className={styles.checked} />
          </div>
        }
      />
    );
  };

export default MyCheckBox;