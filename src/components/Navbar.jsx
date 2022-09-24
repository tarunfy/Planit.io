import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Logo from "../assets/images/logo.svg";

const Navbar = () => {
  const { signin, authError } = useContext(AuthContext);

  if (authError) {
    toast.error(authError, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <div className="flex absolute top-0 left-0 w-full justify-between items-center px-36 py-5 z-30 bg-slate-5">
        <img src={Logo} alt="logo" className="h-20 w-40" />
        <div className="flex items-center space-x-10">
          <button
            onClick={signin}
            className="font-Lexend font-normal focus:outline-none text-primary text-xl hover:text-[#1755dc] transition px-2 py-1 hover:bg-primary/10 rounded duration:200"
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Navbar;
