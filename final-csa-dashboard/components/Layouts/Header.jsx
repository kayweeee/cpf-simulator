// framework
import Image from "next/image";
// icons and images
import cpfImage from "../../public/cpf_image.png";
import { FaUser } from "react-icons/fa";

export default function Header() {
  return (
    <div className="bg-dark-green text-white w-screen h-max-10 text-xs flex flex-row justify-between px-16 py-3">
      <div className="flex flex-row items-center">
        <Image height={50} src={cpfImage} alt="CPF logo" />
        <div>
          Central Provident Fund Board
          <br /> Training Simulator
        </div>
      </div>

      <div className="flex flex-row items-center gap-5">
        <FaUser />
        Log In
      </div>
    </div>
  );
}
