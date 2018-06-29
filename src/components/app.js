import React, { Component } from 'react';
import Chatkit from "@pusher/chatkit";

import MessageList from "./messageList";
import SendMessageForm from "./sendMessageForm";
import RoomsList from "./roomList";
import NewRoomForm from "./newRoomForm";
import NewUserForm from "./newUserForm";


export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      currentRoom: {},
      currentUser: "ekansh1"
    }
  }

  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:58921d9d-78b9-42a6-b55c-96037781ee1e',
      userId: this.state.currentUser,
      tokenProvider: new Chatkit.TokenProvider({ url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/58921d9d-78b9-42a6-b55c-96037781ee1e/token'
        })
      })
      chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser;

            this.currentUser.getJoinableRooms()
              .then(joinableRooms => {
                this.setState({
                  joinableRooms,
                  joinedRooms: this.currentUser.rooms
                })
              })
        })
  }

  sendMessage = text => {
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.currentRoom.id
    })
  }

  onSubscribeToRoom = (roomId, roomName) => {
    this.setState({
      messages: []
    })
    this.currentUser.subscribeToRoom({
      roomId,
      hooks: {
          onNewMessage: message => {
              console.log('message.text: ', message.text);
              console.log('message.senderId: ', message.senderId);

              this.setState({
                messages: [...this.state.messages, message]
              })
          }
      }
    })
    .then(room => {
      console.log("subscribed to:", room.name );
      this.setState({
        currentRoom: room
      })
    })
  }

  onCreateRoom = name => {
    this.currentUser.createRoom({
      name
    }).then(room => {
        this.setState({
          joinableRooms: [...this.state.joinableRooms, room]
        })
        this.onSubscribeToRoom(room.id, room.name)
      })
  }

  onCreateUser = name => {
    console.log("new user", name);
    this.setState({
      currentUser: name
    })
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={(text) => this.sendMessage(text)}/>
        <RoomsList onSubscribeToRoom={(id, name) => this.onSubscribeToRoom(id, name)} rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <NewRoomForm createRoom={(name) => this.onCreateRoom(name)}/>
        <NewUserForm onCreateUser={(name) => this.onCreateUser(name)}/>
      </div>
    );
  }
}
