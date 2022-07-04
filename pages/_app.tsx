import "../styles/globals.css";
import type { AppProps } from "next/app";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import db, { auth } from "../utils/firebase";
import { useEffect } from "react";
import { getLoggedUserData } from "../utils/helper";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  let userData = getLoggedUserData();

  const handleSignOut = () => {
    if (!userData?._id) return;
    signOut(auth).then((res) => {
      router.push({ pathname: "/" });
      const userRef = doc(db, "users", `${userData?._id || ""}`);
      setDoc(
        userRef,
        {
          activeStatus: false,
        },
        { merge: true }
      );
      localStorage.removeItem("WAW-Clone-userData");
    });
  };

  useEffect(() => {
    return () => {
      handleSignOut();
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
