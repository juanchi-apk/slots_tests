import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { getUserList } from '../api/dashboard';
import {connect} from 'react-redux';
import UserCreate from '../users/UserCreate';
import UserBoard from '../users/UserBoard';
import { useModal } from '../Hooks/useModal';
import Modal from '../Modals/modal'
import UserCard from '../UserCards/UserCard';
import * as DataFilters from '../constraints/dashboardFormatConstraints'

import("./dashboard.scss");



const Dashboard = ({singleUser, userToken})=>{

    const navigate = useNavigate()
    const [userData, setUserData] = useState()
    const [page, setPage] = useState("1")
    const [pagination, setPagination] = useState("")
    const  [createIsOpen, createOpenModal, createCloseModal] = useModal(false)
 

    useEffect(()=>{
            if(userToken ==""||userToken==undefined){
                alert("Must be Logged to Access the Admin")
                navigate('/')

            }else{
            
            getUserList(page).then(data=>{
                //DataFilters.injectColor(data.data)
                setUserData(DataFilters.injectColor(data.data));
                setPagination(DataFilters.dataPagination(data.total, data.per_page))
            })
        }
    
        }
        ,[page, userToken, navigate])
        

        function handlePage (event){
            event.preventDefault()
            setPage(event.target.value)
        }
        
        return (

    <div className=' row dashboardContainer'>
                
        

         <div className ="col-12 col-lg-4  userCardContainer">
        
         <UserCard userData={singleUser}></UserCard>    
        </div>

        <div  className ="col-12  col-lg-8 userDataContainer">
          <div className = " userListBar row ">
              <div className='col-12'>
            <div className ="col-4">
                <button type="button" className="btn btn-danger createButton" onClick={createOpenModal}> + Crear Usuario</button>
            </div>
        </div>
        </div>
        
        <div className='row '>
        <div className='col-12'>
         {userData&& <UserBoard  userData= {userData}/>}
         </div>
         </div>
         <div className='pageButtonBar row'>
            { (pagination.length>0) && pagination.map(element => {
                return(
                <button 
                type="button" 
                key= {element} 
                className='pageButton btn btn-primary'
                value={element}
                onClick={event=>handlePage(event)}
                >
                {element}
                </button>
                )} )}
        </div>
      
         </div>
        

         <div>

         </div>
         {createIsOpen&&(<Modal  isOpen = {createIsOpen} closeModal = {createCloseModal}>
            {userData&&(<UserCreate  closeModal={createCloseModal}/>)}
         </Modal>)}
    
        </div>
)



}
const mapStateToProps = (state) => {

    return {
        singleUser: state.singleUser,
        userToken: state.userToken

    }
}

export default connect(mapStateToProps)(Dashboard)