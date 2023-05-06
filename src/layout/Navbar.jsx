import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import {  useRouter } from 'next/router'

export default function Navbar() {
  const { data: session } = useSession()
  console.log("NAVBAR SESSION DAA", session)
  const [show, setShow] = useState(false)
  const router = useRouter()

  const logout = async () => {
    setShow(false)
    signOut()
  }

  return (
    <nav className={styles.Container}>
      <div className={styles.Navbar}>
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: "100", background: "white", height: "100%", padding: "20px" }}>
          <p>Newstic</p>
          <AiOutlineMenu className={styles.menu} onClick={() => setShow(!show)} />
        </div>
        <div className={show ? `${styles.Navlinks_Container} ${styles.show}` : `${styles.Navlinks_Container} ${styles.hide}`}>
          <Link className={styles.Navlinks} style={router.route ==='/' ? {background:"#eeeeee",borderRadius:"10px"} : null}  href={'/'} onClick={()=> setShow(false)}>Home</Link>
          <Link className={styles.Navlinks} href={'/upload'}
           style={router.route.startsWith('/upload') ? {background:"#eeeeee",borderRadius:"10px"} : null}  onClick={()=> setShow(false)}>Upload news</Link>
          {session?.user ? <span className={styles.Navlinks} style={{ cursor: "pointer" }} onClick={logout}>Logout</span> : null}
          {session?.user ? null : <Link className={`${styles.Navlinks} ${styles.login}`} href={'/login'}>Login</Link>}
        </div>
      </div>
    </nav>
  )
}
