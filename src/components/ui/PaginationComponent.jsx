import React from 'react'
import styles from '../../styles/PaginationComponent.module.css'

const PaginationComponent = ({ next , current , prev ,  response}) => {
  return (
    <div className={styles.Parent_Container}>
      <div className={styles.Container}>
       <button className={response.previous ? `${styles.Prev}` : `${styles.Prev} ${styles.disabled}`} onClick={prev}>Prev</button> 
        <div className={styles.Pages}>
        <div className={`${styles.Pages_Buttons} ${styles.active}`}>{current}</div>
        </div>
     <button className={response.next ? `${styles.Next}` : `${styles.Next} ${styles.disabled}`} onClick={next}>Next</button>
       
      </div>
    </div>
  )
}

export default PaginationComponent