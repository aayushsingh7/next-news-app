import Link from 'next/link'
import styles from '../../styles/Login.module.css'
import Button from '@/components/ui/Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Helmet } from 'react-helmet';


export default function Login({ props }) {

    const router = useRouter()
    const [userInput, setUserInput] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const loginUser = async (e) => {
        e.preventDefault()
        if (!userInput.email || !userInput.password) {
            return (toast('Please enter all the information', {
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
        try {
            setLoading(true)
            const response = await signIn('credentials', {
                redirect: false,
                email: userInput.email,
                password: userInput.password,
                callbackUrl: "/"
            })

            console.log(response)
            setLoading(false)
            if (response.ok) {
                router.push(response.url)
                toast('User logged in successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                toast(`${response.error}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const handleInput = async (e) => {
        setUserInput((data) => {
            return { ...data, [e.target.name]: e.target.value }
        })
    }

    const handleGoogleSignIn = async () => {
        try {
            await signIn('google', { callbackUrl: "https://famous-strudel-cd5544.netlify.app" });
        } catch (err) {
            console.log(err)
        }
    };


    const handleGithubSignIn = async () => {
        try {
            signIn('github', { callbackUrl: "https://famous-strudel-cd5544.netlify.app" })
        } catch (err) {
            console.log(err)
        }
    }


    const handleBack = () => {
        router.push('/')
    }



    return (
        <div className={styles.Container}>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <AiOutlineArrowLeft className={styles.arrow} onClick={handleBack} />
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
            <form className={styles.Box} onSubmit={loginUser}>
                <h2>Login</h2>
                <div className={styles.Inputs_Container}>
                    <input type="email" placeholder="Your Email" required autoComplete='off' name='email' onChange={handleInput} value={userInput.email} />
                    <input type="password" placeholder="Your Password" required autoComplete='off' name='password' onChange={handleInput} value={userInput.password} />
                    <Button loading={loading} loadingTxt='Logging in...' txt={"Login"} onClick={loginUser} />
                    <p className={styles.seprator}>--------------------- or ----------------------</p>
                    <button type="button" onClick={handleGoogleSignIn} className={styles.Social_Media_signIn}>
                        <img src="/google.png" alt="logo" style={{ height: "25px", marginRight: "10px" }} /> Signin with Google</button>
                    <button type="button" onClick={handleGithubSignIn} className={styles.Social_Media_signIn}>  <img src="github-2.png" alt="logo" style={{ height: "28px" }} /> Signin with GitHub</button>
                </div>
            </form>
            <p className={styles.Register_Option}>{"Doesn't have an account?"} <Link href={'/register'}><span>Register</span></Link></p>
        </div>
    )
}

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req })
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: { session }
    }
}
