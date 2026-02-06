'use client';
import Link from "next/link";
const Exploarbtn = () => {
  return (
    <div>
      <button type="button" id="explore-btn" className="mt-4 mx-auto">
        <Link href='#events'>
            Explore Events
        </Link>
      </button>
    </div>
  );
}

export default Exploarbtn;
