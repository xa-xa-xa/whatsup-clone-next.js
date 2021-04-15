import {useContext, useState} from "react";
import * as EmailValidator from "email-validator";
import {auth, db} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import ChatListItem from "../ChatListItem/ChatListItem";
import SimpleModal from "../SimpleModal";
import {Context} from "../../store/reactStore";
import {Avatar, IconButton, Button, Modal, List, ListItem, ButtonBase, Popover} from "@material-ui/core";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
// import ChatIcon from "@material-ui/icons/Chat";
import SearchIcon from "@material-ui/icons/Search";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import DialogTitle from '@material-ui/core/DialogTitle';
import breakPoints from '../../styles/breakPoints';


const SideBar = () => {
  const [errorModal, setErrorModal] = useState({open: false, text: ""});
  const [user] = useAuthState(auth);

  const userChatsRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatsRef);

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

  const [searchQuery, setSearchQuery] = useState(null);
  const onSearchQuery = (e = null) => {
    setSearchQuery(e.toLowerCase());
  }

  // Logout Popover
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  // const handleListItemClick = (value) => {
  //   onClose(value);
  // };

  const sideBar = (
    <SideBarContainer>
      <Header>
        <CurrentUser>
          <UserAvatar src={user.photoURL} />
          <div>{user.email}</div>
        </CurrentUser>
        <Popover
          style={{textAlign: "center"}}
          onClose={handleClose}
          aria-labelledby="Logout"
          open={open}
          onClick={handleClose} >
          <DialogTitle>Do you want to logout?</DialogTitle>
          <List>
            <ListItem
              key={"logout"}>
              <CurrentUser disabled>
                <UserAvatar src={user.photoURL} />
                <div>{user.email}</div>
              </CurrentUser>
              <Button
                style={{marginLeft: 16}}
                disableElevation
                variant="contained"
                onClick={() => auth.signOut()}>
                Log out
                </Button>
            </ListItem>

          </List>
        </Popover>
        <IconsContainer>
          <IconButton onClick={handleClickOpen}>
            <MoreVertIcon />
          </IconButton>
          {/* <IconButton>
            <ChatIcon />
          </IconButton> */}
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput
          type="search"
          placeholder="search"
          onChange={(e) => onSearchQuery(e.target.value)}
        />
      </Search>
      <CreateChatButton onClick={createChat}>New chat</CreateChatButton>
      <ContactsContainer>
        {chatsSnapshot?.docs.map((chat) => {
          const users = chat.data().users;
          const opponentsEmail = users.find(item => item !== user.email);
          const match = opponentsEmail.includes(searchQuery);
          const matchedUsers = [user.email, match];

          if (!match && searchQuery) return null;
          return <ChatListItem
            key={chat.id}
            id={chat.id}
            currentUser={user}
            opponentsEmail={opponentsEmail}
            users={searchQuery ? matchedUsers : users}
            setSearchQuery={setSearchQuery}
          />;
        })}
      </ContactsContainer>
    </SideBarContainer>
  );

  const [{showSidebar}, dispatch] = useContext(Context);
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

const CreateChatButton = styled(({...props}) => (
  <Button {...props} variant="contained" disableElevation={true} />
))`
  width: 99%;
  left: 0.5%;
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
  margin-right: -5px;
`;

const CurrentUser = styled.div`
  display: flex;
  align-items: center;
`;

export const UserAvatar = styled(Avatar)`
  margin-right: 0.5em;
`;
const Header = styled.section`
  display: flex;
  position: sticky;
  background: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
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

const SideBarContainer = styled.section`
    width: 325px;

  @media screen and (${breakPoints.device.sm}) {
    width: 100vw;
  }
`;
