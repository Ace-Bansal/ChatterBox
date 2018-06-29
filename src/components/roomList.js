import React, {Component} from "react";

class RoomsList extends Component{
  render(){
    return(
      <ul>
        <h3>Rooms</h3>
        {this.props.rooms.map(room => {
          return(
            <li onClick={() => this.props.onSubscribeToRoom(room.id, room.name)} key={room.id}>
              {room.name}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default RoomsList;
