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
                <li><Link href="/">Home</Link></li>
                <li><Link href="/events">Events</Link></li>
                <li><Link href="/about">About</Link></li>
            </ul>
        </nav>
    </header>
  );
}

export default Navbar;
