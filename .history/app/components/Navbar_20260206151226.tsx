import Link from "next/link";
import Image from "next/image";
import logo from '../../public/icons/logo.png';
const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className="logo">
                <Image src={logo} alt="logo" width={24} height={24} />
                <p>Dev Events</p>
            </Link>
            <ul>
                <Link href="/">Home</Link>
                <Link href="/events">Events</Link>
                <Link href="/about">About</Link>
            </ul>
        </nav>
    </header>
  );
}

export default Navbar;
