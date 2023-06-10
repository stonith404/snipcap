import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AlertDialog from "../components/core/AlertDialog";
import Dialog from "../components/core/Dialog";
import Toast from "../components/core/Toast";
import { useUser } from "../hooks/useUser";
import appwrite from "../services/appwrite.service";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwrite.account
      .get()
      .then((res) => {
        user.setUser(res);
        setLoading(false);
      })
      .catch(() => {
        user.setUser(null);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;

    if (user.user === null && !router.pathname.startsWith("/auth")) {
      router.push("/auth/home");
    } else if (user.user !== null && router.pathname.startsWith("/auth")) {
      router.push("/home");
    }
  }, [user.user, loading]);

  // Fixes https://github.com/saltyshiomix/nextron/issues/241
  useEffect(() => {
    const isProd = process.env.NODE_ENV === "production";
    let location = window.location;
    if (isProd) {
      if (location.href.search(/\d/) > 0) return;
      if (location.href.search(".html") < 0) {
        location.replace(`${location.href}.html`);
      }
    }
  }, [router.asPath]);

  if (loading) return null;

  return (
    <>
      <Component {...pageProps} />
      <Toast />
      <AlertDialog />
      <Dialog />
    </>
  );
}

export default MyApp;
