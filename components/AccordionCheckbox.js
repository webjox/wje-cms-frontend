import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MyCheckBox from './MyCheckBox';
import styles from '../styles/componentStyles/filter.module.css';

const AccordionCheckbox = ({ title, filterName, fields }) => (
    <Accordion
      classes={{
        root: styles.accordion,
      }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{
          root: styles.accordion,
        }}>
        {title}
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: styles.accordionInner,
        }}>
        {fields.map((item, index) => (
            <FormControlLabel
              key={index}
              value="end"
              control={<MyCheckBox name={item.name} filterName={filterName} />}
              label={item.name}
              labelPlacement="end"
            />
          ))}
      </AccordionDetails>
    </Accordion>
  );

  export default AccordionCheckbox;