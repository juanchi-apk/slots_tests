import React, { useState   } from 'react';
import { createUser} from '../api/users';

import('./userCreate.scss')

const newUserForm = {
    name:"",
    job:""
}

function UserCreate({closeModal}) {
    const [newUserData, setNewUserData] = useState(newUserForm)
    
    const  handleFormChanges =  (event) =>{
        event.preventDefault();
        setNewUserData({...newUserData, [event.target.name] : event.target.value})
    }

    
    async function handleCreateUser(event) {
      event.preventDefault()
      console.log(newUserData);
      await createUser(newUserData)
      .then(data=>{
        console.log(data) 
        if(data.status=="1"){ 
            alert("user Correctly Created")
          closeModal()
        }
      })
           
   }

    return (
      
            <div className="mx-auto formBackground">
                <form className='formFields ' onSubmit={handleCreateUser}>
                    <div className="form-group row col-sm-12 mx-auto text-center">
                        Ingrese los datos del nuevo usuario
                    </div>
                    <div className="form-group row col-sm-12 mx-auto">
                        <label htmlFor="inputAmount" className="col-sm-3 col-form-label">User name</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control " name="name" id="name" placeholder="Your Name" onChange={handleFormChanges}/>
                        </div>
                    </div>
                    <div className="form-group row col-sm-12 mx-auto">
                        <label htmlFor="inputDetails" className="col-sm-3 col-form-label">User job</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control " name="job" id="job" placeholder="Your Job" onChange={handleFormChanges}/>
                        </div>
                    </div>
                    <div className="form-group">
                                        <button type="submit" className="btn btn-success btn-lg btn-block signup-btn">Crear</button>
                    </div>

                </form>
            </div>
     
    
     )}
    
export default UserCreate;
