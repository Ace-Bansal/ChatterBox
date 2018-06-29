import React, {Component} from "react";

class NewUserForm extends Component{
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
    this.props.onCreateUser(this.state.term);
    this.setState({
      term: ""
    })
  }

  render(){
    return(
      <form onSubmit={this.onFormSubmit}>
        <input onChange={this.onInputChange} value={this.state.term} type="text" />
        <button>Create User</button>
      </form>
    )
  }
}

export default NewUserForm;
