import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import zigzag from "../assets/images/zigzag.svg";
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
      <div className="h-screen z-10 flex justify-between items-center bg-slate-50">
        <div className="space-y-5 text-center flex items-center flex-col justify-center w-full">
          <h1 className="text-7xl z-20 text-gray-900 font-Lexend font-semibold leading-[5rem] max-w-4xl ">
            Professional{" "}
            <span className="text-primary relative">
              scheduling,
              <img
                src={zigzag}
                alt="zigzag"
                className="absolute -bottom-2 left-0"
              />
            </span>{" "}
            Made Efficient.
          </h1>
          <p className="max-w-2xl text-secondary-400 font-Lexend font-extralight text-xl tracking-wider ">
            Forget all your trouble of going back and forth with your client,
            give them a personalized hassle free scheduling experience
          </p>
          <button
            disabled={isLoading}
            onClick={signin}
            className="text-white disabled:bg-primary-600/50 disabled:text-white/50 disabled:cursor-not-allowed rounded-full focus:outline-none font-Lexend font-normal bg-primary hover:bg-primary/95 transition px-10 py-5 text-xl"
          >
            Get Started <ArrowRightAltRoundedIcon />
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
