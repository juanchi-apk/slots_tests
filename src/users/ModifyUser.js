import React, {useEffect, useState } from 'react';
import {modifyUser, deleteUser} from '../api/users';
import {getOneUser} from '../api/users'
import UserCard from '../UserCards/UserCard';
import('./modifyUser.scss')



function ModifyUser({formData, closeModal}){

    const [updateFormData, setUpdateFormData] = useState(
        {
            id:"",
            job:"",
            name:"",
        })
    const [userDestroyData, setUserDestroyData] = useState()


    const  handleFormChanges =  (event) =>{
        event.preventDefault();
        console.log(event.target.name)
        console.log(event.target.value)
        setUpdateFormData({...updateFormData, [event.target.name] : event.target.value})

    }

    useEffect(()=>{
        getOneUser(formData.id)
        .then(data=>{
            setUserDestroyData(data)
        })
    },[formData])


    async function handleModifyUser(event) {
      event.preventDefault()
      const modifyData = updateFormData
        if ( modifyData.name==""){
            modifyData.name = formData.firstName
        }
        modifyData.id = formData.id
        console.log(modifyData)
       await modifyUser(updateFormData)
        .then(data=>{
            
            if (data.updatedAt){
                alert("User modify correctly")
                closeModal()

            }

        })
        
    }
    
    async function handleDeleteUser(event) {
        event.preventDefault()
        await deleteUser(formData.id)
          .then(data=>{
            if(data.status=="1"){
                alert(data.result)    
                closeModal()
            }
            })
          }
      
  
    
    return (
        <>
                {formData.type=="modify" && (
                <div className=" mx-auto modifyFormBackground">
                    <form className='modifyFormFields ' onSubmit={handleModifyUser}>
                    
                        <div className="form-group row col-sm-12 mx-auto">
                        <label htmlFor="inputAmount" className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9 btnContainer">
                            <input type="text" className="form-control " name="name" id="name" defaultValue={formData.firstName}    onChange={handleFormChanges}/> 
                        </div>
                         </div>

                    <div className="form-group row col-sm-12 mx-auto">
                        <label htmlFor="inputDetails"  className="col-sm-3 col-form-label">Job</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control " name="job"  placeholder= "Add a Job" id="job" onChange={handleFormChanges}/>
                        </div>
                    </div>

                    <div className="form-group btnContainer">
                            <button type="submit" className="btn btn-primary modifyDeletebtn" >Modify</button>
                    </div>
                    
                </form>
                </div>)}
                {formData.type=="delete" &&(
                    <div className=" mx-auto modifyFormBackground">

                    <form className='modifyFormFields ' onSubmit={handleDeleteUser}>
                    <div className="form-group row col-sm-12 mx-auto">
                        <div className="col-sm-9">
                        <UserCard userData= {userDestroyData} />
                        </div>
                         </div>
                        
                        <div className="form-group row col-sm-12 mx-auto">
                        <div className="col-sm-9">
                            ??Estas Seguro que quiere borrar este usuario?
                        </div>
                         </div>

                    <div className="form-group  btnContainer">
                            <button type="submit" className="btn btn-primary modifyDeletebtn" >Delete</button>
                        </div>
                    
                </form>
                </div>
                    
                )

                }
                
</>
                       
          

    )
 }


export default (ModifyUser);
