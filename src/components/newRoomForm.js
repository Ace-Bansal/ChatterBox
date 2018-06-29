import React, {Component} from "react";

class NewRoomForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      term: ""
    }
  }

  onInputChange = (event) => {
    this.setState({
      term: event.target.value
    })
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.createRoom(this.state.term);
    this.setState({
      term: ""
    })
  }

  render(){
    return(
      <form onSubmit={this.onFormSubmit}>
        <input onChange={this.onInputChange} value={this.state.term} type='text' />
        <button type="submit">Create Room</button>
      </form>
    )
  }
}

export default NewRoomForm;
