import styled from "styled-components";
import Image from "next/image";


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
      <p>
        Push <b>New Chat</b> button to add your opponent to the chat.
      </p>
    </StartPageContainer>
  );
};

export default StartPage;

const StartPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e5ded8;
  height: 100%;
  > p {
    font-size: 1.5rem;
    > span {
      font-size: 2rem;
      color: #3cbc28;
      font-weight: 600;
    }
    > b {
      color: #53764d;
    }
  }
`;
