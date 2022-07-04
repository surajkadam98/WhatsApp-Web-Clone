import type { NextPage } from "next";
import Head from "next/head";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Whatsapp Web Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://logo.clearbit.com/whatsapp.com" />
      </Head>
      <Login />
    </div>
  );
};

export default Home;
