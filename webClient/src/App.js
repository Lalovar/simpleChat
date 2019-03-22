/**
 *  File:   App.js
 *  Author: lalovar
 *  URL:    https://github.com/Lalovar/simpleChat/blob/master/webClient/src/App.js
**/ 
import React from "react";
import socketIOClient from "socket.io-client";
import ChatBox from "./ChatBox";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 *  Usage:  This class gets render by index.js.
 *          Every second is asking for data to the server.
 *          Every time we send data we also get new data.
 *          Every time someone else post data we recieve it.
 *          A dialog is render at the beggining if the user is not logged in .
 *          If user is logged in then can start to chat.
**/ 
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // Array to receive all data from server.
      outsideMessage : [],
      // The internal message being typed.
      insideMessage: "",
      // Flag to know if the user is logged in.
      isLogged: false,
      // The nickname of the user to identify it over the chat.
      nickname: ""
    };
  }

  // The URL to point the server.
  URL = "yourURL.com";
  // The socket instance.
  socket = socketIOClient(this.URL);

  // Since component got loaded is going to ask for data to the server every second.
  componentDidMount(){
    setInterval(this.updateData(), 1000);
  }
  
  // The method that retreives the messages from server.
  updateData = () => {
    this.socket.on('message', (outsideMessage) => {
      this.setState({outsideMessage});
    });
  }

  // The method that send data to sockets.
  sendMessage = (event) => {
    // To avoid the Form to refresh the page.
    event.preventDefault();
    // Constant where we build the message object.
    const message = {
      nickname: this.state.nickname,
      message: this.state.insideMessage
    };
    // Here we send the data to the server.
    this.socket.emit('message', message); 
    // The current inside message gets erased once we send it.
    this.setState({insideMessage:""});
  }
  
  // Method that send the order to server to erase the messages.
  deleteChats = () => {
    this.socket.emit('clearMessages'); 
  }

  // Here we handle the message input.  
  handleInputchange = event => {
    // Here we catch the event value. (The current input)
    const insideMessage = event.target.value;
    // And we put it in the state.
    this.setState({insideMessage});
  }
  
  // Here we handle the nickname input from the dialog window.  
  handleNicknameText = (event) => {
    // Here we catch the event value. (The current input)
    const nickname = event.target.value;
    // And we put it in the state.
    this.setState({nickname});
  }
  
  // In this method we handle the "Login" logic.
  // Of course you can do it with database, auth0, tokens and stuff but this is just basic.
  handleLogin = () => {
    // If the nickname is different than empty string.
    if (this.state.nickname !== "" ){
      // We set the isLogged flag to true so the modal disappear.
      this.setState({
        isLogged : true
      });
    }
  }

  render() {
    // The modal that is going to be shown if the user is not logged.
    const dialog =
      <Dialog 
        open={!this.state.isLogged}
        onClose={()=>console.log("se cerró el modal se supone que ya esta logueado")}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Type your nickname</DialogTitle>
        <DialogContent>
          <TextField  
            onChange={ evt => this.handleNicknameText(evt) }
            autoFocus
            margin="dense"
            id="loginNickname"
            label="nickname"
            type="text"
            fullWidth 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleLogin} color="primary">
            Go!
          </Button>
        </DialogActions>
      </Dialog>;

    return (
      <div style={{ textAlign: "center" }}>
      {/* Here we render the modal */}
        {dialog}
        
        {/* If the user is logged in then we render Welcome <nickname>! */}
        {this.state.isLogged ? <h1>Welcome {this.state.nickname}!</h1>:null}
        
        {/* Our ChatBox custom class component where the chats are being render */}
        <ChatBox chatArray={this.state.outsideMessage} myself={this.state.nickname}/>
        <br />
        
        {/* The form to write and send the message */}
        <form onSubmit={ evnt => this.sendMessage(evnt)}>
          <TextField  
            onChange={ evt => this.handleInputchange(evt) }
            id="insideMessage"
            label="Message"
            style={{ margin: 8 }}
            placeholder="Put your message here!"
            fullWidth
            margin="normal"
            value={this.state.insideMessage}
          />
          <br />
          {/* We use a button and a form so the user can simply type enter or clic the button */}
          <Button variant="contained" color="primary" onClick={(event) => this.sendMessage(event)}>
            SEND
          </Button>
        </form>
        <br />
        
        {/* Here we call the function to delete the messages. */}
        <Button variant="contained" color="secondary" onClick={() => this.deleteChats()}>
          Delete chats
        </Button>
      </div>
    );
  }
}