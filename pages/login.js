import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import breakPoints from "../styles/breakPoints";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/fakeLogo.png" />
      </Head>
      <LoginContainer>
        <LogoContainer>
          <Image
            src="/fakeLogo.png"
            alt="Picture of the author"
            width={200}
            height={200}
          />
        </LogoContainer>
        <Button variant="contained" onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default Login;

const LogoContainer = styled.div`
  text-align: center;
`;
const LoginContainer = styled.div`
  display: grid;
  flex-direction: center;
  width: 400px;
  height: 300px;
  padding: 30px 40px;
  border-radius: 5px;
  box-shadow: 0px 4px 20px -5px rgba(0, 0, 0, 0.2);

  @media screen and (${breakPoints.device.sm}) {
  width: 100vw;
  height: 50vh;
  padding: 50px;
  background-color: white;
  box-shadow: none;

  }
`;
const Container = styled.div`
    display: grid;
    place-items: center;
    background-color: whitesmoke;
    height: 100vh;
  @media screen and (${breakPoints.device.sm}) {
    background-color: white;
  }
`;
