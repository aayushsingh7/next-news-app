import Image from "next/image";
import styles from '../../styles/Box.module.css'
import Link from "next/link";

export default function Box({ data }) {
    console.log(data)
    return (
        <Link href={`/news/${data?._id}`} className={styles.Navlinks}>
            <div className={styles.Container}>
                <div className={styles.News_Thumbnail_Container}>
        <Image src={data.image} alt="News Image" className={styles.News_Thumbnail_Image} width={1000} height={1000} />
                </div>
                <div className={styles.Details_Container}>
                    <h2>{data.title}</h2>
                    <p>{data.discription}</p>

                </div>

                {/* <div className={styles.News_Tags_Container}>
                {
                    data.tags?.map((tag)=> {
                        return (
                            <p className={styles.News_Category_Tags} key={tag}>{tag}</p>
                        )
                    })
                }
                </div> */}

            </div>
        </Link>
    )
}