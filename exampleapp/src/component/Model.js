import React, { useState , useEffect } from 'react';
import ReactDOM from 'react-dom';


function Modal ({ isShowing, hide , addItems , updateItem}){
  const [obj , setValue ] = useState({})
  const [file , setFile] = useState('')
  useEffect(() => {
    setValue({
      id : updateItem.id || "",
      author : updateItem.author || "",
      name : updateItem.name || "" ,
      imgUrl : updateItem.imgUrl || ""
    })
  }, [updateItem])


  const handleOnchange = (event) => {
    const {name , value} = event.target;
    setValue({...obj , [name] : value})
  }

  const handleOnChangeFileName = (event) => {
    setValue({...obj , imgUrl : "images/" + event.target.files[0].name})
    setFile(event.target.files[0])
  }
  const handlelSubmit = async (event) => {
    event.preventDefault();
    addItems(obj , file);
    hide();
  }

  return ( isShowing ? ReactDOM.createPortal(
  
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {(!updateItem.id && <b>Add new book</b> ) || <b>Update book</b>}

        <form onSubmit = {handlelSubmit}>
          <span>Author </span>
          <input type="text" value = {obj.author} name = "author" className = "input-author" onChange = {handleOnchange}/>
          <br/>
          <span>Title </span>
          <input type="text" value = {obj.name} name = "name" className = "input-title" onChange = {handleOnchange}/>
          <br/>
          <br/>
          <span>Images - </span>
          <input type="file" className = "input-file" onChange ={handleOnChangeFileName}/>
          <br/>
          <br/>
          {(!updateItem.id && <button type = "submit"> Add </button> ) || <button type = "submit"> Update </button>}
        </form>
      </div>
    </div>
  </React.Fragment>, document.body
) : null
)}
export default Modal;