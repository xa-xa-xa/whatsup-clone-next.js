// import { Avatar } from "@material-ui/core";
import {useAuthState} from "react-firebase-hooks/auth";
import styled from "styled-components";
import {auth} from "../../firebase";
// import getTimeFromTimeStamp from "../../utils/getTimeFromTimeStamp";

const Message = ({user, message}) => {
  const [userLoggedIn] = useAuthState(auth);
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
  const timeHM = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Container>
      <TypeOfMessage>
        {message.message}
        <TimeStamp>{timeHM.length ? timeHM : "..."}</TimeStamp>
      </TypeOfMessage>
      {/* <Avatar src={message.photoURL} /> */}
    </Container>
  );
};

export default Message;

const TimeStamp = styled.span`
  color: gray;
  font-size: 0.5em;
  width: fit-content;
  align-self: flex-end;
  margin-bottom: -4px;
`;

const MessageElement = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 85%;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  position: relative;
  box-shadow: 0 1px 1px 0 rgba(0,0,0,0.025), 0 2px 1px -1px rgba(0,0,0,0.025), 0 1px 3px 0 rgba(0,0,0,0.025);

  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    border-style: solid;
    border-color: transparent;
  }
`;
const Sender = styled(MessageElement)`
  &:before {
    right: -6px;
    border-width: 20px 16px 0 0;
    border-top-color: #dcf8c6;
    }
  margin-left: auto;
  background-color: #dcf8c6;
  border-radius: 6px;
`;
const Receiver = styled(MessageElement)`
  margin-right: auto;
  background-color: whitesmoke;
  border-radius: 6px;
  &:before {
    left: -6px;
    border-width: 0 16px 20px 0;
    border-right-color: whitesmoke;
    }
`;

const Container = styled.div`
  display: flex;
`;
