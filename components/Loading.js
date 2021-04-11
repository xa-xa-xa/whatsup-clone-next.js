import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <Container>
      <Circle />
    </Container>
  );
};

export default Loading;

const breatheAnimation = keyframes`
 0% { height: 5px; width: 5px; }
 30% { height: 300px; width: 300px; opacity: 1 }
 40% { height: 305px; width: 305px; opacity: 0.3; }
 100% { height: 5px; width: 5px; opacity: 0.6; }
`;
const Circle = styled.div`
  height: 100px;
  width: 100px;
  border-style: solid;
  border-width: 5px;
  border-radius: 50%;
  border-color: #3cbc28;
  animation-name: ${breatheAnimation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`;
const Container = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;
