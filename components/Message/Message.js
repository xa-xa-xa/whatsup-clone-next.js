// import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../firebase";
// import getTimeFromTimeStamp from "../../utils/getTimeFromTimeStamp";

const Message = ({ user, message }) => {
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
  position: absolute;
  text-align: center;
  right: 10px;
  bottom: 5px;
`;

const MessageElement = styled.p`
  min-width: 4em;
  width: fit-content;
  padding: 12px;
  border-radius: 8px;
  margin: 10px;
  padding-bottom: 1em;
  position: relative;
  text-align: center;
`;
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #dcf8c6;
`;
const Receiver = styled(MessageElement)`
  margin-right: auto;
  background-color: whitesmoke;
`;

const Container = styled.div`
  display: flex;
`;
