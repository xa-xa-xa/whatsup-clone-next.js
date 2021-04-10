import styled from "styled-components";
import Head from "next/head";
import SideBar from "../../components/SideBar/SideBar";
import ChatView from "../../components/ChatView/ChatView";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getOpponentsEmail from "../../utils/getOpponentsEmail";
import breakPoints from "../../styles/breakPoints";

const ChatRoute = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Opponent: {getOpponentsEmail(chat.users, user)}</title>
        <link rel="icon" href="/fakeLogo.png" />
      </Head>
      <Container>
        <SideBarContainer>
          <SideBar />
        </SideBarContainer>
        <ChatContainer>
          <ChatView messages={messages} chat={chat} />
        </ChatContainer>
      </Container>
    </>
  );
};

export default ChatRoute;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  // Prepare messages on the server
  const messagesResponse = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesResponse.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }));

  // Prepare the chats
  const chatResponse = await ref.get();
  const chat = { id: chatResponse.id, ...chatResponse.data() };
  return {
    props: { messages: JSON.stringify(messages), chat: chat }
  };
}

// STYLES
const SideBarContainer = styled.section`
  @media screen and (${breakPoints.device.sm}) {
    width: 270px;
  }
`;
const ChatContainer = styled.section`
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow: scroll;
  width: 100vw;

  @media screen and (${breakPoints.device.sm}) {
    flex: 1;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100vw;
`;
