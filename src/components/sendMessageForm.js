import React, {Component} from "react";

class SendMessageForm extends Component{
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
    console.log(this.state.term);
    this.props.sendMessage(this.state.term);
    this.setState({
      term: ""
    })
  }

  render(){
    return(
      <form onSubmit={this.onFormSubmit}>
        <input value={this.state.term} onChange={this.onInputChange} type="text" />
        <button type="submit">Send</button>
      </form>
    )
  }
}

export default SendMessageForm;
