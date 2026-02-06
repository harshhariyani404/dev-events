import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className="logo">
                <Image src="/icons/logo" alt="logo" width={24} height={24} />
                <p>Dev Events</p>
            </Link>
        </nav>
    </header>
  );
}

export default Navbar;
