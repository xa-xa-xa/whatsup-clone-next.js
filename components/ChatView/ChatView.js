import { useState, useCallback, useRef, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import firebase from "firebase";
// import MicIcon from "@material-ui/icons/Mic";
import styled from "styled-components";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import SendIcon from "@material-ui/icons/Send";

import ChatViewHeader from "../ChatViewHeader/ChatViewHeader";
import Message from "../Message/Message";
import EmojiPicker from "../EmojiPicker/EmojiPicker";
import breakPoints from "../../styles/breakPoints";
import Loading from "../Loading";


const ChatView = ({ messages, chat }) => {
  const [user] = useAuthState(auth);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const inputRef = useRef(null);
  const [bottom, setBottom] = useState(null);
  const [input, setInput] = useState("");
  const route = useRouter();
  const [messagesSnapshot, loading, error] = useCollection(
    db
      .collection("chats")
      .doc(route.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const renderMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs?.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => {
        return (
          <Message key={message.id} user={message.user} message={message} />
        );
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.length) return;

    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );

    db.collection("chats").doc(route.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL
    });

    setInput("");
    scrollToBottom(bottom);
  };

  const scrollToBottom = (node) => {
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const setAndScrollToBottomRef = useCallback((node) => {
    if (node) {
      scrollToBottom(node);
      setBottom(node);
    }
  }, []);

  const handleOpenEmojiPicker = () => {
    setOpenEmojiPicker(!openEmojiPicker);
    inputRef.current.focus();
  };

  // Scroll to bottom once a new chat opened
  useEffect(() => {
    scrollToBottom(bottom);
  }, []);

  // render
  return (
    <ChatContainer>
      <ChatViewHeader user={user} chat={chat} />
      <MessagesContainer>
        {error && <h6>something went wrong...</h6>}
        {loading && <Loading />}
        {renderMessages()}
        <EndOfMessages ref={setAndScrollToBottomRef} />
      </MessagesContainer>

      <InputContainer onSubmit={sendMessage}>
        <IconButton onClick={handleOpenEmojiPicker}>
          <InsertEmoticonIcon />
        </IconButton>
        {openEmojiPicker && (
          <EmojiPicker
            inputRef={inputRef}
            setInput={setInput}
            setOpenEmojiPicker={setOpenEmojiPicker}
          />
        )}

        <Input
          type="text"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton
          type="submit"
          disabled={!input}
          onClick={scrollToBottom(bottom)}
        >
          <SendIcon />
          {/* <MicIcon /> */}
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ChatView;

const EndOfMessages = styled.input`
  display: inline-block;
  visibility: hidden;
  height: 0px;
`;

const Input = styled.input`
  align-items: center;
  padding: 10px;
  min-width: 0;
  flex: 1;
  border: none;
  border-radius: 8px;
  font-size: 1.25em;
  bottom: 0;
  margin: 0 5px;
  background: whitesmoke;
  @media screen and (${breakPoints.device.sm}) {
    margin: 0 10px;
  }
`;

const InputContainer = styled.form`
  display: flex;
  padding: 10px;
  position: sticky;
  @media screen and (${breakPoints.device.sm}) {
    padding: 5px;

  }
`;

const MessagesContainer = styled.section`
  padding: 30px;
  background-color: #e5ded8;
  overflow-y: scroll;
  height: calc(100vh - 150px);
  @media screen and (${breakPoints.device.sm}) {
    height: calc(100vh - 135px);
  }
`;

const ChatContainer = styled.section`
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow: scroll;
  width: calc(100% - 325px);
  float: right;
  /* border: 2px dashed green; */

  @media screen and (${breakPoints.device.sm}) {
    width: 100%;
    /* border: 2px solid green; */
  }
`;

