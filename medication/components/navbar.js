import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "public/logo.png";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const {data: session, status} = useSession();
  
  const handleSignOut = async () => {
    window.location.replace("index.js");
    await signOut();
  };

  return (
    <div className="navbar">
      <div className="navbar-logo-container">
        <Link className="home-button" href="/">
          <Image src={Logo} width={50} height={25} alt="logo" />
        </Link>
      </div>
      <div className="navbar-container">
        <Link className="history-button" href="/history">
          History
        </Link>
      </div>
      <div className="navbar-container">
        <Link className="history-button" href="/api/auth/signin">
          <span onClick={(e) => {
            e.preventDefault();
            signIn();
          }}>Sign In</span>
        </Link>
      </div>
      <div className="navbar-container">
        <Link className="history-button" href="/api/auth/signin">
          <span onClick={(e) => {
            e.stopPropagation();
            handleSignOut();
            signOut();
          }}>Sign Out</span>
        </Link>
      </div>
    </div>
  );
}
