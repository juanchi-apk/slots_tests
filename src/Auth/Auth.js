import React, { useState} from 'react';
import {useNavigate } from 'react-router-dom';
import { Parallax} from 'react-parallax';
import Image from '../Assets/Images/background.jpg';
import { Fade } from "react-awesome-reveal";
import { userLogin } from '../api/auth';
import imagelogo from '../Assets/Images/logo.png'
import {Alert} from '@mui/material';
import {connect} from 'react-redux';
import { setUserToken} from "../store/payloads/actions";


import("./Auth.scss");


const formStateData = {
    
    email: "",
    password:"",
};

function Auth({setAuthToken}) {

    const navigate = useNavigate()
    const [formData, setFormData] = useState(formStateData)
    const [errors, setErrors] =useState()
    
    const  handleFormChanges =  (event) =>{
        event.preventDefault();
        setFormData({...formData, [event.target.name] : event.target.value})

    }

     const  handleSubmit = async (event)=> {
            event.preventDefault();
            if(formData.email == "" || formData.password == ""){
                setErrors("Debe completar todos los campos para continuar");
                       
            }else{
            
            const result = await userLogin(formData)
            if(result?.token){
                setAuthToken(result.token)
                navigate('/dashboard')
                
            }
            else{
                switch(result?.error){
                    case "user not found":
                        setErrors("No existe el usuario")
                        break
                    default:
                        setErrors("error desconocido")
                    }
            }    
        }
        }
    

    return (

        <div className='body '>
            <Parallax
                bgImage={Image}
                strength={-400}
                bgImageStyle={{ opacity: '.4 ' }}
                >
                    <Fade direction="left" delay={1000}>
                        <div className='formcontainer'>

                            <div className="signup-form">
                                <form onSubmit={handleSubmit} method="post">
                                <img className="signup_logo" src={imagelogo} alt="logo" />
                                <div className="brandMessage">
                                <h2> Please, log in to access the admin. </h2>
                                </div>

                                    <div className="form-group">
                                        <input type="email" className="form-control input-lg" name="email" placeholder="Email Address" required="required"  onChange={handleFormChanges}  />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control input-lg" name="password" placeholder="Password" required="required"  onChange={handleFormChanges}  />
                                    </div>
                                    <>{errors && <Alert severity="error">{errors}</Alert>}</>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-lg btn-block signup-btn">Login</button>
                                    </div>

                                </form>
                            </div>

                        </div>
                    </Fade>
                 </Parallax>
        </div>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        setAuthToken: function (token) {
            dispatch(setUserToken(token))
        }
  
  
    }
  }

export default connect(null, mapDispatchToProps )(Auth);




