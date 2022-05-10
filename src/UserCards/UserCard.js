import React from "react"
import "./userCard.scss"

const UserCard = ({userData})=>{

console.log(userData)
    return(
    <div className="sideContainer">
         {!userData && (
            <div className= "card userCard">Clickee en Ver para mostrar los datos de un usuario</div>
        
    )}

       {userData  &&(
        <div className="card userCard" style={{width: "18rem"}}>
          <img className="card-img-top" src={userData.avatar} alt="Card cap"/>
          <div className="card-body cardFlexContainer">
            <h5 className="card-title">{`Hi! My name is ${userData.first_name} ${userData.last_name}`}</h5>
            <p className="card-text"> You can contact me anytime, just write me to {userData.email}</p>
          </div>
        </div>)}
    </div>  

  )
}






export default (UserCard)