import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

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
      <div className="flex absolute top-0 left-0 w-full justify-between items-center px-36 py-5 z-30">
        <h1 className="text-5xl text-secondary-900 font-bold font-Outfit">
          Planpot
        </h1>
        <div className="flex items-center space-x-10">
          <button
            onClick={signin}
            className="font-Outfit font-normal focus:outline-none text-primary-500 text-xl hover:text-primary-600 transition"
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
