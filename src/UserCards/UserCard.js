import React from "react"
const UserCard = ({userData})=>{

console.log(userData)
    return(
    <>
         {!userData && (
            <div className= "card">Clickee en Ver para mostrar los datos de un usuario</div>
        
        )}

       {userData  &&(
        <div className="card" style={{width: "18rem"}}>
         <img className="card-img-top" src={userData.avatar} alt="Card cap"/>
        {<div className="card-body">
        <h5 className="card-title">{`${userData.first_name} ${userData.last_name}`}</h5>
        <p className="card-text">{userData.email}</p>
         
    </div>
    }
    </div>
  
  )} 
    </>  
)
}






export default (UserCard)