import React, { Component } from 'react'
import './AddContact.css';
export default class AddContact extends Component {
    constructor(props){
        super(props);
        this.state={
            firstName:Object.entries(this.props.editedContact).length===0?'':this.props.editedContact.firstName,
            lastName:Object.entries(this.props.editedContact).length===0?'':this.props.editedContact.lastName,
            email:Object.entries(this.props.editedContact).length===0?'':this.props.editedContact.email,
        }
}
    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <div className="modal" role="dialog" aria-hidden="false" style={{display:this.props.isOpen?'block':'none'}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{Object.entries(this.props.editedContact).length===0?'Add New Contact':'Update Contact'}</h5>
                    </div>
                    <div className="modal-body">
                        <input type='text' defaultValue={this.state.firstName} placeholder='first name...' name="firstName" onChange={(e)=>this.handleChange(e)}/>
                        <input type='text' defaultValue={this.state.lastName} placeholder='last name...' name="lastName" onChange={(e)=>this.handleChange(e)}/>
                        <input type='email' defaultValue={this.state.email} placeholder='email...' name="email" onChange={(e)=>this.handleChange(e)}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>{this.props.handleResetEditedContact();this.props.toggle()}}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={Object.entries(this.props.editedContact).length===0?()=>{this.props.toggle();this.props.addContact(this.state);}:()=>{this.props.toggle();this.props.updateContact({...this.state,id:this.props.editedContact._id});this.props.handleResetEditedContact()}}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
