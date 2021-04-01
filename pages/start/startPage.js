import styled from "styled-components";

const StartPage = () => {
  return (
    <StartPageContainer>
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
  height: calc(100vh - 160px);
  > p {
    font-size: 1.5rem;
    > span {
      font-size: 2rem;
        color: #3cbc28;
        font-weight:600
      }
      > b {
        color: #53764D;
      }
  }
`;
