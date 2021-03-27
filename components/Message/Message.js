import { Avatar } from "@material-ui/core";
import styled from "styled-components";

const Message = ({ message }) => {
  return (
    <Container>
      <Avatar src={message.photoURL} />
      <p>user: {message.user}</p>
      <p>message: {message.message}</p>
      {/* <p>lastSeen: {message.timestamp}</p> */}
    </Container>
  );
};

export default Message;

const Container = styled.div`
  display: flex;
`;
