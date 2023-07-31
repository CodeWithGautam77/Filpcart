export default function Loder(props) {
   
    const { isLoding } = props
 
    if(isLoding){
     return (
         <div className="container">
             <div className="d-flex justify-content-center align-items-center flex-column" style={{width:"100%" , height:"100vh",background:"red",zIndex:"1000",position:"absolute",left:"0"}}>
             <div className="spinner-border" role="status" style={{width:"5rem",height:"5rem"}}>  
                 <span className="visually-hidden">Loading...</span>
             </div>  
             <br />
             <h1>Loading...</h1>
             </div>
         </div>
     )
    }
    return "" 
 }