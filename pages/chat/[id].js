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
      <SideBar />
      <ChatView messages={messages} chat={chat} />
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
