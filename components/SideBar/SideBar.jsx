import {useContext, useState} from "react";
import * as EmailValidator from "email-validator";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../Chat/Chat";
import SimpleModal from "../SimpleModal";
import {Context} from "../../store/reactStore";
import {Avatar, IconButton, Button, Modal} from "@material-ui/core";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

const SideBar = () => {
  const [errorModal, setErrorModal] = useState({open: false, text: ""});

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
      setErrorModal({open: true, text: "You cannot initiate chat with yourself!"});
      return;
    }

    if (!EmailValidator.validate(input)) {
      setErrorModal({open: true, text: "Please enter  a valid email address"});
      return;
    }

    if (!chatAlreadyExists(input)) {
      db.collection("chats").add({
        users: [user.email, input]
      });
    } else {
      setErrorModal({open: true, text: `Chat "${input}" already exists!`});
      return;
    }
  }

  const chatAlreadyExists = (opponentsEmail) => {
    return !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === opponentsEmail)?.length > 0
    );
  };

  const sideBar = (
    <>
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
      <CreateChatButton onClick={createChat}>New chat</CreateChatButton>
      <ContactsContainer>
        {chatsSnapshot?.docs.map((chat) => {
          return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
        })}
      </ContactsContainer>
    </>
  );

  const [{ showSidebar }, dispatch] = useContext(Context);
  const handleDrawerToggle = () => dispatch({type: "TOGGLE_SIDEBAR"});
  const handleCloseErrorModal = () => {
    setErrorModal({text: "", title: "", open: false});
  };

  // Render
  return (
    <>
      <Hidden smUp={true} implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={showSidebar}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {sideBar}
        </Drawer>
      </Hidden>
      <Hidden xsDown={true} implementation="css">
        <Drawer variant="permanent" open>
          {sideBar}
        </Drawer>
      </Hidden>
      <SimpleModal title="Error" text={errorModal.text}
        open={errorModal.open}
        onClose={handleCloseErrorModal}

      />
    </>
  );
};
export default SideBar;

const CreateChatButton = styled(({ ...props }) => (
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
const Search = styled.section`
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

const CurrentUser = styled.div`
  display: flex;
  align-items: center;
`;

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

const ContactsContainer = styled.section`
  height: calc(100vh - 200px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
