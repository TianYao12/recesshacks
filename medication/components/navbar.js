import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link className="history-button" href="/history">
            History
        </Link>
      </div>
    </div>
  );
}
