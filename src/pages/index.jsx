import Box from '@/components/ui/Box'
import styles from '../styles/Home.module.css'
import PaginationComponent from '@/components/ui/PaginationComponent'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { Helmet } from 'react-helmet'

const Home = ({ response })=>  {

  const [currentPage, setCurrentPage] = useState(1);
  const [data , setData] = useState(response)
  const { data:session} = useSession()
  

//   const handleSignOut = async()=> {
//   try{
//    signOut()
//   }catch(err){
// console.log(err)
//   }}


  const fetchNews = async (page) => {
    try {
      let data = await fetch(`https://famous-strudel-cd5544.netlify.app/api/getAllNews?page=${page}`, { method: "GET", credentials: "include" });
      let response = await data.json();
     setData(response)
    } catch (error) {}
  };

  const handleNextPage = async () => {
    scrollTo(0,0)
    const nextPage = currentPage + 1;
    await fetchNews(nextPage)
    setCurrentPage(nextPage);
  };

  const handlePrevPage = async () => {
    scrollTo(0,0)
    const nextPage = currentPage - 1;
    await fetchNews(nextPage);
    setCurrentPage(nextPage);
  };



  return (
     <div className={styles.Container}>
       <Helmet>
        <title>Newstic.com</title>
      </Helmet>
      <div className={styles.News_Feed_Container}>
       {
        data.data?.map((data)=> {
          return <Box key={data._id} data={data}/>
        })
       }
      </div>
      <PaginationComponent next={handleNextPage} response={data}  current={currentPage} prev={handlePrevPage}/>
     </div>
  )
}

export const getServerSideProps = async()=> {
  try {
    let data = await fetch(`https://famous-strudel-cd5544.netlify.app/api/getAllNews?page=${1}`,{method:"GET",credentials:"include"})
    let response = await data.json()
    return {
      props:{
        response:response
        }
    }
  } catch (error) {}
}

export default Home;
