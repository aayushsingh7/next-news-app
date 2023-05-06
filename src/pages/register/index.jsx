import Link from 'next/link'
import styles from '../../styles/Register.module.css'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { getSession } from 'next-auth/react'
import { Helmet } from 'react-helmet'

export default function Register({ props }) {
    const router = useRouter()
    console.log(router)
    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (router.asPath.includes('error=User%20not%20found')) {
            toast('User not found', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })
        }
    }, [])

    const registerUser = async (e) => {
        e.preventDefault()
        console.log(userInput)
        if (!userInput.email || !userInput.password || !userInput.name) {
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
            let register = await fetch('https://main--frabjous-empanada-bde36e.netlify.app/api/auth/register', { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify(userInput) })
            let response = await register.json()
            console.log(response)
            if (register.status === 200) {
                setLoading(false)
                toast('User registered successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                router.push('/login')
            } else {
                setLoading(false)
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

    const handleBack = () => {
        router.push('/login')
    }


    return (
        <div className={styles.Container}>
            <Helmet>
                <title>Register</title>
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
            <form onSubmit={registerUser} className={styles.Box}>
                <h2>Register</h2>
                <div className={styles.Inputs_Container}>
                    <input type="text" placeholder='Your Name' required onChange={handleInput} name='name' autoComplete='off' />
                    <input type="email" placeholder="Your Email" required onChange={handleInput} name='email' autoComplete='off' />
                    <input type="password" placeholder="Your Password" required onChange={handleInput} name='password' autoComplete='off' />
                    <Button loading={loading} txt={"Register"} loadingTxt={"Registering..."} onClick={registerUser} />

                </div>
            </form>
            <p className={styles.Register_Option}>{"Already have an account?"} <Link href={'/login'}><span>Login</span></Link></p>
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
