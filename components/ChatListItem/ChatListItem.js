import styled from "styled-components";
import {useCollection} from "react-firebase-hooks/firestore";
import {db} from "../../firebase";
import {UserAvatar} from "../SideBar/SideBar";
import {useRouter} from "next/router";
import {Context} from "../../store/reactStore";
import {useContext} from "react";

const ChatListItem = ({id, setSearchQuery, currentUser, opponentsEmail}) => {
  const router = useRouter();
  const [opponentsSnapshot] = useCollection(
    db.collection("users").where("email", "==", opponentsEmail)
  );
  const opponent = opponentsSnapshot?.docs?.[0]?.data();
  const [state, dispatch] = useContext(Context);
  const openChat = () => {
    router.push(`/chat/${id}`);
    dispatch({type: "CLOSE_SIDEBAR"});
    setSearchQuery("")
  };

  return (
    <Container onClick={openChat}>
      {opponent?.photoURL ? (
        <UserAvatar src={opponent?.photoURL} />
      ) : (
        <UserAvatar>{opponentsEmail[0]}</UserAvatar>
      )}
      <p style={{marginLeft: "0.5em"}}>{opponentsEmail}</p>
    </Container>
  );
};

export default ChatListItem;

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