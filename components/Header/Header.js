import styled from "styled-components";
import getOpponentsEmail from "../../utils/getOpponentsEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { AttachFile, MoreVert } from "@material-ui/icons";
import { db } from "../../firebase";
import TimeAgo from "timeago-react";
import { Avatar, IconButton } from "@material-ui/core";

const Header = ({ user, chat }) => {
  let opponent = null;
  let opponentsEmail = null;
  if (chat) {
    opponentsEmail = getOpponentsEmail(chat.users, user);
    const [opponentsSnapshot] = useCollection(
      db.collection("users").where("email", "==", opponentsEmail)
    );
    opponent = opponentsSnapshot?.docs?.[0]?.data();
  }

  return (
    <HeaderContainer>
      {chat ? (
        opponent ? (
          <Avatar src={opponent?.photoURL} />
        ) : (
          <Avatar>{opponentsEmail[0].toUpperCase()}</Avatar>
        )
      ) : null}
      <HeaderInfo>
        {opponent ? (
          <>
            <h3>{opponentsEmail}</h3>
            <p>
              Last active:{" "}
              {opponent.lastSeen?.toDate() ? (
                <TimeAgo datetime={opponent.lastSeen?.toDate()} />
              ) : (
                "unavailable"
              )}
            </p>
          </>
        ) : null}
      </HeaderInfo>
      <HeaderIcons>
        <IconButton>
          <AttachFile />
        </IconButton>
        <IconButton>
          <MoreVert />
        </IconButton>
      </HeaderIcons>
    </HeaderContainer>
  );
};

export default Header;

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

const HeaderContainer = styled.div`
  height: 90px;
  border-bottom: 1px solid whitesmoke;
  display: flex;
  position: sticky;
  z-index: 2;
  top: 0;
  padding: 0.75em;
  align-items: center;
`;
