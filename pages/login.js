import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <LogoContainer>
          <Image
            src="/fakeWhatsupLogo.png"
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
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 50px 100px;
  border-radius: 5px;
  box-shadow: 0px 4px 20px -5px rgba(0, 0, 0, 0.2);
`;
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;
