import Box from '@/components/ui/Box'
import styles from '../styles/Home.module.css'
import PaginationComponent from '@/components/ui/PaginationComponent'
import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { Helmet } from 'react-helmet'

const Home = ({ response })=>  {

  const [currentPage, setCurrentPage] = useState(1);
  const [data , setData] = useState(response)
  console.log(response)

  const { data:session} = useSession()
  console.log("User Data",session)
  

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
      console.log("RESPONSE FROM FETCH NEWS",response);
     setData(response)
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = async () => {
    console.log("HandleNextPage")
    scrollTo(0,0)
    const nextPage = currentPage + 1;
    await fetchNews(nextPage)
    setCurrentPage(nextPage);
    // console.log("NEW DATA FROM HANDLE PREV PAGE",newData)

    // setData(newData);
  };

  const handlePrevPage = async () => {
    console.log("HandlePrevPage")
    scrollTo(0,0)
    const nextPage = currentPage - 1;
    await fetchNews(nextPage);
    setCurrentPage(nextPage);
    // console.log("NEW DATA FROM HANDLE PREV PAGE",newData)
    // setData(newData);
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
    console.log("Get server side props")
    let data = await fetch(`https://famous-strudel-cd5544.netlify.app/api/getAllNews?page=${1}`,{method:"GET",credentials:"include"})
    let response = await data.json()
    // console.log(response)
    return {
      props:{
        response:response
        }
    }
  } catch (error) {
    console.log(error)
  }
}

export default Home;
