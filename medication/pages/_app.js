import "../styles/globals.css";
import Navbar from "../components/navbar";
import styles from "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <div className="overallmargin">
        <Component {...pageProps} />
      </div>
    </>
  );
}
