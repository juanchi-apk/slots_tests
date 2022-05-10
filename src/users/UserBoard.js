import  React,  {useState} from "react";
import { useModal } from "../Hooks/useModal";
import Modal from "../Modals/modal";
import ModifyUser from "./ModifyUser";
import { setSingleUser } from "../store/payloads/actions";
import { connect } from "react-redux";
import {getOneUser} from '../api/users';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import './userBoard.scss'

function UserBoard({userData, setSingleUserData}){

  const [modalData, setModalData] = useState();
  const [isOpen, openModal, closeModal] = useModal(false);
  
  
  
  function handleModify (event, element, id){
    event.preventDefault()
    setModalData({
      firstName: element,
      id:id,
      type:"modify"})
     openModal()


  }

  async function handleShow (event, id){
    event.preventDefault();
    await getOneUser(id).then(data=>{
      setSingleUserData(data)

    })
  }

 function handleDelete (event, name, id ){
  event.preventDefault()
    setModalData({
      name: name,
      id:id,
      type:"delete"})
     openModal()
  

}
 
  
  return(
    <div> 
        <div>
           <table className="table table-hover ">
  <thead className="thead-dark">
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Email</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope ="col">Action</th>
      
    </tr>
  </thead>
  
  <tbody>
      {
          userData.map(element => {
            const fullName=`${element.first_name} ${element.last_name}`
            return (
                <tr className = "transactionClass" key={element.id}>
                <td>{element.id}</td>
                <td>{element.email}</td>
                <td>{element.first_name}</td>
                <td>{element.last_name}</td>
                <td>  
                <button 
                  type="button" 
                  onClick= {(event)=>{handleModify(event, element.first_name, element.id)}}
                  className="btn btn-primary usrbtn"><EditIcon/></button>
               
                <button 
                type="button" 
                className="btn btn-danger usrbtn" 
                onClick= {(event)=>{handleDelete(event, fullName , element.id)}}>
                  <DeleteIcon/>
                </button>
                <button
                 type="button" 
                 className="btn btn-success usrbtn" 
                 value={element.id} onClick= {(event)=>{handleShow(event, element.id)}}>
                <RemoveRedEyeIcon/>
                  </button>
                </td>
                </tr>
                
              )
          })
      } 
  </tbody>
    
  </table>



        </div> 
        {isOpen&&(<Modal  isOpen = {isOpen} closeModal = {closeModal}>
          <ModifyUser formData={modalData} closeModal={closeModal} />
        </Modal>)}
          </div>
    )

}

function mapDispatchToProps(dispatch) {
  return {
      setSingleUserData: function (user) {
          dispatch(setSingleUser(user))
      }


  }
}

export default connect(null, mapDispatchToProps)(UserBoard)