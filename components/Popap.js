import React from 'react';
import styles from '../styles/componentStyles/popap.module.css';

export default function Popap({showPopap, rowTwo,showPopapHandler,title, children, option}) {
    if(option){
        return (
            <div className={styles.shopsPopap} style={showPopap ? {transform: 'scale(1) translate(-50%, -50%)'} : {transform: 'scale(0) translate(-50%, -50%)'}}>
                <div className={styles.popapTitle}>
                    <p>{title}</p>
                    <button onClick={showPopapHandler}><img src='/close.svg'/></button>
                </div>

                <div className={styles.shopWrapper}>
                    <div className={styles.shops}>
                        {children}
                    </div>
                    
                    {rowTwo}
                </div>
                
                {/* <div id="map" style={{width: '600px', height: '400px'}}/> */}
            </div> 
        )
    }
    else{
        return (
            <div className={styles.shopsPopap} style={showPopap ? {transform: 'scale(1) translate(-50%, -50%)'} : {transform: 'scale(0) translate(-50%, -50%)'}}>
            
                    {/* <div className={styles.popapTitle}>
                        <p></p>
                        <button onClick={showPopapHandler}><img src='/close.svg'/></button>
                    </div> */}
                    <div className={styles.shopWrapper2}>
                        {children}
                    </div>
    
            </div> 
        )
    }
}
