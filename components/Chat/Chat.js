import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import getOpponentsEmail from "../../utils/getOpponentsEmail";
import { UserAvatar } from "../SideBar/SideBar";
import { useRouter } from "next/router";
import { Context } from "../../store/reactStore";
import { useContext } from "react";

const Chat = ({ users, id }) => {
  // const Chat = ({ users, id }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const opponentsEmail = getOpponentsEmail(users, user);
  const [opponentsSnapshot] = useCollection(
    db.collection("users").where("email", "==", opponentsEmail)
  );
  const opponent = opponentsSnapshot?.docs?.[0]?.data();
  const [state, dispatch] = useContext(Context);
  const openChat = () => {
    router.push(`/chat/${id}`);
    dispatch({ type: "CLOSE_SIDEBAR" });
  };

  // render
  return (
    <Container onClick={openChat}>
      {opponent?.photoURL ? (
        <UserAvatar src={opponent?.photoURL} />
      ) : (
        <UserAvatar>{opponentsEmail[0]}</UserAvatar>
      )}
      <p style={{ marginLeft: "0.5em" }}>{opponentsEmail}</p>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  padding: 10px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
    cursor: pointer;
  }
`;