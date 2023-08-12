import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Logo from "../public/logo.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <h1>Testing title skills</h1>
    <Image src={Logo} width={100} height={100} alt="logo" />
    </>
  );
}
