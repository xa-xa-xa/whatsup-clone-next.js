import Head from "next/head";
import styled from "styled-components";
import ChatViewHeader from "../components/ChatViewHeader/ChatViewHeader";
import SideBar from "../components/SideBar/SideBar";
import StartPage from "./start/startPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>WhatsUp Clone</title>
        <link rel="icon" href="/fakeLogo.png" />
      </Head>
      <>
        <SideBar />
        <ChatViewHeader />
        <StartPage />
      </>
      {/* <footer></footer> */}
    </>
  );
};
