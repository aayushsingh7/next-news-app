import Navbar from "@/layout/Navbar";
import "../styles/main.css";
import { SessionProvider, getSession } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  return (
    <SessionProvider session={pageProps.session}>
      <>
        {" "}
       {router.pathname.startsWith('/login') || router.pathname.startsWith("/register") ? null :  <Navbar />}
        <div className="Content-Container">
          <div className="App" style={router.pathname.startsWith('/login') || router.pathname.startsWith("/register") ? {paddingTop:"0px"} : {paddingTop:"70px"}}>
            <Component {...pageProps} />
          </div>
        </div>
      </>
    </SessionProvider>
  );
}
