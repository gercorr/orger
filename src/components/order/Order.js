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
    this.setState({
      loading: true
    })
    this.props.onDeleteCallback(this.props.Id).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  save(){    
    this.setState({
      loading: true,
      editMode: false
    })
    const data = {
      Id: this.props.Id,
      time: this.props.time,
      details: this.props.value || this.state.value
    }
    this.props.onSaveCallback(data).then(() => {
      this.setState({
        loading: false
      })
    })
  }

  enableEditMode(){
    this.setState({
      editMode: true
    })
  }

  handleEdit(event){
    console.log("EDIT: " + event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    if(this.state.loading){
      return this.renderLoadingMode();
    }
    if(this.state.editMode){
      return this.renderEditMode();
    }

    return this.renderReadMode();
  }

  readableDate(){
    if(this.props.time){
      var date = new Date(this.props.time);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();
      // Seconds part from the timestamp
      var seconds = "0" + date.getSeconds();

      // Will display time in 10:30:23 format
      return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
    return '';
  }

  renderLoadingMode(){
    return (
      <div className='Order'>     
        <div className="Loading">   
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      </div>
    );
  }

  renderReadMode(){
    return (
      <div className={'Order'}>        
        <div className="Time">
          {this.readableDate()}
        </div>
        <div className="Details">
          {this.props.details}
        </div>
        <div className="Actions">
          <button className="btn" onClick={() => this.delete()}><i className="fa fa-trash"></i></button> 
          <button className="btn" onClick={() => this.enableEditMode()}><i className="fa fa-edit"></i></button>
        </div>
      </div>
    );
  }

  renderEditMode(){
    return (
      <div className={'Order'}>
        <div className="Time">
          {this.readableDate()}
        </div>
        <div className="Details">
          <textarea autoFocus value={this.state.value} onChange={(event) => this.handleEdit(event)}/>
        </div>
        <div className="Actions">
          <button className="btn" onClick={() => this.save()}><i className="fa fa-save"></i></button> 
        </div>
      </div>
    );
  }

}

export default Order;
