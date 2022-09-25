import { useContext } from "react";
import Logo from "../assets/images/logo.svg";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { googleAuth } = useContext(AuthContext);

  return (
    <div className="flex absolute top-0 left-0 w-full justify-between items-center px-36 py-5 z-30 bg-slate-5">
      <img src={Logo} alt="logo" className="h-20 w-40" />
      <div className="flex items-center space-x-10">
        <button
          onClick={googleAuth}
          className="font-Lexend font-normal focus:outline-none text-primary text-xl hover:text-[#1755dc] transition px-2 py-1 hover:bg-primary/10 rounded duration:200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
