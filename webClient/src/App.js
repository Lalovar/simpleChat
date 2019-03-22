/**
 *  File:   App.js
 *  Author: lalovar
 *  URL:    
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

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      outsideMessage : [],
      insideMessage: "",
      isLogged: false,
      nickname: ""
    };
  }

  URL = "yourURL.com";
  socket = socketIOClient(this.URL);

  componentDidMount(){
    setInterval(this.updateData(), 1000);
  }
  
  updateData = () => {
    this.socket.on('message', (outsideMessage) => {
      this.setState({outsideMessage});
    });
  }

  // sending data to sockets
  sendMessage = (event) => {
    event.preventDefault();
    const message = {
      nickname: this.state.nickname,
      message: this.state.insideMessage
    };
    this.socket.emit('message', message); 
    this.setState({insideMessage:""});
  }
  
  deleteChats = () => {
    this.socket.emit('clearMessages'); 
  }
  
  handleInputchange = event => {
    const insideMessage = event.target.value;
    this.setState({insideMessage});
  }
  
  handleNicknameText = (event) => {
    const nickname = event.target.value;
    this.setState({nickname});
  }
  
  handleLogin = () => {
    if (this.state.nickname !== "" ){
      this.setState({
        isLogged : true
      });
    }
  }

  render() {
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
        {dialog}
        
        {this.state.isLogged ? <h1>Welcome {this.state.nickname}!</h1>:null}
        
        <ChatBox chatArray={this.state.outsideMessage} myself={this.state.nickname}/>
        <br />
        
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
          <Button variant="contained" color="primary" onClick={(event) => this.sendMessage(event)}>
            SEND
          </Button>
        </form>
        <br />
        
        <Button variant="contained" color="secondary" onClick={() => this.deleteChats()}>
          Delete chats
        </Button>
      </div>
    );
  }
}