import React from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './components/contact/Contact';
import AddContact from './components/addContact/AddContact';
class App extends React.Component{
  state={
    contacts:[],
    isOpen: false,
    editedContact:{},
  };

  /******Modal events *****/
  handleOpen=()=>{
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  handleEditedContact=(contact)=>{
    this.setState({
      editedContact:contact,
    })
  }
  handleResetEditedContact=()=>{
    this.setState({
      editedContact:{},
    })
  }
  /******Modal events *****/

  /******API calls */
  getContacts = () =>{
    axios.get('/contacts').then(response=>
      this.setState({
        contacts:response.data,
      })
      );
  };
  deleteContact = id =>{
    axios.delete(`/delete-contact/${id}`).then(this.getContacts())
  };
  addContact=newContact=>{
    axios.post('/add-contact',newContact).then(this.getContacts())
  };
  updateContact=updatedContact=>{
    axios.put(`/update-contact/${updatedContact.id}`,{firstName:updatedContact.firstName,lastName:updatedContact.lastName,email:updatedContact.email}).then(this.getContacts())
  };
  /**********API Calls */
  componentDidMount(){
    this.getContacts();
  };
  render(){
  return (
    <div className="container-fluid">
      <div className='row welcome'>
        <h1>Welcome to your Contact List</h1>
      </div>
      <div className='row'>
        {this.state.contacts.map((contact,key)=>(
          <Contact contact={contact} key={key}
          deleteContact={this.deleteContact} 
          updateContact={this.updateContact}
          handleEditedContact={this.handleEditedContact}
          toggle={this.handleOpen}
          />
        ))}
      </div>
      <div className='row btn-add'>
        <a href="#" className="btn btn-success" onClick={()=>this.handleOpen()}>Add</a>
      </div>
      {this.state.isOpen?<AddContact 
      toggle={this.handleOpen}
      isOpen={this.state.isOpen}
      addContact={this.addContact}
      updateContact={this.updateContact}
      editedContact={this.state.editedContact}
      handleResetEditedContact={this.handleResetEditedContact}
      />:null}
    </div>
  );
  }
}

export default App;
