import Head from "next/head";
import SideBar from '../components/SideBar/SideBar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatsUp Clone</title>
        <link rel="icon" href="/fakeWhatsupLogo.png" />
      </Head>
      <SideBar />
      <footer></footer>
    </div>
  );
}
