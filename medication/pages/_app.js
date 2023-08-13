import "@/styles/globals.css";
import Navbar from "../components/navbar.js";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
        <div className="overallmargin">
        <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
}
