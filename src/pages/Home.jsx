import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import heroImg from "../assets/images/meeting.jpeg";
import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { signin, authError, isLoading } = useContext(AuthContext);

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
      <Navbar />
      <div className="h-screen z-10 flex justify-between items-center pl-36">
        <div className="max-w-3xl space-y-5">
          <h1 className="text-7xl tracking-tight z-20 text-secondary-700 font-Outfit font-bold leading-[5rem]">
            The <span className="text-primary-500">scheduling</span> app your
            were waiting
            <span className="block text-primary-500">for.</span>
          </h1>
          <p className="max-w-[40rem] text-secondary-400 font-Outfit font-extralight text-xl tracking-wider ">
            Planpot is a free appointment scheduling app that makes life easier.
            The app helps you effortlessly schedule appointments.
          </p>
          <button
            disabled={isLoading}
            onClick={signin}
            className="text-white disabled:bg-primary-500/50 disabled:text-white/50 disabled:cursor-not-allowed rounded-full focus:outline-none font-Outfit font-normal bg-primary-500 hover:bg-primary-600 transition px-10 py-5 text-xl"
          >
            Sign up for free <ArrowRightAltRoundedIcon />
          </button>
        </div>
        <div>
          <img
            src={heroImg}
            alt="hero-img"
            className="hero-img h-[30rem] w-[60rem] object-cover"
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
