import React, { Component } from 'react';
import './Order.scss';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      editMode: props.editMode,
      value: props.details,
      loading: props.loading
    };
  }
  
  delete(){
    console.log("DELETE:" + this.props.id);
    this.props.onDeleteCallback(this.props.id);
  }

  save(){
    console.log("SAVE: " + this.props.id);
    this.setState({
      editMode: false,
      loading: true
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

  renderLoadingMode(){
    return (
      <div >    
        Loading...
      </div>
    );
  }

  renderReadMode(){
    return (
      <div className={'Order'}>        
        <div className="Time">
          {this.props.time}
        </div>
        <div className="Details">
          {this.props.details}
        </div>
        <div className="Actions">
          <button class="btn" onClick={() => this.delete()}><i class="fa fa-trash"></i></button> 
          <button class="btn" onClick={() => this.enableEditMode()}><i class="fa fa-edit"></i></button>
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
          <button class="btn" onClick={() => this.save()}><i class="fa fa-save"></i></button> 
        </div>
      </div>
    );
  }

}

export default Order;
