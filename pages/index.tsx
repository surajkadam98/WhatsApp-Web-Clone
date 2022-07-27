import type { NextPage } from "next";
import Head from "next/head";
import Login from "../components/Login";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Whatsapp Web Clone</title>
        <meta name="description" content="Whatsapp web clone using Next.js, Tailwind CSS and firebase" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Login />
    </div>
  );
};

export default Home;
