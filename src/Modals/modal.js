import CloseIcon from '@mui/icons-material/Close';
import "./modal.scss";


const Modal= ({children, isOpen, closeModal})=>{




    return(
 <article className= {`modal ${isOpen&&'isOpen'}`} >
<div className="modalContainer">

<div className='btnContainer'>
    <button className="modal-close btn-primary" onClick={closeModal}><CloseIcon/></button>
    
</div>
{children}
</div>

 </article>
 
 
)
}

export default Modal
