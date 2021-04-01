import Head from "next/head";
import styled from "styled-components";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import StartPage from "./start/startPage";

export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatsUp Clone</title>
        <link rel="icon" href="/fakeLogo.png" />
      </Head>
      <Container>
        <SideBar />
        <RightPane>
          <Header />
          <StartPage />
        </RightPane>
      </Container>

      {/* <footer></footer> */}
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`;
const RightPane = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
