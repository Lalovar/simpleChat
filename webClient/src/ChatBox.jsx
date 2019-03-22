import React from "react";
import Chip from '@material-ui/core/Chip';

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
                            <div key={chatArray.indexOf(item)}>
                                {
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