"use client";

// framework
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// icons and images
import cpfImage from "../../public/cpf_image.png";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";

export default function Header({ user, setUser }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    event.preventDefault();

    window.localStorage.clear();
    setUser(null);
    router.push("/");
  };

  return (
    <div className="bg-dark-green text-white w-screen h-max-10 text-xs flex flex-row justify-between px-10 py-3">
      <div className="flex flex-row items-center">
        <Image height={60} src={cpfImage} alt="CPF logo" />
        <div className=" text-x">
          Central Provident
          <br />
          Fund Board Training Simulator
        </div>
      </div>
      {user ? (
        <div className="flex flex-row w-1/2 justify-between">
          <div className="flex flex-row items-center gap-5">
            <Link
              href="/profile"
              className={`${
                pathname == "/profile"
                  ? "font-bold underline underline-offset-3 decoration-white"
                  : "font-normal no-underline"
              }`}
            >
              My Profile
            </Link>
            <Link
              href="/schemes"
              className={`${
                pathname == "/schemes"
                  ? "font-bold underline underline-offset-3 decoration-white"
                  : "font-normal no-underline"
              }`}
            >
              Get Started
            </Link>
            <Link
              href="/faq"
              className={`${
                pathname == "/faq"
                  ? "font-bold underline underline-offset-3 decoration-white"
                  : "font-normal no-underline"
              }`}
            >
              FAQ
            </Link>
          </div>
          <button className="flex items-center gap-2" onClick={handleLogout}>
            Logout
            <IoIosLogOut size={20} />
          </button>
        </div>
      ) : (
        <Link href="/login" className="flex flex-row items-center gap-2">
          <AiOutlineUser size={20} />
          Log In
        </Link>
      )}
    </div>
  );
}
