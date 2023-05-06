import styles from '../../styles/Button.module.css'

export default function Button ({ loading , txt , loadingTxt = "Loading...", onClick}) {
    return (
        <button   type="submit" className={loading ? `${styles.Dynamic_Global_Button} ${styles.loading}` : `${styles.Dynamic_Global_Button}`} onClick={onClick}>{loading ? loadingTxt : txt}</button>
    )
}