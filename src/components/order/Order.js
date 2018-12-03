import React, { Component } from 'react';
import './Order.css';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      editMode: props.editMode,
      value: props.details
    };
  }
  
  delete(){
    console.log("DELETE:" + this.props.id);
    this.props.onDeleteCallback(this.props.id);
  }

  save(){
    console.log("SAVE: " + this.props.id);
    this.setState({
      editMode: false
    })
    this.props.onSaveCallback(this.props.id, this.state.value);
  }

  enableEditMode(){
    console.log("EDIT: " + this.props.id);
    this.setState({
      editMode: true
    })
  }

  handleEdit(event){
    console.log("EDIT: " + event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    if(this.state.editMode){
      return this.renderEditMode();
    }

    return this.renderReadMode();
  }

  renderReadMode(){
    return (
      <div className={'Order'}>
        <div className="Time">
          {this.props.time}
        </div>
        <div className="Id">
          {this.props.id}
        </div>
        <div className="Details">
          {this.props.details}
        </div>
        <div className="Actions">
          <button onClick={() => this.enableEditMode()}>Edit</button> 
          <br/>
          <button onClick={() => this.delete()}>Delete</button> 
        </div>
      </div>
    );
  }

  renderEditMode(){
    return (
      <div className={'Order'}>
        <div className="Time">
          {this.props.time}
        </div>
        <div className="Details">
          <textarea autoFocus value={this.state.value} onChange={(event) => this.handleEdit(event)}/>
        </div>
        <div className="Actions">
          <button onClick={() => this.save()}>Save</button> 
        </div>
      </div>
    );
  }

}

export default Order;
