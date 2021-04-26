import React from 'react'
import styles from '../styles/componentStyles/serviceCard.module.css';

import Link from 'next/link';

export default function serviceCard({title = 'Загрузка...', link = '/', background = 'pyroshow.png'}) {
    return (
        <div className={styles.wrapper}>
            <Link href={`/infoPages/${link}`}>
                <a>
                    <div className={styles.container} style={{backgroundImage:`url(${background})`,backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:"cover"}}>
                        <p className={styles.title}>{title}</p>
                    </div> 
                </a>
            </Link>
        </div>
    )
}
