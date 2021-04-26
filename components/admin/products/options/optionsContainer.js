import styles from '../../../../styles/admin/options.module.css';
import OptionCard from './optionCard';

export default function OptionsContainer({data, removeAction, updateAction, numbers=false, disableName=false}) {
    const renderCards = () => {
        return data.map((item, index) => {
            return <OptionCard 
                numbers={numbers} 
                disableName={disableName} 
                removeAction={removeAction} 
                option={item} 
                key={index} 
                updateAction={updateAction}
                />
        })
    }

    return (
        <div className={styles.optionsContainer}>
            {renderCards()}
        </div>
    )
}