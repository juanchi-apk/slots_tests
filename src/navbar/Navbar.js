
import React from 'react';
import logo from '../Assets/Images/logo.png'
import {connect} from 'react-redux';
import { setUserToken} from "../store/payloads/actions";
import {useNavigate } from 'react-router-dom';

import("./navbar.scss");


function Navbar({userToken, dropToken}) {
    const navigate = useNavigate()


    function logOut (event){
        event.preventDefault()
        dropToken();

        navigate("/")
    }
    
    return(
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <img className = "logoImage" src={logo} alt="logo" />        
                { userToken!=undefined &&(<button className = "btn btn-primary logoutbtn" onClick= {(event)=>(logOut(event))} >LOG OUT </button>)}
            </div>
        </nav>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        dropToken: function () {
            dispatch(setUserToken(undefined))
        }
  
  
    }
  }

  const mapStateToProps = (state) => {

    return {
        userToken: state.userToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)

