import Image from "next/image"
import { useRouter } from "next/router"
import styles from '../../styles/NewsPage.module.css'
import Box from "@/components/ui/Box"

// if there is more than 1 query in the route we can u se [...all].js  
// example :- /example-route?name=name&email=email

// export async function getStaticProps() {
//     return {
//       props: {
//         name:"Aayush Singh",
//         email:"aayushsingh@gmail.com"
//       }, // will be passed to the page component as props
//     }
//   }



export async function getServerSideProps(context) {

  const news = await fetch(`https://famous-strudel-cd5544.netlify.app/api/getSingleNews?newsId=${context.query.newsId}`, { method: "GET", credentials: "include" })
  let response = await news.json()


  const relatedNews = await fetch(`https://famous-strudel-cd5544.netlify.app/api/getRelatedNews?tags=${JSON.stringify(response.data.tags)}`, { method: "GET", credentials: "include" })
  let relatedNewsResponse = await relatedNews.json()

  const latestNews = await fetch('https://famous-strudel-cd5544.netlify.app/api/getLatestNews', { method: "GET", credentials: "include" })
  let latestNewsResponse = await latestNews.json()
  console.log("LATEST NEWS RESPONSE", latestNewsResponse)

  return {
    props: {
      response: response.data,
      relatedNews: relatedNewsResponse.data.filter((data) => data._id !== context.query.newsId) || [],
      latestNews: latestNewsResponse.data || []
    }
  }
}


export default function NewsId({ response, relatedNews, latestNews }) {
  const router = useRouter()
  // console.log(router.query.newsId)
  console.log(response.tags)
  console.log("Related News", relatedNews)
  // console.log(relatedNews)

  console.log(`https://famous-strudel-cd5544.netlify.app/api/getRelatedNews?tags=${JSON.stringify(response.tags)}`)

  return (
    <div className={styles.News_Container}>
      <div className={styles.News}>
        <div className={styles.News_Image}>
          <Image src={response.image} alt="News Image" className={styles.News_Thumbnail_Image} width={1000} height={1000} />
        </div>
        <div className={styles.New_Details_Container}>
          <div className={styles.Category}>
            {
              response.tags.map((tag) => {
                return (
                  <p className={styles.News_Category_Tags} key={tag}>{tag}</p>
                )
              })
            }
          </div>

          <h2 className={styles.News_Heading}>{response.title}</h2>
          <h2 className={styles.News_Subtitle_Heading}>{response.subtitle}</h2>

          <pre className={styles.News_Peragraph}>{response.discription}</pre>
        </div>

      </div>

      <div className={styles.Recommended_News}>
        {
          relatedNews.length > 0 ?
            <div>
              <h2 style={{marginBottom:"15px"}}>More news like this</h2>
              {
                relatedNews.map((data) => {
                  return (
                    <Box key={data._id} data={data} />
                  )
                })
              }
            </div> : null
        }

        <h2>Read Latest News</h2>

        {
          latestNews.filter((data) => data._id !== router.query.newsId).map((data) => {
            return (
              <Box key={data._id} data={data} />
            )
          })
        }

      </div>

    </div>
  )
}
