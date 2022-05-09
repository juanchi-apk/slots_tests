import  React,  {useState} from "react";
import { useModal } from "../Hooks/useModal";
import Modal from "../Modals/modal";
import ModifyUser from "./ModifyUser";
import { setSingleUser } from "../store/payloads/actions";
import { connect } from "react-redux";
import {getOneUser} from '../api/users'

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

  async function handleShow (event){
    event.preventDefault();
    await getOneUser(event.target.value).then(data=>{
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
           <table className="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Email</th>
      <th scope="col">Nombre</th>
      <th scope="col">Apellido</th>
      <th scope ="col"></th>
      <th scope ="col"></th>
      <th scope ="col"></th>

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
                  className="btn btn-primary">Modificar</button>
                </td>
                <td>
                <button 
                type="button" 
                className="btn btn-danger" 
                onClick= {(event)=>{handleDelete(event, fullName , element.id)}}>Borrar</button>
                </td>
                <td>
                <button type="button" className="btn btn-success" value={element.id} onClick= {(event)=>{handleShow(event)}}>Ver</button>
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
        console.log(user)
          dispatch(setSingleUser(user))
      }


  }
}

export default connect(null, mapDispatchToProps)(UserBoard)