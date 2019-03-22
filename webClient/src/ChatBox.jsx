/**
 *  File:   ChatBox.jsx
 *  Author: lalovar
 *  URL:    https://github.com/Lalovar/simpleChat/blob/master/webClient/src/ChatBox.jsx
**/ 
import React from "react";
import Chip from '@material-ui/core/Chip';

/**
 *  Usage:  This class component get's render by App.js.
 *          We recieve as props:
 *              chatArray: with the array of all messages:
 *                  {
 *                      nickname:   <user nickname as a String>
 *                      message :   <user message as a String>
 *                  }
 *              myself: the current user of the session so we can properly render (style) the messages.
**/ 
export default class ChatBox extends React.Component {
    render() {
        const chatArray = this.props.chatArray;
        const myself = this.props.myself;
        return (
            <div style={{ textAlign: "left" }}>
                { 
                    chatArray.map(
                        item => 
                        (
                            /* Here we map the chatArray */
                            <div key={chatArray.indexOf(item)}>
                                {
                                    /* if the nickname is the same as the current session we align it to the right */
                                    item.nickname === myself ? 
                                        <div style={{ textAlign: "right" }}><Chip color="primary" label={item.message} /></div>
                                        :
                                        <div>{item.nickname}<Chip label={item.message} /></div>
                                }
                                <br />
                            </div>
                        ) 
                    ) 
                }
            </div>
        );
    }
}