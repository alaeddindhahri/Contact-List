import React, { Component } from 'react'
import './Contact.css';
export default class Contact extends Component {
    render() {
        return (
            <div className='col'>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-header">
                        Contact Details
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Name: {this.props.contact.firstName+" "+this.props.contact.lastName}</li>
                        <li className="list-group-item">Email: {this.props.contact.email}</li>
                    </ul>
                    <div className="buttons">
                        <a href="#" className="btn btn-primary" onClick={()=>{this.props.handleEditedContact(this.props.contact);this.props.toggle()}}>Edit</a>
                        <a href="#" className="btn btn-danger" onClick={()=>this.props.deleteContact(this.props.contact._id)}>Delete</a>
                    </div>
                </div>
            </div>
        )
    }
}
