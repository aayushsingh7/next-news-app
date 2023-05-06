export async function getStaticProps() {
    console.log("getStaticProps()")
    return {
      props: {
        name:"Aayush Singh",
        email:"aayushsingh@gmail.com"
      }, // will be passed to the page component as props
    }
  }


export default function Newsw ({name , email}) {
 return (
    <>
    <h1>{name}</h1>
    <h2>{email}</h2>
    </>
 )
}