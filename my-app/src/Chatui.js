import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";

function Chatui() {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello.",
      sender: "ChatServer"
    }
  ]);

  const hdlSend = async msg => {
    const newMsg = {
      message: msg,
      sender: "user",
      direction: "outgoing"
    };
    const newMsgs = [...messages, newMsg];
    setMessages(newMsgs);
    setTyping(true);
    await sendToChatServer(newMsgs);
  };

  const sendToChatServer = async chatMsgs => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1").then(res => {
      console.log(res.data);
      setMessages([
        ...chatMsgs,
        { message: res.data.title, sender: "ChatServer" }
      ]);
      setTyping(false);
    });
  };

  return (
    <div
      style={{
        padding: 16,
        height: "95vh",
        display: "flex",
        flexFlow: "column"
      }}
    >
      <p style={{ width: 800, margin: "auto" }}>Any question...?</p>
      <MainContainer>
        <ChatContainer>
          <MessageList
            style={{ padding: 8 }}
            typingIndicator={
              typing ? (
                <TypingIndicator
                  style={{ margin: 4, opacity: 0.5 }}
                  content="ChatServer is typing"
                />
              ) : null
            }
          >
            {messages.map((msg, i) => {
              return <Message key={i} model={msg} style={{ marginBlock: 8 }} />;
            })}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={hdlSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Chatui;
