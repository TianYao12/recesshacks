import Link from "next/link";
import Logo from "public/logo.png";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo-container">
        <Link className="home-button" href="/">
          <Image src={Logo} width={50} height={25} alt="logo" />
        </Link>
      </div>
      <div className="navbar-container">
        <Link className="history-button" href="/tracking">
          Tracking
        </Link>
      </div>
    </div>
  );
}
