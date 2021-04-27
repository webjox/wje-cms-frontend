
import Accordion from '@material-ui/core/Accordion';
import Slider from '@material-ui/core/Slider';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/componentStyles/filter.module.css';
import globalContext from '../src/state/globalStateContext/context';
import AccordionCheckbox from './AccordionCheckbox';

export default function Filter() {
  const { state } = useContext(globalContext);

  const [hide, setHide] = useState(false);

  const [price, setPrice] = useState([0, 100000]);
  const [volleys, setVolleys] = useState([0, 120]);

  const [effects, setEffects] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [shops, setShops] = useState([]);

  useEffect(async () => {
    let array = await state.getManufacturers();
    array = array.map(item => ({ name: item }));
    setManufacturer(array);
    setEffects(await state.getEffects());
    setShops(await state.getShops());
  }, []);

  useEffect(async () => {
    // TO DO вынеси логику обработки значений в отдельную функцию.
    const idPriceFrom = state.filter.findIndex(item => item[0] === 'pricefrom');
    const idPriceTo = state.filter.findIndex(item => item[0] === 'priceto');
    if (idPriceFrom !== -1) setPrice([state.filter[idPriceFrom][1], state.filter[idPriceTo][1]]);
    const idVolleysFrom = state.filter.findIndex(item => item[0] === 'volleysfrom');
    const idVolleysTo = state.filter.findIndex(item => item[0] === 'volleysto');
    if (idVolleysFrom !== -1)
      setVolleys([state.filter[idVolleysFrom][1], state.filter[idVolleysTo][1]]);
  }, []);

  useEffect(() => {
    // TO DO тоже самое.
    const newFilter = [].concat(state.filter);
    const idPriceFrom = newFilter.findIndex(item => item[0] === 'pricefrom');

    if (idPriceFrom !== -1) {
      newFilter.splice(idPriceFrom, 1);
    }

    const idPriceTo = newFilter.findIndex(item => item[0] === 'priceto');
    if (idPriceTo !== -1) {
      newFilter.splice(idPriceTo, 1);
    }

    const priceFrom = ['pricefrom', String(price[0])];
    const priceTo = ['priceto', String(price[1])];

    newFilter.push(priceFrom);
    newFilter.push(priceTo);
    state.setFilterData(newFilter);
  }, [price]);

  useEffect(() => {
    const newFilter = [].concat(state.filter);
    const idVolleysFrom = newFilter.findIndex(item => item[0] === 'volleysfrom');
    if (idVolleysFrom !== -1) {
      newFilter.splice(idVolleysFrom, 1);
    }

    const idVolleysTo = newFilter.findIndex(item => item[0] === 'volleysto');
    if (idVolleysTo !== -1) {
      newFilter.splice(idVolleysTo, 1);
    }

    const volleysFrom = ['volleysfrom', String(volleys[0])];
    const volleysTo = ['volleysto', String(volleys[1])];

    newFilter.push(volleysFrom);
    newFilter.push(volleysTo);
    state.setFilterData(newFilter);
  }, [volleys]);

  const resetFilters = () => {
    const newFilter = [...state.filter].filter(item => {
      if (item[0] === 'categoryId' || item[0] === 'tags') return true;
    });
    state.setFilterData(newFilter);
    setPrice([0, 100000]);
    setVolleys([0, 120]);
  };

  return (
    <div>
      <div className={styles.toggleWripper}>
        <div
          onClick={() => {
            setHide(!hide);
          }}
          style={hide ? { background: 'rgb(143, 232, 202)' } : {}}
          className={styles.toggler}>
          <div className={styles.togglerCircle} style={hide ? { left: '14px' } : {}} />
        </div>
        <p>Показать фильтры</p>
      </div>

      <div className={styles.wrapper} style={hide ? {} : { left: '-350px' }}>
        <div className={styles.title}>
          <p>Фильтры</p>{' '}
          <button
            onClick={() => {
              setHide(!hide);
            }}>
            <img src="/close.svg" />
          </button>
        </div>

        <div className={styles.filtersWrapper}>
          <Accordion
            classes={{
              root: styles.accordion,
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: styles.accordion,
              }}>
              Цена
            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: styles.accordionInnerSlider,
              }}>
              <div className={styles.values}>
                <div>
                  <input
                    className={styles.inputSlider}
                    type="number"
                    min="0"
                    max="1000"
                    onChange={event => {
                      const newPrice = [].concat(price);
                      newPrice[0] = event.target.value;
                      setPrice(newPrice);
                    }}
                    value={price[0]}
                  />
                  ₽
                </div>
                <div>
                  <input
                    className={styles.inputSlider}
                    type="number"
                    min="0"
                    max="1000"
                    onChange={event => {
                      const newPrice = [].concat(price);
                      newPrice[1] = event.target.value;
                      setPrice(newPrice);
                    }}
                    value={price[1]}
                  />
                  ₽
                </div>
              </div>
              <Slider
                classes={{
                  root: styles.slider,
                  rail: styles.rail,
                  thumb: styles.thumb,
                }}
                value={price}
                min={0}
                step={1000}
                max={100000}
                onChange={(event, newValue) => {
                  setPrice(newValue);
                }}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion
            classes={{
              root: styles.accordion,
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{
                root: styles.accordion,
              }}>
              Кол-во залпов
            </AccordionSummary>
            <AccordionDetails
              classes={{
                root: styles.accordionInnerSlider,
              }}>
              <div className={styles.values}>
                <div>
                  <input
                    className={styles.inputSlider}
                    type="number"
                    min="0"
                    max="1"
                    onChange={event => {
                      const newVolleys = [].concat(volleys);
                      newVolleys[0] = event.target.value;
                      setVolleys(newVolleys);
                    }}
                    value={volleys[0]}
                  />
                </div>
                <div>
                  <input
                    className={styles.inputSlider}
                    type="number"
                    min="0"
                    max="1"
                    onChange={event => {
                      const newVolleys = [].concat(volleys);
                      newVolleys[1] = event.target.value;
                      setVolleys(newVolleys);
                    }}
                    value={volleys[1]}
                  />
                </div>
              </div>
              <Slider
                classes={{
                  root: styles.slider,
                  rail: styles.rail,
                  thumb: styles.thumb,
                }}
                value={volleys}
                min={0}
                step={1}
                max={120}
                onChange={(event, newValue) => {
                  setVolleys(newValue);
                }}
              />
            </AccordionDetails>
          </Accordion>

          <AccordionCheckbox
            title="Производитель"
            filterName="manufacturer"
            fields={manufacturer}
          />
          <AccordionCheckbox title="Эффекты" filterName="effects" fields={effects} />
          <AccordionCheckbox title="Наличие" ilterName="availability" fields={shops} />

          <button className={styles.resetBtn} onClick={resetFilters}>
            Сбросить фильтры
          </button>
        </div>
      </div>
    </div>
  );
}
