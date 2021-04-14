import styled from "styled-components";
import Image from "next/image";
import breakPoints from '../../styles/breakPoints';


const StartPage = () => {
  return (
    <StartPageContainer>
      <Image
        src="/fakeLogo.png"
        alt="Picture of the author"
        width={200}
        height={200}
      />
      <p>
        Welcome to <span>WhatsUp Clone</span>
      </p>
      <section>
        Push <b>New Chat</b> button to add your opponent to the chat or choose tap click on existing chat.
      </section>
    </StartPageContainer>
  );
};

export default StartPage;

const StartPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
  background-color: #e5ded8;
  height: 100vh;
  width: calc(100% - 325px);
  float: right;
  > p {
    font-size: 1.5rem;
    > span {
      color:#3cbc28;
      font-weight: 500;
      }
    }
  section {
      font-size: 1rem;
      > b {
      color: #53764d;
      }
    }

    @media screen and (${breakPoints.device.sm}) {
      width: 50vw;
  }

`;
