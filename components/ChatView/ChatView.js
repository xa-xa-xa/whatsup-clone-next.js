import { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import firebase from "firebase";

import Loading from "../Loading";
import Message from "../Message/Message";

import MicIcon from "@material-ui/icons/Mic";
import { AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import getOpponentsEmail from "../../utils/getOpponentsEmail";

const ChatView = ({ messages, chat }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);
  const route = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(route.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const opponentsEmail = getOpponentsEmail(chat.users, user);
  const [opponentsSnapshot] = useCollection(
    db.collection("users").where("email", "==", opponentsEmail)
  );

  console.log("## opponentsSnapshot:", opponentsSnapshot);

  const renderMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
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

  if (!messagesSnapshot) {
    return <Loading />;
  }

  const sendMessage = (e) => {
    e.preventDefault();
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
  };

  const opponent = opponentsSnapshot?.docs?.[0]?.data();
  // render
  return (
    <Container>
      <Header>
        {opponent ? (
          <Avatar src={opponent?.photoURL} />
        ) : (
          <Avatar>{opponentsEmail[0].toUpperCase()}</Avatar>
        )}
        <HeaderInfo>
          <h3>{opponentsEmail}</h3>
          <p>Last seen</p>
        </HeaderInfo>
        <HeaderIcons>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessagesContainer>
        {renderMessages()}
        {/* <EndOfMessage /> */}
      </MessagesContainer>

      <InputContainer>
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        />
        <IconButton>
          <MicIcon />
          <button hidden disabled={!input} type="submit" onClick={sendMessage}>
            send
          </button>
        </IconButton>
      </InputContainer>
    </Container>
  );
};

export default ChatView;

const Input = styled.input`
  flex: 1;
  align-items: center;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1.25em;
  bottom: 0;
  margin: 0 15px;
  background: whitesmoke;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
`;

const MessagesContainer = styled.section`
  padding: 30px;
  background-color: #e5ded8;
  overflow-y: scroll;
  height: calc(100vh - 160px);
`;

const HeaderIcons = styled.div``;
const HeaderInfo = styled.div`
  flex: 1;
  margin-left: 1em;
  > h3 {
    margin: 0;
    margin-top: 8px;
  }
  > p {
    margin-top: 4px;
    color: grey;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  z-index: 2;
  top: 0;
  padding: 0.75em;
  align-items: center;
`;

const Container = styled.div`
  height: 90px;
  border-bottom: 1px solid whitesmoke;
`;
