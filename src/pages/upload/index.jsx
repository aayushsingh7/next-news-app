import React, { useRef, useState } from 'react'
import styles from '../../styles/Upload.module.css'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { AiOutlineClose, AiOutlineCloudUpload } from 'react-icons/ai'
import { getSession } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from 'react-helmet'

const UploadNews = () => {
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null);
  const textareaRef = useRef(null)
  const form = useRef(null)
  const [txt, setTxt] = useState("")
  const [tags, setTags] = useState([])
  const [userInput, setUserInput] = useState({
    title: "",
    discription: "",
    image: "",
    tags: [],
    subtitle: ""
  })

  const uploadNews = async (e) => {
    if(!userInput.title || !userInput.discription || !userInput.image || !userInput.tags || !userInput.subtitle){
      return ( toast('Please enter all the information', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        }))
    }
    e.preventDefault()
    setLoading(true)
    try {
      let formData = new FormData(form.current)
      formData.append('tags', JSON.stringify(tags))
      console.log("FORMDATA", formData)
      let addNews = await fetch("https://main--frabjous-empanada-bde36e.netlify.app/api/post", { method: "POST", credentials: "include", body: formData,header:{"Content-Type":"multipart/form-data"} })
      let response = await addNews.json()
      console.log(response)
      if (addNews.ok) {
        setLoading(false)
        toast('News uploaded successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        console.log(response)
      } else {
        toast(`${response.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)

    }
  }

  const removeTag = (name) => {
    setTags((tag) => tag.filter((itemname) => itemname !== name))
  }

  const handleUserInput = (e) => {
    setUserInput((old) => {
      return { ...old, [e.target.name]: e.target.value }
    })
  }

  const textAreaHeight = (e) => {
    setUserInput((old) => {
      return { ...old, [e.target.name]: e.target.value }
    })
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }


  const handleImageUpload = (e) => {
    setUserInput((old) => {
      return { ...old, [e.target.name]: e.target.value }
    })
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };


  const createTags = (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        setTags([...tags, txt])
        setTxt("")
    }
}



  return (
    <form className={styles.Container} onSubmit={uploadNews} encType='multipart/form-data' ref={form}>
       <Helmet>
        <title>Upload News</title>
      </Helmet>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
      <div className={styles.Box}>
        <h2>Upload News</h2>
        <div className={styles.Image}>
          {
            previewImage !== null ? <AiOutlineClose className={styles.close} onClick={() => setPreviewImage(null)} /> : null
          }

          {
            previewImage !== null ? <Image src={previewImage} alt="News Image" className={styles.News_Thumbnail_Image} width={1000} height={1000} /> : <label htmlFor='uploadImage'><AiOutlineCloudUpload style={{ fontSize: "100px", color: "blue", cursor: "pointer" }} /></label>
          }
          <input type="file" name='image' id="uploadImage" onChange={handleImageUpload} style={{ display: "none" }} />
        </div>
        <div className={styles.Details}>
          <input type="text" placeholder='Enter News Title' name='title' required maxLength={"120"} value={userInput.title} onChange={handleUserInput} />
          <input type="text" placeholder='Enter News Sub Title (Optional)' name='subtitle' value={userInput.subtitle} onChange={handleUserInput} style={{ marginTop: "20px" }} />
          <textarea placeholder='Enter News Discription' id='textarea' name="discription" required value={userInput.discription} onChange={textAreaHeight} ref={textareaRef}></textarea>
          <div className={styles.tags_container}>
            <div className={styles.tagsssss}>
              {tags.map((tag, index) => {
                return <p className={styles.tags} key={index}>{tag} <AiOutlineClose style={{ position: "absolute", right: "4%", top: "26%", cursor: "pointer" }} onClick={() => removeTag(tag)} /></p>
              })}
            </div>
            <input type="text" placeholder="Enter Tags" value={txt} name='tags' onChange={(e) => setTxt(e.target.value)}   onKeyDown={createTags} />
          </div>
        </div>
        <Button txt={"Upload news"} loadingTxt='Uploading...' loading={loading} />
      </div>
    </form>
  )
}



export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}



export default UploadNews