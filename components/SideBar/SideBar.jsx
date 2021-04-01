import { Avatar, IconButton, Button, ButtonBase } from "@material-ui/core";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../Chat/Chat";

const SideBar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  function createChat() {
    const input = prompt(
      "Please enter an email address for user you want to chat with."
    );

    if (!input) return;

    if (input === user.email) {
      alert("You cannot initiate chat with yourself!");
      return;
    }

    if (!EmailValidator.validate(input)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!chatAlreadyExists(input)) {
      console.log("create chat 2!", input);
      db.collection("chats").add({
        users: [user.email, input]
      });
    }
  }

  const chatAlreadyExists = (opponentsEmail) => {
    return !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === opponentsEmail)?.length > 0
    );
  };
  return (
    <Container>
      <Header>
        <CurrentUser>
        <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
          <div>{user.email}</div>
          </CurrentUser>
        <IconsContainer>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="search" />
      </Search>
      <SidebarButton onClick={createChat}>New chat</SidebarButton>
      <ContactsContainer>
        {chatsSnapshot?.docs.map((chat) => {
          return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
        })}
      </ContactsContainer>
    </Container>
  );
};
export default SideBar;

const SidebarButton = styled(({ ...props }) => (
  <Button {...props} variant="contained" disableElevation={true} />
))`
  width: 100%;
  & .label {
  }
  &&& {
    border-radius: 0;
    font-weight: 600;
    color: #53764d;
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const SearchInput = styled.input`
  outline: none;
  border: none;
  flex: 1;
  font-size: 1.25em;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
  color: grey;
`;
const IconsContainer = styled.div`
  width: 40px;
  margin-right: -15px;
`;

const CurrentUser = styled.div`display: flex;
align-items: center;`

export const UserAvatar = styled(Avatar)`
  margin-right: 0.5em;
  cursor: pointer;
`;
const Header = styled.section`
  display: flex;
  position: sticky;
  background: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const ContactsContainer = styled.div`
  height: calc(100vh - 200px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Container = styled.div`
  flex: 0.4;
  border-right: 1px solid whitesmoke;
  min-width: 300px;
`;
