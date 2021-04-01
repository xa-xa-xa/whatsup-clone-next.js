import styled from "styled-components";
import Head from "next/head";
import SideBar from "../../components/SideBar/SideBar";
import ChatView from "../../components/ChatView/ChatView";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getOpponentsEmail from "../../utils/getOpponentsEmail";

const ChatRoute = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat: {getOpponentsEmail(chat.users, user)}</title>
        <link rel="icon" href="/fakeLogo.png" />
      </Head>
      <SideBar />
      <ChatContainer>
        <ChatView messages={messages} chat={chat} />
      </ChatContainer>
    </Container>
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
  // console.log(chat, messages);
  return {
    props: { messages: JSON.stringify(messages), chat: chat }
  };
}

const ChatContainer = styled.section`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Container = styled.div`
  display: flex;
`;
